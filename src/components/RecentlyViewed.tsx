import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { language, t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  }, []);

  const { toast } = useToast();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  const getLocalizedContent = useCallback((product: Product) => {
    const name = typeof product.name === 'object' 
      ? (product.name[language as keyof typeof product.name] || product.name.en || '')
      : product.name || '';

    const description = typeof product.description === 'object'
      ? (product.description[language as keyof typeof product.description] || product.description.en || '')
      : product.description || '';

    return { name, description };
  }, [language]);

  const fetchRecentlyViewed = useCallback(async () => {
    console.log('Fetching recently viewed items...');
    setLoading(true);
    setError(null);
    
    try {
      // Get recently viewed items from the service
      const recentItems = await recentlyViewedService.getRecent(12);
      console.log('Recently viewed items:', recentItems);
      
      if (!recentItems || recentItems.length === 0) {
        console.log('No recently viewed items found');
        setRecentlyViewed([]);
        return;
      }
      
      // Fetch product details for each item
      const products = await Promise.all(
        recentItems.map(async (item) => {
          try {
            const product = await getProductById(item.productId);
            if (product) {
              const isFavorite = await isInFavorites(item.productId);
              const { name, description } = getLocalizedContent(product);
              return {
                ...product,
                id: item.productId,
                viewCount: item.viewCount || 1,
                isFavorite: item.isFavorite || isFavorite,
                displayName: name,
                displayDescription: description,
                rating: (product as any).rating || 0, // Rating might not be in the base Product type
              } as RecentlyViewedProduct;
            }
            return null;
          } catch (err) {
            console.error(`Error fetching product ${item.productId}:`, err);
            return null;
          }
        })
      );
      
      // Filter out any null values
      const validProducts = products.filter((p): p is RecentlyViewedProduct => p !== null);
      
      console.log('Fetched recently viewed products:', validProducts);
      setRecentlyViewed(validProducts);
      
    } catch (err) {
      console.error('Error fetching recently viewed items:', err);
      setError(t('error_loading_products'));
    } finally {
      setLoading(false);
    }
  }, [t, isInFavorites, getLocalizedContent]);

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
  
  // Handle scroll events and update button visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (!container) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isStart = scrollLeft < 10;
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      
      setIsAtStart(isStart);
      setIsAtEnd(isEnd);
    };

    // Initial check
    checkScroll();
    
    // Add scroll event listener
    container.addEventListener('scroll', checkScroll, { passive: true });
    
    // Clean up
    return () => {
      container.removeEventListener('scroll', checkScroll);
    };
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
      <div className="w-full overflow-hidden">
        <div className="max-w-[86%] mx-auto mb-6 -mt-3">
          <h2 className="text-2xl md:text-3xl font-bold">{t('recently_viewed')}</h2>
          <div className="w-16 h-0.5 bg-crimson/60 mt-2" />
        </div>

        <div className="relative">
          {/* Fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none transition-opacity duration-300 ${isAtStart ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity duration-300 ${isAtEnd ? 'opacity-0' : 'opacity-100'}`} />
          
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center text-foreground/70 hover:text-foreground transition-all duration-300 group ${isAtStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <div className="h-12 w-8 flex items-center justify-center bg-background/70 hover:bg-background/90 transition-colors duration-200 rounded-r-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center text-foreground/70 hover:text-foreground transition-all duration-300 group ${isAtEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <div className="h-12 w-8 flex items-center justify-center bg-background/70 hover:bg-background/90 transition-colors duration-200 rounded-l-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide px-4"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex space-x-4 transition-all duration-300">
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
