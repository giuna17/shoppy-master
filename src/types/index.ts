export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating?: number;
  reviewsCount?: number;
  // Add any other product properties that exist in your application
}
