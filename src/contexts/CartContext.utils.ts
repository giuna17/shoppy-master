import { createContext } from 'react';
import { Product } from '@/services/productService';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DiscountInfo {
  amount: number;
  percentage: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  calculateDiscount: () => DiscountInfo;
  calculateTotalWithDiscount: () => number;
  isFreeDelivery: () => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
