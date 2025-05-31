// In-memory storage for product views (client-side only)
interface ProductView {
  productId: number;
  timestamp: number;
  count: number;
}

// Store view data in browser's localStorage
const STORAGE_KEY = 'productViews';

// Get views from localStorage
const getStoredViews = (): ProductView[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save views to localStorage
const saveViews = (views: ProductView[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Track a product view
export const trackProductView = (productId: number): void => {
  if (typeof window === 'undefined') return;
  
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  
  let views = getStoredViews();
  
  // Filter out old views (older than 24 hours)
  views = views.filter(view => view.timestamp > oneDayAgo);
  
  // Find or create view entry for this product
  let viewEntry = views.find(view => view.productId === productId);
  
  if (viewEntry) {
    viewEntry.count += 1;
    viewEntry.timestamp = now; // Update the timestamp on each view
  } else {
    viewEntry = { productId, timestamp: now, count: 1 };
    views.push(viewEntry);
  }
  
  // Save back to localStorage
  saveViews(views);
};

// Get the most viewed product ID from the last 24 hours
export const getMostPopularProductId = (): number | null => {
  if (typeof window === 'undefined') return null;
  
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  
  const views = getStoredViews();
  
  // Filter views from the last 24 hours
  const recentViews = views.filter(view => view.timestamp > oneDayAgo);
  
  if (recentViews.length === 0) return null;
  
  // Find the product with the most views
  const mostPopular = recentViews.reduce((prev, current) => 
    (prev.count > current.count) ? prev : current
  );
  
  return mostPopular.productId;
};

// Clean up old views (can be called periodically)
const cleanupOldViews = (): void => {
  if (typeof window === 'undefined') return;
  
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const views = getStoredViews();
  const filteredViews = views.filter(view => view.timestamp > oneDayAgo);
  
  if (filteredViews.length !== views.length) {
    saveViews(filteredViews);
  }
};

// Set up periodic cleanup (every hour)
if (typeof window !== 'undefined') {
  // Run cleanup immediately
  cleanupOldViews();
  
  // Set up interval for cleanup (every hour)
  setInterval(cleanupOldViews, 60 * 60 * 1000);
}
