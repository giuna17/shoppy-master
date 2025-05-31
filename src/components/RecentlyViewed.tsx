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
  empty_state: {
    ru: 'Здесь будут отображаться недавно просмотренные товары',
    en: 'Your recently viewed products will appear here',
    ge: 'თქვენი ბოლოს ნანახი პროდუქცია გამოჩნდება აქ',
  },
  view_shop: {
    ru: 'В магазин',
    en: 'View Shop',
    ge: 'მაღაზიაში',
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
  favorites: {
    add: {
      ru: 'Добавить в избранное',
      en: 'Add to favorites',
      ge: 'რჩეულებში დამატება',
    },
    remove: {
      ru: 'Удалить из избранного',
      en: 'Remove from favorites',
      ge: 'რჩეულებიდან ამოშლა',
    },
    added: {
      ru: 'Добавлено в избранное',
      en: 'Added to favorites',
      ge: 'დაემატა რჩეულებში',
    },
    removed: {
      ru: 'Удалено из избранного',
      en: 'Removed from favorites',
      ge: 'წაიშალა რჩეულებიდან',
    },
  },
  common: {
    error_occurred: {
      ru: 'Произошла ошибка',
      en: 'An error occurred',
      ge: 'დაფიქსირდა შეცდომა',
    }
  }
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

  // Initial fetch when component mounts
  useEffect(() => {
    console.log('RecentlyViewed component mounted');
    fetchRecentlyViewed();
    
    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage event detected:', e);
      // Only refresh if this is a removal event from another tab
      if (e.key === 'recently_viewed_removed' || 
          (e.key?.startsWith('recently_viewed_products') && e.newValue === null)) {
        console.log('Relevant storage change detected, refreshing...');
        fetchRecentlyViewed();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      console.log('RecentlyViewed component unmounting');
      window.removeEventListener('storage', handleStorageChange);
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
    
    // Store the current list in case we need to revert
    const previousItems = [...recentlyViewed];
    
    // Optimistically update the UI
    setRecentlyViewed(prev => prev.filter(p => p.id !== productId));
    
    try {
      await recentlyViewedService.removeProduct(productId);
      
      // Manually dispatch a storage event to sync across tabs
      if (typeof window !== 'undefined') {
        // Set a flag in localStorage to indicate a removal
        localStorage.setItem('recently_viewed_removed', Date.now().toString());
        // Trigger the storage event
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.error('Error removing item:', err);
      // Revert to the previous items if there was an error
      setRecentlyViewed(previousItems);
      toast({
        title: t('common.error_occurred'),
        variant: 'destructive',
      });
    }
  };

  // Debug: Show current state
  console.log('Render - Loading:', loading, 'Error:', error, 'Items:', recentlyViewed.length);
  
  // Only show loading state on initial load, not during item removal
  if (loading && recentlyViewed.length === 0) {
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
      <section className={cn('py-16 bg-muted/30', className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-medieval tracking-tight">
                <span className="text-crimson">
                  {translations.recently_viewed[language as keyof typeof translations.recently_viewed]}
                </span>
              </h2>
              <p className="text-xl text-gray-300/90 mb-8 max-w-lg mx-auto leading-relaxed">
                {translations.empty_state[language as keyof typeof translations.empty_state]}
              </p>
              <Link 
                to="/shop" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-crimson bg-crimson/10 hover:bg-crimson/20 text-white text-lg font-medium rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-crimson/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-crimson" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {translations.view_shop[language as keyof typeof translations.view_shop]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-16', className)}>
      <div className="w-full overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center font-medieval tracking-tight mb-3">
            <span className="text-crimson">
              {translations.recently_viewed[language as keyof typeof translations.recently_viewed]}
            </span>
          </h2>
          <div className="w-24 h-0.5 bg-crimson/60 mx-auto mb-12" />
        </div>

        <div className="relative px-8">
          {/* Fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none transition-opacity duration-300 ${isAtStart ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none transition-opacity duration-300 ${isAtEnd ? 'opacity-0' : 'opacity-100'}`}></div>
          
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground/70 hover:text-foreground rounded-full shadow-lg border border-gray-800 hover:border-crimson/50 transition-all duration-300 group ${isAtStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground/70 hover:text-foreground rounded-full shadow-lg border border-gray-800 hover:border-crimson/50 transition-all duration-300 group ${isAtEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-10 scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '0 calc((100% - 1280px) / 2)'
            }}
          >
            <div className="flex space-x-6 transition-all duration-300 px-4">
              {recentlyViewed.map((product) => (
                <div key={product.id} className="w-[260px] flex-shrink-0 group">
                  <Link
                    to={`/product/${product.id}`}
                    className="relative block h-full"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-900/60 border border-gray-800 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-crimson/40 h-full flex flex-col">
                      <div className="aspect-square overflow-hidden bg-gray-900 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <img
                          src={product.images?.[0] || '/placeholder-product.jpg'}
                          alt={product.displayName}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>

                      {/* Product Actions */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="absolute top-3 right-3 flex flex-col space-y-2">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFavorite(product, e)}
                            className={cn(
                              'p-2 rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 transform hover:scale-110',
                              product.isFavorite
                                ? 'bg-red-900/60 text-red-400 hover:bg-red-900/80'
                                : 'bg-gray-900/70 text-gray-300 hover:bg-gray-800/90 hover:text-white'
                            )}
                            aria-label={product.isFavorite ? translations.favorites.remove[language as keyof typeof translations.favorites.remove] : translations.favorites.add[language as keyof typeof translations.favorites.add]}
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
                            className="p-2 rounded-full bg-gray-900/70 backdrop-blur-sm text-gray-300 hover:bg-gray-800/90 hover:text-white transition-all duration-200 transform hover:scale-110"
                            aria-label={translations.remove[language as keyof typeof translations.remove]}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 pt-3 mt-auto bg-gradient-to-t from-black/90 via-black/80 to-transparent">
                        <h3 className="font-medium text-base line-clamp-2 mb-2 text-white group-hover:text-crimson transition-colors duration-300">
                          {product.displayName}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-white">
                            {product.price} {product.currency}
                          </span>
                          {typeof product.rating === 'number' && (
                            <div className="flex items-center space-x-1 bg-gray-800/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-xs font-semibold text-gray-100">
                                {product.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
