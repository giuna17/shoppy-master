import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
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

  return (
    <div className="flex gap-4 py-4 border-b relative group">
      <div className="flex-shrink-0 relative">
        <Link 
          to={`/product/${item.product.id}`}
          className="w-16 h-16 block bg-gray-100 rounded overflow-hidden hover:opacity-90 transition-opacity"
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
        
        {/* Количество товара */}
        <div className="absolute -top-1 -right-1 bg-crimson text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {item.quantity}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <Link 
          to={`/product/${item.product.id}`} 
          className="font-medium text-[1.1em] leading-tight hover:underline hover:text-primary line-clamp-2"
        >
          {item.product.name[language] || item.product.name['ru'] || 'Product'}
        </Link>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-[1.21em] font-bold text-crimson">
            {item.product.price * item.quantity} ₾
          </span>
          
          <button
            onClick={handleRemove}
            aria-label={t('cart.remove')}
            className="group relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <div className="relative">
              <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 rounded-full transition-all duration-300 scale-0 group-hover:scale-100"></span>
            </div>
            <span className="sr-only">{t('cart.remove')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
