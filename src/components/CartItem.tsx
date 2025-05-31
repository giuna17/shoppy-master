import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import type { CartItem } from '@/contexts/CartContext.utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCartContext();
  const { t, language } = useLanguage();

  const handleIncrement = () => {
    if (item.quantity < item.product.stock) {
      updateQuantity(item.product.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  // Check if at max stock
  const atMaxStock = item.quantity >= item.product.stock;

  return (
    <div className="flex gap-4 py-4 border-b">
      <Link 
        to={`/product/${item.product.id}`}
        className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden block hover:opacity-90 transition-opacity"
      >
        {item.product.images && item.product.images.length > 0 ? (
          <img
            src={item.product.images[0]}
            alt={item.product.name[language]}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow">
        <Link 
          to={`/product/${item.product.id}`} 
          className="font-medium text-sm hover:underline hover:text-primary"
        >
          {item.product.name[language] || item.product.name['ru'] || 'Product'}
        </Link>
        <span className="text-muted-foreground text-xs mb-1">
          {item.product.price} ₾
        </span>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full p-0"
              onClick={handleDecrement}
              aria-label={t('cart.decrease_quantity')}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full p-0"
              onClick={handleIncrement}
              disabled={atMaxStock}
              aria-label={t('cart.increase_quantity')}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {atMaxStock && (
              <span className="text-xs text-amber-500">
                {t('product.remaining_stock', { count: item.product.stock })}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
              aria-label={t('cart.remove')}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
