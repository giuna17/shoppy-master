import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, X, ShoppingCart, LogIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getProducts } from '@/services/productService';
import { toast } from '@/components/ui/use-toast';

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

  const handleAddToCart = (productId: number) => {
    // Add to cart logic here
    toast({
      title: t('cart.added'),
      variant: 'default',
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2 group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Heart className="w-6 h-6 text-crimson fill-crimson/20 group-hover:fill-crimson/30 transition-colors" />
          {favorites.length > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-crimson text-white border-2 border-background hover:bg-crimson/90 h-6 w-6 p-0 flex items-center justify-center text-xs font-bold">
              {favorites.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 border-l border-crimson/30 w-full sm:max-w-md p-0">
        <SheetHeader className="border-b border-crimson/20 p-4 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-crimson fill-crimson/30" />
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-crimson to-red-600 tracking-tight">
                {t('favorites.title')}
              </span>
            </SheetTitle>
            <SheetClose className="p-1.5 rounded-md hover:bg-crimson/20 text-gray-300 hover:text-white transition-colors hover:rotate-90 transform duration-300">
              <X className="h-5 w-5" />
              <span className="sr-only">დახურვა</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {!user ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)] gap-6 text-center p-8 bg-gradient-to-b from-black/80 to-black/60">
            <div className="relative">
              <div className="absolute inset-0 bg-crimson/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative bg-black/70 p-5 rounded-full border border-crimson/20">
                <Heart className="w-12 h-12 text-crimson fill-crimson/20" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                {t('favorites.login_required')}
              </h3>
              <p className="text-gray-400">
                {t('favorites.login_to_view')}
              </p>
            </div>
            <Link to="/login" className="w-full max-w-xs">
              <Button className="w-full bg-gradient-to-r from-crimson to-red-700 hover:from-crimson/90 hover:to-red-700/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-crimson/20 transition-all duration-300 transform hover:-translate-y-0.5">
                <LogIn className="mr-2 h-5 w-5" />
                {t('auth.login').toUpperCase()}
              </Button>
            </Link>
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)] gap-6 p-8 text-center bg-gradient-to-b from-black/80 to-black/60">
            <div className="relative">
              <div className="absolute inset-0 bg-crimson/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative bg-black/70 p-5 rounded-full border border-crimson/20">
                <Heart className="w-12 h-12 text-crimson fill-crimson/20" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                {t('favorites.empty_title')}
              </h3>
              <p className="text-gray-400">
                {t('favorites.empty')}
              </p>
            </div>
            <SheetClose asChild>
              <Link to="/shop" className="w-full max-w-xs">
                <Button className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white border border-crimson/30 hover:border-crimson/50 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-crimson/10 transition-all duration-300">
                  {t('nav.shop').toUpperCase()}
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <div className="h-[calc(100%-4rem)] flex flex-col bg-gray-900">
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
              {favoriteProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group relative bg-gray-800/50 border border-gray-700 hover:border-crimson/40 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-crimson/5"
                >
                  <div className="flex items-start gap-4">
                    <Link 
                      to={`/product/${product.id}`}
                      className="relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-crimson/60 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={product.images[0]}
                        alt={product.name[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 pt-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="block font-semibold text-white hover:text-crimson transition-colors line-clamp-2 text-sm md:text-base"
                      >
                        {product.name[language]}
                      </Link>
                      <p className="text-lg font-bold text-crimson mt-2 mb-3">
                        {product.price} {product.currency}
                      </p>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleAddToCart(product.id)}
                          className="h-9 px-4 bg-gradient-to-r from-crimson to-red-700 hover:from-crimson/90 hover:to-red-700/90 text-white text-sm font-medium rounded-lg border-0 shadow-md hover:shadow-crimson/30 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {t('cart.add')}
                        </Button>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromFavorites(product.id)}
                          className="h-9 px-3 text-gray-400 hover:text-white hover:bg-gray-700/80 text-sm rounded-lg border border-gray-700 hover:border-crimson/40 transition-all"
                        >
                          <X className="h-4 w-4 mr-1.5" />
                          {t('favorites.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <SheetClose asChild>
                <Link to="/favorites" className="block w-full">
                  <Button className="w-full h-12 bg-gradient-to-r from-crimson to-red-700 hover:from-crimson/90 hover:to-red-700/90 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-crimson/20 transition-all duration-300 transform hover:-translate-y-0.5">
                    <span className="drop-shadow-sm">{t('favorites.view_all')}</span>
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-sm font-bold">
                      {favoriteProducts.length}
                    </span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
