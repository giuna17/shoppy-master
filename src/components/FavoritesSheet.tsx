import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getProducts } from '@/services/productService';

export default function FavoritesSheet() {
  const { t } = useLanguage();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { user } = useAuth();
  const { language } = useLanguage();
  const products = getProducts();

  // Получаем полную информацию о товарах в избранном
  const favoriteProducts = products.filter((product) =>
    favorites.some((fav) => fav.productId === product.id),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <Heart className="w-5 h-5" />
          {favorites.length > 0 && (
            <Badge variant="secondary" className="absolute -top-2 -right-2">
              {favorites.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('favorites.title')}</SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-center text-muted-foreground">
              {t('favorites.login_required')}
            </p>
            <Link to="/login">
              <Button variant="default">{t('auth.login')}</Button>
            </Link>
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Heart className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              {t('favorites.empty')}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name.en}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="font-medium hover:underline"
                  >
                    {product.name[language]}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {product.price} {product.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
