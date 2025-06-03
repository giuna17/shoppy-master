import { collection, doc, setDoc, getDocs, query, where, orderBy, limit, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';

interface RecentlyViewedProduct {
  id?: string;
  productId: number;
  userId: string;
  timestamp: number;
  viewCount: number;
  isFavorite?: boolean;
}

const STORAGE_KEY = 'recently_viewed_products';
const MAX_ITEMS = 12; // Store up to 12 items
// Helper function to get user ID (for both guest and authenticated users)
const getUserId = (): string => {
  return auth.currentUser?.uid || 'guest';
};

// Helper function to get the appropriate storage key
const getStorageKey = (): string => {
  return `${STORAGE_KEY}_${getUserId()}`;
};

export const recentlyViewedService = {
  // Add or update a product in recently viewed
  async addProduct(productId: number, isFavorite = false): Promise<void> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      // Handle guest users with localStorage
      const storageKey = getStorageKey();
      let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Remove any existing entries with the same productId to prevent duplicates
      items = items.filter((item: any) => item.productId !== productId);
      
      // Add new item at the beginning of the array
      items.unshift({
        productId,
        userId,
        timestamp: Date.now(),
        viewCount: 1,
        isFavorite
      });
      
      // Keep only the most recent items and ensure uniqueness
      const uniqueItems = [];
      const productIds = new Set();
      
      for (const item of items) {
        if (!productIds.has(item.productId)) {
          productIds.add(item.productId);
          uniqueItems.push(item);
        }
      }
      
      // Keep only the most recent items up to MAX_ITEMS
      const recentItems = uniqueItems
        .sort((a: any, b: any) => b.timestamp - a.timestamp)
        .slice(0, MAX_ITEMS);
      
      localStorage.setItem(storageKey, JSON.stringify(recentItems));
      return;
    }
    
    // Handle authenticated users with Firestore
    try {
      const docRef = doc(db, 'recentlyViewed', userId, 'products', productId.toString());
      
      // Use serverTimestamp for consistency
      const timestamp = serverTimestamp();
      
      // Check if document exists using getDoc with the direct reference
      const docSnap = await getDocs(query(
        collection(db, 'recentlyViewed', userId, 'products'),
        where('productId', '==', productId),
        limit(1)
      ));
      
      if (!docSnap.empty) {
        // Update existing document
        const existingDoc = docSnap.docs[0];
        await updateDoc(doc(db, 'recentlyViewed', userId, 'products', existingDoc.id), {
          timestamp,
          viewCount: (existingDoc.data().viewCount || 0) + 1,
          isFavorite: isFavorite || existingDoc.data().isFavorite || false
        });
      } else {
        // Create new document
        await setDoc(docRef, {
          productId,
          userId,
          timestamp,
          viewCount: 1,
          isFavorite: isFavorite || false,
          createdAt: timestamp,
          updatedAt: timestamp
        });
      }
      
      // Log analytics event
      if (typeof window !== 'undefined') {
        try {
          logEvent(getAnalytics(), 'view_item', {
            items: [{
              item_id: productId.toString(),
              item_name: `Product ${productId}`,
              item_category: 'product',
            }],
          });
        } catch (analyticsError) {
          console.warn('Analytics error:', analyticsError);
        }
      }
      
    } catch (error) {
      console.error('Error adding to recently viewed:', error);
      // Fallback to localStorage if Firestore fails
      if (error.code === 'permission-denied') {
        console.warn('Permission denied. Falling back to localStorage.');
        const storageKey = getStorageKey();
        const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
        items.unshift({
          productId,
          userId,
          timestamp: Date.now(),
          viewCount: 1,
          isFavorite: isFavorite || false
        });
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
      throw error;
    }
  },
  
  // Get all recently viewed products, sorted by most recent
  async getAll(): Promise<RecentlyViewedProduct[]> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      // Handle guest users with localStorage
      if (typeof window === 'undefined') return [];
      
      try {
        const storageKey = getStorageKey();
        const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        // Ensure all items have the correct structure
        return items
          .filter((item: any) => item && item.productId !== undefined && item.timestamp !== undefined)
          .map((item: any) => ({
            ...item,
            isFavorite: item.isFavorite || false,
            viewCount: item.viewCount || 1,
            userId: item.userId || 'guest',
          }))
          .sort((a: RecentlyViewedProduct, b: RecentlyViewedProduct) => 
            (b.timestamp || 0) - (a.timestamp || 0)
          );
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
        return [];
      }
    } else {
      // Handle authenticated users with Firestore
      try {
        const q = query(
          collection(db, 'recentlyViewed', userId, 'products'),
          orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore Timestamp to milliseconds
          const timestamp = data.timestamp?.toDate?.()?.getTime() || 
                          (typeof data.timestamp === 'number' ? data.timestamp : Date.now());
                          
          return {
            id: doc.id,
            ...data,
            productId: data.productId || parseInt(doc.id, 10) || 0,
            isFavorite: data.isFavorite || false,
            viewCount: data.viewCount || 1,
            timestamp: timestamp,
            userId: data.userId || userId
          } as RecentlyViewedProduct;
        });
        
        // Ensure we have valid product IDs
        return items.filter(item => item.productId > 0);
        
      } catch (error) {
        console.error('Error fetching recently viewed products:', error);
        // Fallback to localStorage if Firestore fails
        if (error.code === 'permission-denied') {
          console.warn('Permission denied. Falling back to localStorage.');
          const storageKey = getStorageKey();
          const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
          return items
            .filter((item: any) => item && item.productId !== undefined)
            .map((item: any) => ({
              ...item,
              isFavorite: item.isFavorite || false,
              viewCount: item.viewCount || 1,
              userId: item.userId || userId
            }));
        }
        return [];
      }
    }
  },
  
  // Get a limited number of recently viewed products
  async getRecent(limit = 4): Promise<RecentlyViewedProduct[]> {
    try {
      const items = await this.getAll();
      // Ensure each item has all required properties
      const validItems = items.filter(item => 
        item && 
        item.productId !== undefined && 
        item.timestamp !== undefined
      );
      
      // Sort by timestamp in descending order and limit the results
      return validItems
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, limit)
        .map(item => ({
          ...item,
          isFavorite: item.isFavorite || false, // Ensure isFavorite is always defined
          viewCount: item.viewCount || 1, // Ensure viewCount is always defined
        }));
    } catch (error) {
      console.error('Error getting recent items:', error);
      return [];
    }
  },
  
  // Clear all recently viewed products
  async clear(): Promise<void> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      localStorage.removeItem(getStorageKey());
    } else {
      try {
        const q = query(
          collection(db, 'recentlyViewed', userId, 'products')
        );
        
        const querySnapshot = await getDocs(q);
        const batch = [];
        querySnapshot.forEach((doc) => {
          batch.push(deleteDoc(doc.ref));
        });
        
        await Promise.all(batch);
      } catch (error) {
        console.error('Error clearing recently viewed:', error);
        localStorage.removeItem(getStorageKey());
      }
    }
  },
  
  /**
   * Remove a specific product from recently viewed
   * @param productId - The ID of the product to remove
   */
  async removeProduct(productId: number): Promise<void> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      const items = await this.getAll();
      const filtered = items.filter(item => item.productId !== productId);
      localStorage.setItem(getStorageKey(), JSON.stringify(filtered));
    } else {
      try {
        const q = query(
          collection(db, 'recentlyViewed', userId, 'products'),
          where('productId', '==', productId),
          limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          await deleteDoc(querySnapshot.docs[0].ref);
        }
      } catch (error) {
        console.error('Error removing product from recently viewed:', error);
        const items = await this.getAll();
        const filtered = items.filter(item => item.productId !== productId);
        localStorage.setItem(getStorageKey(), JSON.stringify(filtered));
      }
    }
  },
  
  // Update favorite status
  async updateFavoriteStatus(productId: number, isFavorite: boolean): Promise<void> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      // Handle guest users with localStorage
      const storageKey = getStorageKey();
      const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const itemIndex = items.findIndex((item: any) => item.productId === productId);
      
      if (itemIndex >= 0) {
        items[itemIndex].isFavorite = isFavorite;
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
      return;
    }
    
    // Handle authenticated users with Firestore
    try {
      const docRef = doc(db, 'recentlyViewed', userId, 'products', productId.toString());
      
      // First try to update directly
      try {
        await updateDoc(docRef, { 
          isFavorite,
          updatedAt: serverTimestamp() 
        });
        return;
      } catch (directUpdateError: any) {
        // If direct update fails (document might not exist), try to find and update
        if (directUpdateError.code === 'not-found') {
          console.log('Document not found, trying query...');
          const q = query(
            collection(db, 'recentlyViewed', userId, 'products'),
            where('productId', '==', productId),
            limit(1)
          );
          
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            await updateDoc(doc.ref, { 
              isFavorite,
              updatedAt: serverTimestamp() 
            });
          } else {
            // If document doesn't exist, create it
            await setDoc(docRef, {
              productId,
              userId,
              timestamp: serverTimestamp(),
              viewCount: 1,
              isFavorite,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
        } else {
          throw directUpdateError;
        }
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      throw error;
    }
  }
};
