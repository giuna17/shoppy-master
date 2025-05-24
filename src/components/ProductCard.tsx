import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cartInterestService } from '@/services/cartInterestService';
import { Product } from '@/services/productService';

interface ProductCardProps extends Product {
  onAddToCart: (product: Product) => void;
  originalPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  category = '',
  featured = false,
  id,
  name,
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

  // Проверяем, есть ли товар в чьей-то корзине
  useEffect(() => {
    const checkInterest = () => {
      setIsInSomeoneCart(cartInterestService.checkInterest(id));
    };

    // Проверяем сразу при монтировании
    checkInterest();

    // Проверяем каждые 30 секунд
    const interval = setInterval(checkInterest, 30000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <Card
      className={`product-card bg-card border-2 border-border overflow-hidden h-full flex flex-col ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      <Link to={`/product/${id}`} className="block flex-grow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* Background star icon - moved it behind by lowering z-index */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
            <Star className="w-40 h-40" />
          </div>
          <img
            src={images[0]}
            alt={name[language]}
            className={`object-cover w-full h-full transition-transform duration-300 ${!isOutOfStock ? 'hover:scale-105' : ''} relative z-1`}
          />
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
                {t('product.in_stock')}: {remainingStock}
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
      <CardContent className="p-4 flex-grow">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-xl font-bold text-crimson mb-1">
            {name[language]}
          </h3>
        </Link>
        <p className="text-sm text-foreground/80 mb-2 line-clamp-2">
          {description[language]}
        </p>
        <div className="flex items-center gap-2">
          {originalPrice && originalPrice > price ? (
            <>
              <span className="text-lg font-bold text-crimson">{`${price} ₾`}</span>
              <span className="text-sm text-muted-foreground line-through">{`${originalPrice} ₾`}</span>
              <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                OFF
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">{`${price} ₾`}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full relative ${
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
            })
          }
          disabled={isOutOfStock}
        >
          {/* Background cart icon - adjusted z-index to ensure it stays behind the text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <span className="relative z-1 flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isOutOfStock
              ? t('product.out_of_stock')
              : t('product.add_to_cart')}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
