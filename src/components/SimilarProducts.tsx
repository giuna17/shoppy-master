import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';

import { useQuery } from '@tanstack/react-query';
import { getProducts, type Product } from '@/services/productService';
import { Skeleton } from './ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SimilarProductsProps {
  currentProductId: number;
  category: string;
  className?: string;
}

export function SimilarProducts({ currentProductId, category, className }: SimilarProductsProps) {
  const { t, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Fetch products from the same category, excluding the current product
  const { data: similarProducts, isLoading, isError } = useQuery({
    queryKey: ['similarProducts', category, currentProductId],
    queryFn: async () => {
      const products = await getProducts();
      return products
        .filter(
          (product) => 
            product.category === category && 
            product.id !== currentProductId
        )
        .slice(0, 12); // Show more products for better scrolling
    },
    enabled: !!category,
  });

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
  }, [similarProducts]);

  if (isLoading) {
    return (
      <section className={cn('relative py-12 w-full', className)}>
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="mb-8 -mt-3 w-full">
            <h2 className="text-2xl md:text-3xl font-bold break-words w-full">{t('similar.products')}</h2>
            <div className="w-16 h-0.5 bg-crimson/60 mt-2" />
          </div>
          <div className="relative w-full">
            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide w-full pr-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[200px] flex-shrink-0">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <div className="mt-2 space-y-2">
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

  if (isError) {
    console.error('Error loading similar products');
    return null;
  }

  // Don't show the section if there are no similar products
  if (!isLoading && (!similarProducts || similarProducts.length === 0)) {
    return null;
  }
  
  // Function to get the product name in the current language
  const getLocalizedName = (product: Product) => {
    if (typeof product.name === 'string') return product.name;
    return product.name[language as keyof typeof product.name] || product.name.en;
  };

  return (
    <section className={cn('relative pt-2 pb-12 w-full', className)}>
      <div className="w-full">
        <div className="mb-2 -mt-3 w-full pl-[1.5%]">
          <h2 className="text-2xl md:text-3xl font-bold break-words w-full">{t('similar.products')}</h2>
          <div className="w-16 h-0.5 bg-crimson/60 mt-2" />
        </div>

        <div className="relative w-full">
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground/70 hover:text-foreground rounded-full shadow-lg transition-all duration-300 group ${isAtStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground/70 hover:text-foreground rounded-full shadow-lg transition-all duration-300 group ${isAtEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-6 scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: 'calc((100% - 1280px) / 2)', // Centers the container and adds left padding
              paddingRight: 'calc((100% - 1280px) / 2)' // Centers the container and adds right padding
            }}
          >
            <div className="flex space-x-6 px-4">
              {similarProducts?.map((product) => (
                <div key={product.id} className="w-[200px] flex-shrink-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="group block h-full"
                    aria-label={`View ${getLocalizedName(product)}`}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                      <img
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={getLocalizedName(product)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-sm md:text-base line-clamp-2 text-foreground mb-1">
                        {getLocalizedName(product)}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {product.price.toLocaleString('ka-GE')} ₾
                      </p>
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
