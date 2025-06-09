import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cartInterestService } from '@/services/cartInterestService';
import { Product } from '@/services/productService';
import { ProductImageGallery } from './ProductImageGallery';
import { trackProductView } from '@/services/productViewService';

interface ProductCardProps extends Product {
  onAddToCart: (product: Product) => void;
  originalPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  category = '',
  featured = false,
  id,
  name,
  materials = [],
  colors = [],
  description,
  price,
  currency,
  images,
  stock,
  onAddToCart,
  originalPrice,
}: ProductCardProps) => {
  const { t, language } = useLanguage();
  const { cart, addToCart } = useCartContext();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
  const itemInCart = cart.find((item) => item.product.id === id);
  const currentQuantity = itemInCart?.quantity || 0;
  const remainingStock = stock - currentQuantity;
  const isOutOfStock = remainingStock <= 0;

  const [isInSomeoneCart, setIsInSomeoneCart] = useState(false);

  // Track view when component mounts
  useEffect(() => {
    trackProductView(id);
  }, [id]);

  // Check if product is in someone's cart
  useEffect(() => {
    const checkInterest = () => {
      setIsInSomeoneCart(cartInterestService.checkInterest(id));
    };

    // Check immediately on mount
    checkInterest();

    // Check every 30 seconds
    const interval = setInterval(checkInterest, 30000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="h-full">
      <Card
        className={`product-card bg-card border-2 border-border overflow-hidden h-full flex flex-col ${isOutOfStock ? 'opacity-75' : ''}`}
      >
        <div className="flex flex-col h-full">
          <Link to={`/product/${id}`} className="block flex-shrink-0">
            <div className="relative aspect-square overflow-hidden bg-muted group">
              {/* Background star icon - moved it behind by lowering z-index */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
                <Star className="w-40 h-40" />
              </div>
              <div className="relative w-full h-full">
                <img
                  src={images[0]}
                  alt={name[language]}
                  className={`object-cover w-full h-full transition-transform duration-300 ${!isOutOfStock ? 'group-hover:scale-105' : ''} relative z-1`}
                />
              </div>
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  isInFavorites(id) ? removeFromFavorites(id) : addToFavorites(id);
                }}
                className="absolute top-2 left-2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isInFavorites(id) ? 'fill-crimson text-crimson' : 'text-foreground/60'}`}
                />
              </button>

              {/* Stock and interest indicators */}
              <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                {isOutOfStock ? (
                  <span className="bg-background/80 backdrop-blur-sm text-foreground/80 text-xs px-2 py-1 rounded">
                    {t('product.out_of_stock')}
                  </span>
                ) : (
                  <span className="bg-background/80 backdrop-blur-sm text-crimson text-xs px-2 py-1 rounded">
                    {t('product.in_stock')} {remainingStock}
                  </span>
                )}
                {isInSomeoneCart && !isOutOfStock && (
                  <span className="bg-background/80 backdrop-blur-sm text-amber-500 text-xs px-2 py-1 rounded animate-pulse">
                    {t('product.in_cart')}
                  </span>
                )}
              </div>
            </div>
          </Link>
          
          {/* Title Section (Green) */}
          <div className="p-4 pb-2">
            <Link to={`/product/${id}`} className="block">
              <h3 className="text-xl font-bold text-crimson">
                {name[language]}
              </h3>
            </Link>
          </div>

          {/* Description Section (Blue) */}
          <div className="px-4 py-2 flex-grow">
            <p className="text-sm text-foreground/80 line-clamp-3">
              {description[language]}
            </p>
          </div>

          {/* Price & Button Section (Orange) */}
          <div className="p-4 pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {originalPrice && originalPrice > price ? (
                <>
                  <span className="text-xl font-bold text-crimson">{`${price} ₾`}</span>
                  <span className="text-sm text-muted-foreground line-through">{`${originalPrice} ₾`}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                    {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                    OFF
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-crimson">{`${price} ₾`}</span>
              )}
            </div>
            
            <Button
              className={`w-full relative py-1.5 sm:py-2 text-sm sm:text-base ${
                isOutOfStock
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-crimson hover:bg-crimson/90 text-black font-medium'
              }`}
              onClick={() =>
                !isOutOfStock &&
                onAddToCart({
                  id,
                  name,
                  description,
                  price,
                  currency,
                  images,
                  stock,
                  category,
                  featured,
                  materials: materials || [],
                  colors: colors || []
                })
              }
              disabled={isOutOfStock}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <span className="relative z-1 flex items-center justify-center">
                <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {isOutOfStock
                  ? t('product.out_of_stock')
                  : t('product.add_to_cart')}
              </span>
            </Button>
          </div>
        </div>
      </Card>


    </div>
  );
};

export default ProductCard;
