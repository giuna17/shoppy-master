import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Facebook, LogOut, Heart, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProducts, type Product } from '@/services/productService';
import { useCartContext } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItem from './CartItem';
import LanguageSwitcher from './LanguageSwitcher';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const auth = useAuth();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900"
          onClick={async () => {
            try {
              await auth.loginWithProvider('google');
              onClose();
            } catch (error) {
              console.error('Google sign in failed:', error);
            }
          }}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.52426 55.229 -9.24426 56.479 -10.4643 57.329 L -10.4643 60.609 L -6.39927 60.609 C -4.15927 58.619 -3.264 55.409 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.86 60.609 L -10.465 57.329 C -11.425 58.049 -12.745 58.489 -14.254 58.489 C -17.204 58.489 -19.654 56.379 -20.424 53.529 L -24.464 53.529 L -24.464 56.958 C -22.514 60.819 -18.924 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -20.424 53.529 C -20.814 52.249 -21.024 50.879 -21.024 49.499 C -21.024 48.119 -20.814 46.749 -20.324 45.469 L -20.324 42.04 L -24.464 42.04 C -25.934 44.98 -26.664 48.199 -26.664 51.499 C -26.664 54.799 -25.934 58.019 -24.464 60.958 L -20.424 57.499 C -20.814 56.249 -21.024 54.879 -21.024 53.499"/>
              <path fill="#EA4335" d="M -14.754 44.509 C -12.984 44.509 -11.404 45.069 -10.084 46.099 L -6.768 42.819 C -8.898 40.889 -11.664 39.759 -14.754 39.759 C -18.924 39.759 -22.514 42.179 -24.464 46.04 L -20.324 49.469 C -19.554 46.619 -17.104 44.509 -14.754 44.509 Z"/>
            </g>
          </svg>
          {t('auth.google')}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={async () => {
            try {
              await auth.loginWithProvider('facebook');
              onClose();
            } catch (error) {
              console.error('Facebook sign in failed:', error);
            }
          }}
        >
          <Facebook className="mr-2 h-4 w-4" />
          {t('auth.facebook')}
        </Button>
      </div>

    </div>
  );
};

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { cart } = useCartContext();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCartContext();
  const allProducts = getProducts();

  // Get full product data for favorites
  const favoriteProducts = favorites
    .map((fav) => {
      const product = allProducts.find((p) => p.id === fav.productId);
      return product;
    })
    .filter((product): product is Product => product !== undefined);
  const auth = useAuth();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await auth.logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-black shadow-sm h-[5.5rem]">
      <div className="container flex h-full items-center">
        {/* Left - Logo and Navigation */}
        <div className="flex items-center gap-6 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full"
            aria-label={t('nav.home')}
          >
            <img
              src="/lovable-uploads/nekos-logo.jpeg"
              alt=""
              className="h-[4.4rem] w-[4.4rem] object-cover rounded-full"
              aria-hidden="true"
            />
            <span className="text-[2.2rem] font-bold tracking-wide">
              <span className="text-crimson" aria-hidden="true">
                NEKO
              </span>
              <span className="text-white" aria-hidden="true">
                shop
              </span>
              <span className="sr-only">Home</span>
            </span>
          </Link>

          <nav aria-label={t('nav.main')}>
            <ul className="hidden md:flex items-center gap-3 list-none p-0 m-0">
              <li>
                <Link
                  to="/"
                  className="px-5 py-3 text-base font-medium transition-colors rounded-md border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent text-white hover:bg-crimson/20 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="px-5 py-3 text-base font-medium transition-colors rounded-md border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent text-white hover:bg-crimson/20 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="px-5 py-3 text-base font-medium transition-colors rounded-md border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent text-white hover:bg-crimson/20 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="px-5 py-3 text-base font-medium transition-colors rounded-md border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent text-white hover:bg-crimson/20 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900 font-sans"
                  style={{ fontFamily: '"Noto Sans Georgian", sans-serif' }}
                >
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="px-5 py-3 text-base font-medium transition-colors rounded-md border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent text-white hover:bg-crimson/20 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                      aria-haspopup="true"
                      aria-expanded={false}
                    >
                      {t('nav.categories')}
                      <span className="sr-only">Toggle categories menu</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black/95 border-crimson/20">
                    <DropdownMenuLabel className="text-white">
                      {t('nav.categories')}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-crimson/20" />
                    {[
                      'chokers',
                      'earrings',
                      'bracelets',
                      'rings',
                      'hairpins',
                      'candles',
                      'necklaces',
                      'accessories',
                    ].map((category) => (
                      <DropdownMenuItem key={category} className="text-white hover:bg-crimson/20 cursor-pointer p-0">
                        <Link
                          to={`/shop?category=${category}`}
                          className="w-full px-3 py-2 flex items-center"
                        >
                          {t(`category.${category}`)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={(lang) => setLanguage(lang as 'ru' | 'en' | 'ge')}
          />

          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-12 px-4 py-3 relative rounded-sm border-r text-white/90 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={`${t('nav.cart')} (${totalItems} ${totalItems === 1 ? t('cart.item') : t('cart.items')})`}
                aria-expanded={false}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 bg-crimson text-white"
                    aria-hidden="true"
                  >
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">
                  {totalItems > 0
                    ? `${totalItems} ${totalItems === 1 ? t('cart.item') : t('cart.items')} in cart`
                    : t('nav.cart')}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t('cart.title')}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    {t('cart.empty')}
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t('cart.subtotal')}:</span>
                        <span className="font-medium">
                          {cart.reduce(
                            (total, item) =>
                              total + item.product.price * item.quantity,
                            0,
                          )}{' '}
                          ₾
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t('cart.shipping')}:</span>
                        <div className="flex flex-col items-end">
                          <span className="text-green-600">
                            {cart.reduce(
                              (total, item) =>
                                total + item.product.price * item.quantity,
                              0,
                            ) >= 100
                              ? t('cart.free')
                              : '5 ₾'}
                          </span>
                          {cart.reduce(
                            (total, item) => total + item.product.price * item.quantity,
                            0,
                          ) >= 500 && (
                            <span className="text-green-500 text-xs mt-1">
                              {t('cart.discount_applied', { percent: '10%' })}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-4">
                        <span>{t('cart.total')}:</span>
                        <span className="text-crimson">
                          {cart.reduce(
                            (total, item) =>
                              total + item.product.price * item.quantity,
                            0,
                          ) >= 100
                            ? cart.reduce(
                                (total, item) =>
                                  total + item.product.price * item.quantity,
                                0,
                              )
                            : cart.reduce(
                                (total, item) =>
                                  total + item.product.price * item.quantity,
                                0,
                              ) + 5}{' '}
                          ₾
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('cart.promo_info')}
                    </div>
                    <Button
                      className="w-full bg-crimson hover:bg-crimson/90 text-white"
                      size="lg"
                    >
                      {t('cart.checkout')}
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Favorites */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-12 px-4 py-3 relative rounded-sm border-l text-white/90 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={`${t('nav.favorites')} (${favorites.length} ${favorites.length === 1 ? t('favorites.item') : t('favorites.items')})`}
                aria-expanded={false}
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
                {favorites.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-crimson text-white"
                    aria-hidden="true"
                  >
                    {favorites.length}
                  </Badge>
                )}
                <span className="sr-only">
                  {favorites.length > 0
                    ? `${favorites.length} ${favorites.length === 1 ? t('favorites.item') : t('favorites.items')} in ${t('nav.favorites').toLowerCase()}`
                    : t('nav.favorites')}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90%] sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>{t('favorites.title')}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {favorites.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    {t('favorites.empty')}
                  </div>
                ) : (
                  favoriteProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 py-4 border-b">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name[language]}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-product.jpg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-xs text-gray-500">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow">
                        <Link
                          to={`/product/${product.id}`}
                          className="font-medium text-sm hover:text-crimson"
                        >
                          {product.name[language]}
                        </Link>
                        <span className="text-muted-foreground text-xs mb-1">
                          {product.price} ₾
                        </span>
                        <div className="flex justify-between items-center mt-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-crimson hover:text-crimson/80"
                            onClick={() => removeFromFavorites(product.id)}
                          >
                            {t('favorites.remove')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            {t('product.add_to_cart')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          {auth.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full w-14 h-14 p-0 overflow-hidden border-2 border-gray-600 hover:border-crimson/50 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={`${t('nav.profile')} - ${auth.user.email}`}
                  aria-haspopup="menu"
                  aria-expanded={false}
                >
                  {auth.user?.photoURL ? (
                    <img
                      src={auth.user.photoURL}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-user.jpg';
                      }}
                      aria-hidden="true"
                    />
                  ) : (
                    <User
                      className="w-5 h-5 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">{t('nav.profile')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-black/95 border-crimson/20"
                sideOffset={8}
                align="end"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuLabel className="text-white truncate">
                  {auth.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-crimson/20" />
                <DropdownMenuItem
                  asChild
                  className="focus:bg-crimson/20 focus:text-white p-0"
                >
                  <Link
                    to="/profile"
                    className="w-full flex items-center px-2 py-1.5 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{t('nav.profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-crimson/20" />
                <DropdownMenuItem asChild className="p-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm flex items-center text-white hover:bg-crimson/20 focus:bg-crimson/20 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{t('auth.sign_out')}</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog
              open={showLoginDialog}
              onOpenChange={(open) => setShowLoginDialog(open)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-sm text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black/95 border-crimson/20">
                <DialogHeader>
                  <DialogTitle className="text-white">{t('auth.sign_in')}</DialogTitle>
                </DialogHeader>
                <LoginForm onClose={() => setShowLoginDialog(false)} />
                <DialogFooter />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
