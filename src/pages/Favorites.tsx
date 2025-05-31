import React from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/services/productService';
import { Heart } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';

export default function Favorites() {
  const { addToCart } = useCartContext();
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const products = getProducts();

  // Получаем полную информацию о товарах в избранном
  const favoriteProducts = products.filter((product) =>
    favorites.some((fav) => fav.productId === product.id),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-6 h-6 text-crimson" />
        <h1 className="text-2xl font-bold">{t('favorites.title')}</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p>{t('favorites.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
