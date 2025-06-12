import React, { useState, ReactNode, useEffect } from 'react';
import { Product } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';
import { cartInterestService } from '@/services/cartInterestService';
import { CartItem, CartContextType, CartContext, DiscountInfo } from './CartContext.utils';
import { useCartContext } from './CartContext.hook';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { toast } = useToast();
  const { t } = useLanguage();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        // Check if adding one more would exceed stock
        if (existingItem.quantity >= product.stock) {
          return currentCart;
        }

        // Increase quantity if item already exists
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item with quantity of 1
        cartInterestService.addInterest(product.id);
        return [...currentCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    cartInterestService.removeInterest(productId);
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = cart.find((item) => item.product.id === productId)?.product;

    if (product && quantity > product.stock) {
      toast({
        title: t('toast.stock_limit_reached'),
        description: t('toast.stock_limit_message'),
        duration: 3000,
      });

      // Set to maximum available stock
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: product.stock }
            : item,
        ),
      );
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    // Удаляем интересы ко всем товарам в корзине
    cart.forEach((item) => cartInterestService.removeInterest(item.product.id));
    setCart([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateDiscount = (): DiscountInfo => {
    const subtotal = calculateTotal();
    if (subtotal >= 500) {
      return { amount: subtotal * 0.1, percentage: 10 }; // 10% off
    } else if (subtotal >= 200) {
      return { amount: subtotal * 0.05, percentage: 5 }; // 5% off
    }
    return { amount: 0, percentage: 0 };
  };

  const getDeliveryFee = () => {
    return calculateTotal() >= 100 ? 0 : 5; // Free delivery for orders over 100 GEL
  };

  const calculateTotalWithDiscount = () => {
    const subtotal = calculateTotal();
    const { amount: discount } = calculateDiscount();
    const deliveryFee = getDeliveryFee();
    return Math.max(0, subtotal - discount + deliveryFee);
  };

  const isFreeDelivery = () => {
    return calculateTotal() >= 100;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        calculateDiscount,
        calculateTotalWithDiscount,
        getDeliveryFee,
        isFreeDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCartContext } from './CartContext.hook';
