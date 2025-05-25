import { collection, doc, setDoc, getDocs, query, where, orderBy, limit, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

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
      const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const existingIndex = items.findIndex((item: any) => item.productId === productId);
      
      if (existingIndex >= 0) {
        // Update existing item
        items[existingIndex] = {
          ...items[existingIndex],
          timestamp: Date.now(),
          viewCount: (items[existingIndex].viewCount || 0) + 1,
          isFavorite: isFavorite || items[existingIndex].isFavorite
        };
      } else {
        // Add new item
        items.unshift({
          productId,
          userId,
          timestamp: Date.now(),
          viewCount: 1,
          isFavorite
        });
        
        // Keep only the most recent items
        if (items.length > MAX_ITEMS) {
          items.pop();
        }
      }
      
      localStorage.setItem(storageKey, JSON.stringify(items));
    } else {
      // Handle authenticated users with Firestore
      try {
        const userRef = collection(db, 'users', userId, 'recentlyViewed');
        const q = query(userRef, where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Update existing document
          const docRef = doc(db, 'users', userId, 'recentlyViewed', querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            timestamp: Date.now(),
            viewCount: (querySnapshot.docs[0].data().viewCount || 0) + 1,
            isFavorite: isFavorite || querySnapshot.docs[0].data().isFavorite || false
          });
        } else {
          // Add new document
          const newItem = {
            productId,
            userId,
            timestamp: Date.now(),
            viewCount: 1,
            isFavorite
          };
          
          // Check if we need to remove the oldest item
          const allItems = await this.getAll();
          if (allItems.length >= MAX_ITEMS) {
            const oldestItem = allItems[allItems.length - 1];
            if (oldestItem.id) {
              await deleteDoc(doc(db, 'users', userId, 'recentlyViewed', oldestItem.id));
            }
          }
          
          await setDoc(doc(userRef), newItem);
        }
      } catch (error) {
        console.error('Error updating recently viewed in Firestore:', error);
        // Fallback to localStorage if Firestore fails
        const items = this.getAll();
        items.unshift({
          productId,
          userId,
          timestamp: Date.now(),
          viewCount: 1,
          isFavorite
        });
        
        if (items.length > MAX_ITEMS) {
          items.pop();
        }
        
        localStorage.setItem(getStorageKey(), JSON.stringify(items));
      }
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
        const userRef = collection(db, 'users', userId, 'recentlyViewed');
        const q = query(userRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              productId: data.productId,
              userId: data.userId || userId,
              timestamp: data.timestamp || 0,
              viewCount: data.viewCount || 1,
              isFavorite: data.isFavorite || false,
            } as RecentlyViewedProduct;
          })
          .filter(item => item.productId !== undefined && item.timestamp !== undefined);
      } catch (error) {
        console.error('Error getting recently viewed products from Firestore:', error);
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
        const userRef = collection(db, 'users', userId, 'recentlyViewed');
        const querySnapshot = await getDocs(userRef);
        
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
  
  // Remove a specific product
  async removeProduct(productId: number): Promise<void> {
    const userId = getUserId();
    
    if (userId === 'guest') {
      const items = await this.getAll();
      const filtered = items.filter(item => item.productId !== productId);
      localStorage.setItem(getStorageKey(), JSON.stringify(filtered));
    } else {
      try {
        const userRef = collection(db, 'users', userId, 'recentlyViewed');
        const q = query(userRef, where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        
        const batch = [];
        querySnapshot.forEach((doc) => {
          batch.push(deleteDoc(doc.ref));
        });
        
        await Promise.all(batch);
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
      const items = await this.getAll();
      const item = items.find(item => item.productId === productId);
      
      if (item) {
        item.isFavorite = isFavorite;
        localStorage.setItem(getStorageKey(), JSON.stringify(items));
      }
    } else {
      try {
        const userRef = collection(db, 'users', userId, 'recentlyViewed');
        const q = query(userRef, where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docRef = doc(db, 'users', userId, 'recentlyViewed', querySnapshot.docs[0].id);
          await updateDoc(docRef, { isFavorite });
        }
      } catch (error) {
        console.error('Error updating favorite status:', error);
        const items = await this.getAll();
        const item = items.find(item => item.productId === productId);
        
        if (item) {
          item.isFavorite = isFavorite;
          localStorage.setItem(getStorageKey(), JSON.stringify(items));
        }
      }
    }
  }
};
