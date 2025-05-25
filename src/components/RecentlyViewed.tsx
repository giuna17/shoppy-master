import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/services/productService';
import { recentlyViewedService } from '@/services/recentlyViewedService';
import { getProductById } from '@/services/productService';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Heart, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/contexts/FavoritesContext';

interface RecentlyViewedProduct extends Omit<Product, 'name' | 'description'> {
  viewCount: number;
  isFavorite: boolean;
  displayName: string;
  displayDescription: string;
  rating?: number; // Make rating optional since it's not in the base Product type
  name?: any; // Keep name as any to avoid type conflicts with the localized version
  description?: any; // Keep description as any to avoid type conflicts with the localized version
}

interface RecentlyViewedProps {
  className?: string;
}

const translations = {
  recently_viewed: {
    ru: 'Недавно просмотренные',
    en: 'Recently Viewed',
    ge: 'თქვენ ბოლოს ნახეთ',
  },
  no_products: {
    ru: 'Здесь будут отображаться недавно просмотренные товары',
    en: 'Your recently viewed products will appear here',
    ge: 'თქვენი ბოლოს ნანახი პროდუქცია გამოჩნდება აქ',
  },
  product_not_found: {
    ru: 'Информация о товаре недоступна',
    en: 'Product information not available',
    ge: 'პროდუქტის ინფორმაცია ხელმიუწვდომელია',
  },
  product: {
    ru: 'Товар',
    en: 'Product',
    ge: 'პროდუქტი',
  },
  no_description: {
    ru: 'Нет описания',
    en: 'No description',
    ge: 'აღწერა არ არის',
  },
  error_loading: {
    ru: 'Ошибка при загрузке',
    en: 'Error loading',
    ge: 'შეცდომა ჩატვირთვისას',
  },
  remove: {
    ru: 'Удалить',
    en: 'Remove',
    ge: 'წაშლა',
  },
};

