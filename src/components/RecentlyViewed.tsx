import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/services/productService';
import { recentlyViewedService } from '@/services/recentlyViewedService';
import { getProductById } from '@/services/productService';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Heart, Eye, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface RecentlyViewedProduct extends Product {
  viewCount: number;
  isFavorite: boolean;
  displayName: string;
  displayDescription: string;
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
};

const MAX_ITEMS = 10;

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  className = '',
}) => {
  const { currentLanguage } = useLanguage();
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getLocalizedField = useCallback((field: any, fieldType: 'name' | 'description' = 'name'): string => {
    if (!field) return fieldType === 'name' ? 'Product' : '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object' && field !== null) {
      const fieldObj = field as Record<string, string>;
      return (
        fieldObj[currentLanguage] ||
        fieldObj.en ||
        fieldObj.ru ||
        fieldObj.ge ||
        Object.values(fieldObj)[0] ||
        (fieldType === 'name' ? 'Product' : '')
      );
    }
    return fieldType === 'name' ? 'Product' : '';
  }, [currentLanguage]);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const items = await recentlyViewedService.getRecent(MAX_ITEMS);
        
        if (!isMounted) return;
        
        if (!items || items.length === 0) {
          setRecentlyViewed([]);
          return;
        }
        
        const productPromises = items.map(async (item) => {
          if (!item || item.productId === undefined) return null;
          
          try {
            const product = await getProductById(item.productId);
            if (!product) return null;
            
            const displayName = getLocalizedField(product.name, 'name');
            const displayDescription = getLocalizedField(product.description, 'description');
            
            return {
              ...product,
              id: product.id || item.productId,
              viewCount: item.viewCount || 1,
              isFavorite: item.isFavorite || false,
              displayName: displayName || `Product ${item.productId}`,
              displayDescription: displayDescription || '',
              price: product.price || 0,
              currency: product.currency || '₾',
              images: product.images || [],
              category: product.category || 'other',
              stock: product.stock || 0,
              featured: product.featured || false
            };
          } catch (error) {
            console.error(`Error loading product ${item.productId}:`, error);
            return null;
          }
        });

        const products = await Promise.all(productPromises);
        if (!isMounted) return;
        
        setRecentlyViewed(products.filter(Boolean) as RecentlyViewedProduct[]);
      } catch (error) {
        console.error('Error loading recently viewed items:', error);
        if (isMounted) {
          setRecentlyViewed([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [getLocalizedField]);

  // Listen for storage updates to refresh the list
  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await recentlyViewedService.getRecent(MAX_ITEMS);
        const productPromises = items.map(async (item) => {
          try {
            const product = await getProductById(item.productId);
            const displayName = getLocalizedField(product.name, 'name');
            const displayDescription = getLocalizedField(product.description, 'description');
            
            return {
              ...product,
              viewCount: item.viewCount,
              isFavorite: item.isFavorite || false,
              displayName,
              displayDescription
            };
          } catch (error) {
            console.error(`Error loading product ${item.productId}:`, error);
            return null;
          }
        });

        const products = await Promise.all(productPromises);
        setRecentlyViewed(products.filter(Boolean) as RecentlyViewedProduct[]);
      } catch (error) {
        console.error('Error loading recently viewed items:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('recently_viewed_products') || !e.key) {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentLanguage]);

  // Show empty state if no products
  if (!loading && (!recentlyViewed || recentlyViewed.length === 0)) {
    const title = translations.recently_viewed[currentLanguage as keyof typeof translations.recently_viewed];
    const message = translations.no_products[currentLanguage as keyof typeof translations.no_products];

    return (
      <div className={cn('bg-muted/50 p-6 rounded-lg', className)}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    );
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold">
        {translations.recently_viewed[currentLanguage as keyof typeof translations.recently_viewed]}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentlyViewed.map((product) => (
          <div key={product.id} className="group relative">
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.displayName}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <span className="bg-background/80 text-foreground text-xs px-2 py-1 rounded-full flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {product.viewCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const newFavoriteStatus = !product.isFavorite;
                      await recentlyViewedService.updateFavoriteStatus(product.id, newFavoriteStatus);
                      setRecentlyViewed(prev => 
                        prev.map(p => 
                          p.id === product.id 
                            ? { ...p, isFavorite: newFavoriteStatus } 
                            : p
                        )
                      );
                      toast({
                        title: newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites',
                        description: newFavoriteStatus 
                          ? 'Product added to your favorites' 
                          : 'Product removed from your favorites',
                      });
                    }}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4',
                        product.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      )}
                    />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="font-medium text-sm line-clamp-1">{product.displayName}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: product.currency || 'USD',
                    }).format(product.price)}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {(product as any).rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={async () => {
                await recentlyViewedService.removeProduct(product.id);
                setRecentlyViewed(prev => prev.filter(p => p.id !== product.id));
                toast({
                  title: 'Removed from recently viewed',
                  description: 'Product has been removed from your recently viewed items',
                });
              }}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