const MAX_ITEMS = 10;

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  className = '',
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  const getLocalizedField = useCallback((field: any, fieldType: 'name' | 'description' = 'name'): string => {
    if (!field) return fieldType === 'name' ? t('product') : '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object' && field !== null) {
      const fieldObj = field as Record<string, string>;
      return (
        fieldObj[currentLanguage] ||
        fieldObj.en ||
        fieldObj.ru ||
        fieldObj.ge ||
        Object.values(fieldObj)[0] ||
        (fieldType === 'name' ? t('product') : t('no_description'))
      );
    }
    return fieldType === 'name' ? t('product') : t('no_description');
  }, [currentLanguage, t]);

  const fetchRecentlyViewed = useCallback(async () => {
    console.log('Fetching recently viewed items...');
    try {
      setLoading(true);
      
      // 1. Get recent items from the service
      const items = await recentlyViewedService.getRecent(MAX_ITEMS);
      console.log('Recently viewed items from service:', items);
      
      if (!items || items.length === 0) {
        console.log('No recently viewed items found');
        setRecentlyViewed([]);
        return;
      }

          // 2. Process items to remove duplicates (keep the most recent)
      const uniqueItems = items.reduce<{[key: number]: any}>((acc, item) => {
        if (!acc[item.productId] || (item.timestamp || 0) > (acc[item.productId].timestamp || 0)) {
          acc[item.productId] = item;
        } else {
          // Update view count for existing items
          acc[item.productId].viewCount = (acc[item.productId].viewCount || 0) + 1;
        }
        return acc;
      }, {});
      
      // Convert back to array and sort by timestamp (newest first)
      const sortedUniqueItems = Object.values(uniqueItems)
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, MAX_ITEMS);
      
      console.log(`Processed ${items.length} items, ${sortedUniqueItems.length} unique after deduplication`);
      
      // 3. Fetch product details for each unique item
      const productPromises = sortedUniqueItems.map(async (item) => {
        try {
          console.log('Fetching product with ID:', item.productId);
          const product = await getProductById(item.productId);
          console.log('Product data for ID', item.productId, ':', product);
          
          if (!product) {
            console.warn('Product not found for ID:', item.productId);
            // Return a minimal product object with the ID we know
            return {
              id: item.productId,
              displayName: `Product #${item.productId}`,
              displayDescription: t('product_not_found'),
              price: 0,
              currency: '₾',
              images: ['/placeholder-product.jpg'],
              category: 'unknown',
              stock: 0,
              featured: false,
              viewCount: item.viewCount || 1,
              isFavorite: item.isFavorite || false,
              materials: [],
              colors: [],
              rating: 0
            } as RecentlyViewedProduct;
          }
          
          const enhancedProduct = {
            ...product,
            id: product.id || item.productId,
            viewCount: item.viewCount || 1,
            isFavorite: item.isFavorite || false,
            displayName: getLocalizedField(product.name, 'name'),
            displayDescription: getLocalizedField(product.description, 'description'),
            price: product.price || 0,
            currency: product.currency || '₾',
            images: product.images || [],
            category: product.category || 'other',
            stock: product.stock || 0,
            featured: product.featured || false,
            rating: (product as any).rating || 0 // Handle rating safely
          } as RecentlyViewedProduct;
          
          console.log('Enhanced product data:', enhancedProduct);
          return enhancedProduct;
          
        } catch (err) {
          console.error('Error loading product:', err);
          return null;
        }
      });

      // 4. Process all product promises and filter out nulls
      const validProducts = (await Promise.all(productPromises))
        .filter((p): p is RecentlyViewedProduct => p !== null);
      console.log('Valid products after filtering:', validProducts);
      
      // 4. Update state with the valid products
      setRecentlyViewed(validProducts);
      console.log('Updated recentlyViewed state with', validProducts.length, 'items');
      
    } catch (err) {
      console.error('Error in fetchRecentlyViewed:', err);
      setError(t('error_loading'));
    } finally {
      setLoading(false);
      console.log('Finished loading recently viewed items');
    }
  }, [getLocalizedField, t]);

  useEffect(() => {
    fetchRecentlyViewed();
  }, [fetchRecentlyViewed]);

  // Debug: Log when component mounts and unmounts
  useEffect(() => {
    console.log('RecentlyViewed component mounted');
    
    // Initial fetch
    fetchRecentlyViewed();
    
    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage event detected:', e);
      if (e.key?.startsWith('recently_viewed_products') || !e.key) {
        console.log('Relevant storage change detected, refreshing...');
        fetchRecentlyViewed();
      }
    };

    // Also set up a periodic check in case storage events don't fire
    const intervalId = setInterval(() => {
      console.log('Periodic check for recently viewed items...');
      fetchRecentlyViewed();
    }, 30000); // Check every 30 seconds

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      console.log('RecentlyViewed component unmounting');
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [fetchRecentlyViewed]);
  
  // Debug: Log when recentlyViewed changes
  useEffect(() => {
    console.log('recentlyViewed updated:', recentlyViewed);
  }, [recentlyViewed]);

  const handleToggleFavorite = async (product: RecentlyViewedProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const newFavoriteStatus = !product.isFavorite;
      
      setRecentlyViewed(prev => 
        prev.map(p => 
          p.id === product.id 
            ? { ...p, isFavorite: newFavoriteStatus } 
            : p
        )
      );
      
      if (newFavoriteStatus) {
        await addToFavorites(product.id);
      } else {
        await removeFromFavorites(product.id);
      }
      
      await recentlyViewedService.updateFavoriteStatus(product.id, newFavoriteStatus);
      
      toast({
        title: newFavoriteStatus ? t('favorites.added') : t('favorites.removed'),
        variant: 'default',
      });
    } catch (err) {
      console.error('Error toggling favorite:', err);
      toast({
        title: t('common.error_occurred'),
        variant: 'destructive',
      });
      
      setRecentlyViewed(prev => 
        prev.map(p => 
          p.id === product.id 
            ? { ...p, isFavorite: !product.isFavorite } 
            : p
        )
      );
    }
  };

  const handleRemoveItem = async (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await recentlyViewedService.removeProduct(productId);
      setRecentlyViewed(prev => prev.filter(p => p.id !== productId));
      
      toast({
        title: t('remove'),
        variant: 'default',
      });
    } catch (err) {
      console.error('Error removing item:', err);
      toast({
        title: t('common.error_occurred'),
        variant: 'destructive',
      });
    }
  };

  // Debug: Show current state
  console.log('Render - Loading:', loading, 'Error:', error, 'Items:', recentlyViewed.length);
  
  if (loading) {
    return (
      <section className={cn('py-12', className)}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{t('recently_viewed')}</h2>
          <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            <div className="flex space-x-4 min-w-max">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-[200px] flex-shrink-0">
                  <div className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn('py-12', className)}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (recentlyViewed.length === 0) {
    return (
      <section className={cn('py-12', className)}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('recently_viewed')}</h2>
          <p className="text-muted-foreground">{t('no_products')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-8', className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 px-2">{t('recently_viewed')}</h2>
        <div className="relative">
          {/* Scrollable container */}
          <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {/* Add negative margin and padding to allow full-width cards on the edges */}
            <div className="flex space-x-4 min-w-max">
              {recentlyViewed.map((product) => (
                <div key={product.id} className="w-[200px] flex-shrink-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="group relative block h-full"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 group-hover:shadow-md h-full flex flex-col">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.images?.[0] || '/placeholder-product.jpg'}
                          alt={product.displayName}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(product, e)}
                        className={cn(
                          'absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm',
                          'transition-colors duration-200',
                          product.isFavorite
                            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                            : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                        )}
                        aria-label={product.isFavorite ? t('favorites.remove') : t('favorites.add')}
                      >
                        <Heart
                          className={cn(
                            'h-5 w-5',
                            product.isFavorite ? 'fill-current' : 'fill-none'
                          )}
                          strokeWidth={1.5}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleRemoveItem(product.id, e)}
                        className="absolute top-2 left-2 p-2 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors duration-200"
                        aria-label={t('remove')}
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="p-4 mt-auto">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1 text-foreground">
                          {product.displayName}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {product.price} {product.currency}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-xs text-muted-foreground">
                              {typeof product.rating === 'number' ? product.rating.toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade effect on the right side */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
