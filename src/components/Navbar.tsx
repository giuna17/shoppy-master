import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, Search, Gift, Heart, Star, ChevronDown, ChevronUp, Loader2, LogOut, UserCircle, Home, Package, ShoppingBag, Phone, Info, Gift as GiftIcon, MessageSquare, Check, X as XIcon, ChevronRight, ChevronLeft, Truck, HeartOff } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    transform: translateX(200%) skewX(-12deg);
  }
`;

const arrowPulse = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
`;
import { Badge } from '@/components/ui/badge';
import CartItem from './CartItem';
import {
  Sheet,
  SheetClose,
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
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getUserDiscounts } from '@/services/discountService';
import DiscountInfo from './DiscountInfo';
import LanguageSwitcher from './LanguageSwitcher';
import DeliveryModal from './DeliveryModal';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const auth = useAuth();

  return (
    <div className="p-4">
      <Button
        type="button"
        variant="outline"
        className="w-full bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900"
        onClick={async () => {
          try {
            await auth.signInWithGoogle();
            onClose();
          } catch (error) {
            console.error('Google sign in failed:', error);
          }
        }}
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
              fill="#4285F4"
              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.52426 55.229 -9.24426 56.479 -10.4643 57.329 L -10.4643 60.609 L -6.39927 60.609 C -4.15927 58.619 -3.264 55.409 -3.264 51.509 Z"
            />
            <path
              fill="#34A853"
              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.86 60.609 L -10.465 57.329 C -11.425 58.049 -12.745 58.489 -14.254 58.489 C -17.204 58.489 -19.654 56.379 -20.424 53.529 L -24.464 53.529 L -24.464 56.958 C -22.514 60.819 -18.924 63.239 -14.754 63.239 Z"
            />
            <path
              fill="#FBBC05"
              d="M -20.424 53.529 C -20.814 52.249 -21.024 50.879 -21.024 49.499 C -21.024 48.119 -20.814 46.749 -20.324 45.469 L -20.324 42.04 L -24.464 42.04 C -25.934 44.98 -26.664 48.199 -26.664 51.499 C -26.664 54.799 -25.934 58.019 -24.464 60.958 L -20.424 57.499 C -20.814 56.249 -21.024 54.879 -21.024 53.499"
            />
            <path
              fill="#EA4335"
              d="M -14.754 44.509 C -12.984 44.509 -11.404 45.069 -10.084 46.099 L -6.768 42.819 C -8.898 40.889 -11.664 39.759 -14.754 39.759 C -18.924 39.759 -22.514 42.179 -24.464 46.04 L -20.324 49.469 C -19.554 46.619 -17.104 44.509 -14.754 44.509 Z"
            />
          </g>
        </svg>
        {t('auth.google') || 'Sign in with Google'}
      </Button>
    </div>
  );
};

const GlobalStyles = styled.div`
  @keyframes arrowPulse {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(4px);
    }
  }
`;

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { t: trans } = useTranslation();
  const {
    cart,
    calculateTotal,
    calculateDiscount,
    isFreeDelivery,
    calculateTotalWithDiscount,
    addToCart,
  } = useCartContext();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isHoveringDelivery, setIsHoveringDelivery] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasReviewDiscount, setHasReviewDiscount] = useState(false);
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const total = calculateTotal();
  const { amount: discount, percentage: discountPercentage } = calculateDiscount();
  const { favorites, removeFromFavorites } = useFavorites();
  const allProducts = getProducts();
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const { t: translation } = useTranslation();

  useEffect(() => {
    if (user) {
      const userDiscounts = getUserDiscounts(user.uid);
      const reviewDiscount = userDiscounts.find(discount => discount.type === 'review' && !discount.isUsed);
      setHasReviewDiscount(!!reviewDiscount);
    }
  }, [user]);

  // Get full product data for favorites
  const favoriteProducts = favorites
    .map((fav) => {
      const product = allProducts.find((p) => p.id === fav.productId);
      return product;
    })
    .filter((product): product is Product => product !== undefined);

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
            className="group relative flex items-center gap-3 focus:outline-none"
            aria-label={t('nav.home')}
          >
            <div className="relative overflow-hidden rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(234,56,76,0.6)] transform-gpu">
              <img
                src="/lovable-uploads/nekos-logo.jpeg"
                alt="NEKOSHOP Logo"
                className="h-[4.4rem] w-[4.4rem] object-cover rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-crimson/60 transition-all duration-300 group-hover:shadow-inner" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative">
              <h1 className="text-[2.2rem] md:text-4xl font-bold tracking-tight relative font-medieval">
                <span
                  className="text-crimson transition-all duration-300 group-hover:text-red-400"
                  aria-hidden="true"
                >
                  NEKO
                </span>
                <span
                  className="text-white transition-all duration-300 group-hover:text-gray-200"
                  aria-hidden="true"
                >
                  SHOP
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-crimson animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(234,56,76,0.7)]">NEKO</span>
                  <span className="text-white animate-[pulse_1.5s_ease-in-out_0.2s_infinite] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">SHOP</span>
                </span>
              </h1>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-crimson/20" />
              <span className="sr-only">Home</span>
            </div>
          </Link>

          <nav aria-label={t('nav.main')}>
            <ul className="hidden md:flex items-center list-none p-0 m-0 space-x-1">
              {/* Navigation Items */}
              {[
                { 
                  type: 'link', 
                  to: '/shop', 
                  icon: <ShoppingBag className="w-[1.25rem] h-[1.25rem] text-crimson group-hover:animate-bounce" />, 
                  text: t('nav.shop') 
                },
                { 
                  type: 'button', 
                  onClick: () => setIsDeliveryModalOpen(true), 
                  icon: <Truck className="w-[1.25rem] h-[1.25rem] text-crimson group-hover:animate-bounce" />, 
                  text: t('cart.delivery').replace(':', '') 
                },
                { 
                  type: 'link', 
                  to: '/about', 
                  icon: <Info className="w-[1.25rem] h-[1.25rem] text-crimson group-hover:animate-bounce" />, 
                  text: t('home.our_story') 
                },
                { 
                  type: 'link', 
                  to: '/contact', 
                  icon: <Phone className="w-[1.25rem] h-[1.25rem] text-crimson group-hover:animate-bounce" />, 
                  text: t('nav.contact') 
                },
                { 
                  type: 'link', 
                  to: '/faq', 
                  icon: <MessageSquare className="w-[1.25rem] h-[1.25rem] text-crimson group-hover:animate-bounce" />, 
                  text: t('nav.faq') 
                }
              ].map((item, index) => (
                <li key={index} className="relative">
                  {item.type === 'link' ? (
                    <Link
                      to={item.to}
                      className="relative flex items-center gap-2 px-5 py-4 text-[1.05em] font-medium group"
                    >
                      <span className="relative z-10 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-200">
                        {item.icon}
                        <span className="font-sans" style={{ fontFamily: '"Noto Sans Georgian", sans-serif' }}>
                          {item.text}
                        </span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-crimson/20" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="relative flex items-center gap-2 px-5 py-4 text-[1.05em] font-medium group w-full text-left"
                    >
                      <span className="relative z-10 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-200">
                        {item.icon}
                        <span className="font-sans" style={{ fontFamily: '"Noto Sans Georgian", sans-serif' }}>
                          {item.text}
                        </span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-crimson/20" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={(lang) => setLanguage(lang as 'ru' | 'en' | 'ge')}
          />

          {/* Promo Code */}
          <Dialog open={showPromoDialog} onOpenChange={setShowPromoDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative group/promo h-12 px-4 py-3 focus:outline-none transition-all duration-300 overflow-hidden"
                aria-label={t('promo.have_code')}
              >
                {/* Single animated border with subtle hover effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden p-[1.5px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-crimson via-pink-500 to-crimson bg-[length:200%_100%] animate-gradient-xy rounded-lg opacity-100 transition-all duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-[1.5px] bg-gray-950/95 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-900/95" />
                </div>
                
                {/* Main content */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="relative">
                    <Gift className="w-5 h-5 flex-shrink-0 relative z-10 transition-all duration-300 group-hover/promo:scale-110 group-hover/promo:rotate-[-15deg] text-crimson-300" />
                    <div 
                    className="absolute inset-0 rounded-full bg-crimson/30 blur-[2px]" 
                    style={{
                      animation: 'subtlePulse 3s ease-in-out infinite',
                      opacity: 0.3
                    }}
                  />
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap hidden md:inline-block relative">
                    <span 
                      className="relative z-10 text-crimson-200 group-hover/promo:text-white transition-all duration-300 inline-block"
                      style={{
                        animation: 'subtlePulse 3s ease-in-out infinite',
                        textShadow: '0 0 8px rgba(220, 38, 38, 0.5)'
                      }}
                    >
                      !
                    </span>
                    <style>{`
                      @keyframes subtlePulse {
                        0% { opacity: 0.7; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.15); }
                        100% { opacity: 0.7; transform: scale(1); }
                      }
                    `}</style>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-crimson to-pink-500 transition-all duration-300 group-hover/promo:w-full" />
                  </span>
                </div>
                
                {/* Subtle glow effect on hover/focus */}
                <div className="absolute inset-0 -z-10 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-crimson/10 via-pink-500/10 to-crimson/10 opacity-0 group-hover/promo:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(220,38,38,0.15)_70%,transparent_100%)] opacity-0 group-hover/promo:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Sparkle effect - always active */}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-crimson blur-[2px] animate-ping-slow" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent opacity-0 group-hover/promo:opacity-100 transition-opacity duration-300" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900 to-black border border-crimson/50 overflow-hidden shadow-2xl">
              {/* Animated background elements */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-crimson/10 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-crimson/5 rounded-full filter blur-3xl animate-pulse" style={{
                animationDelay: '1s',
                animationDuration: '4s'
              }} />
              
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-crimson to-pink-500 bg-clip-text text-transparent">
                  {t('promo.want_discount')}
                </DialogTitle>
              </DialogHeader>
              
              <div className="relative z-10 space-y-6 py-2">
                {/* Promo Code Input */}
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-crimson/30">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder={t('nav.enter_promo')}
                      className="flex-1 px-4 py-3 bg-gray-900/80 border border-crimson/30 rounded-lg text-white placeholder-crimson-200/50 focus:outline-none focus:ring-2 focus:ring-crimson/50 focus:border-crimson/50 transition-all duration-300"
                    />
                    <Button 
                      className="ml-3 bg-gradient-to-r from-crimson to-crimson/80 hover:from-crimson hover:to-crimson/90 transition-all duration-300 transform hover:scale-105 active:scale-95 px-6 font-medium shadow-lg shadow-crimson/20"
                    >
                      {t('common.apply')}
                    </Button>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Social Media Promo - Moved to top */}
                  <div className="p-5 bg-black/30 rounded-xl border border-crimson/20 hover:border-crimson/30 transition-colors">
                    <h3 className="text-lg font-semibold text-crimson-200 mb-3">
                      {t('promo.social_codes')}
                    </h3>
                    <p className="text-crimson-100/90 mb-4 text-sm leading-relaxed">
                      {t('promo.follow_us_for_discounts')}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <a 
                        href="https://www.facebook.com/NekosShopy"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-300 group border border-blue-500/30"
                        aria-label={t('promo.facebook')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-white">{t('promo.facebook')}</span>
                      </a>
                      <a 
                        href="https://www.instagram.com/nekosshop/"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-br from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 transition-all duration-300 group border border-pink-500/30"
                        aria-label={t('promo.instagram')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5 text-pink-300 group-hover:text-pink-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.352-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.352.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-white">{t('promo.instagram')}</span>
                      </a>
                    </div>
                  </div>

                  {/* Discount Information */}
                  <div className="p-5 bg-black/30 rounded-xl border border-crimson/20 hover:border-crimson/30 transition-colors">
                    <h3 className="text-lg font-semibold text-crimson-200 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-crimson-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                      </svg>
                      {t('promo.discount_info_title')}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <p className="text-crimson-100 flex items-start">
                        <span className="text-crimson-300 font-medium mr-2">•</span>
                        <span>{t('promo.over_500')}</span>
                      </p>
                      <p className="text-crimson-100 flex items-start">
                        <span className="text-crimson-300 font-medium mr-2">•</span>
                        <span>{t('promo.over_200')}</span>
                      </p>
                      <p className="text-crimson-100 flex items-start">
                        <span className="text-crimson-300 font-medium mr-2">•</span>
                        <span>{t('promo.over_100')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-crimson/10 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-crimson/5 rounded-full filter blur-xl opacity-50"></div>
            </DialogContent>
          </Dialog>

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
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <Badge
                        variant="secondary"
                        className="bg-crimson text-white relative z-10 animate-pulse"
                        aria-hidden="true"
                        style={{
                          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        }}
                      >
                        {totalItems}
                      </Badge>
                      <div className="absolute inset-0 bg-crimson/50 rounded-full blur-[6px] -z-0 animate-ping-slow" style={{
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                      }} />
                    </div>
                  </div>
                )}
                <span className="sr-only">
                  {totalItems > 0
                    ? `${totalItems} ${totalItems === 1 ? t('cart.item') : t('cart.items')} in cart`
                    : t('nav.cart')}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="border-b border-red-900/30">
                  {/* Title removed as requested */}
                </SheetHeader>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="relative mb-6">
                      <div className="relative">
                        <ShoppingCart className="w-16 h-16 text-crimson animate-bounce" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {t('cart.empty_title', {
                        defaultValue: 'Your cart is empty',
                      })}
                    </h3>
                    <p className="text-gray-300 max-w-xs mb-6">
                      {t('cart.empty_description', {
                        defaultValue:
                          'Add items to your cart and they will appear here',
                      })}
                    </p>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="bg-crimson/10 border-crimson/20 text-white hover:bg-crimson/20 hover:border-crimson/30 transition-colors"
                        onClick={() => navigate('/shop')}
                      >
                        {t('cart.continue_shopping')}
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Cart items container with scroll */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-2 pr-2">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="pb-4 last:pb-0"
                          >
                            <CartItem item={item} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cart summary - stays fixed at the bottom */}
                    <div className="border-t p-6 bg-background flex-shrink-0 sticky bottom-0">
                      <div className="space-y-3">
                        {(() => {
                          const subtotal = cart.reduce(
                            (total, item) => total + item.product.price * item.quantity,
                            0,
                          );
                          const deliveryCost = subtotal >= 100 ? 0 : 5;
                          let discount = 0;
                          let discountPercentage = 0;
                          
                          if (subtotal >= 500) {
                            discount = subtotal * 0.1;
                            discountPercentage = 10;
                          } else if (subtotal >= 200) {
                            discount = subtotal * 0.05;
                            discountPercentage = 5;
                          }
                          
                          const total = subtotal - discount + deliveryCost;
                          
                          return (
                            <>
                              {/* Delivery cost */}
                              {deliveryCost > 0 && (
                                <div className="flex justify-between text-sm text-gray-300">
                                  <span>{t('cart.delivery')}</span>
                                  <span>{deliveryCost} ₾</span>
                                </div>
                              )}
                              
                              {/* Discount */}
                              {discount > 0 && (
                                <div className="flex justify-between text-green-500 text-sm">
                                  <span>Discount ({discountPercentage}%):</span>
                                  <span>-{discount.toFixed(2)} ₾</span>
                                </div>
                              )}
                              
                              {/* Total */}
                              <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-700">
                                <span>{t('cart.total')}:</span>
                                <span className="text-crimson">
                                  {Math.round(total * 100) / 100} ₾
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                      <div className="flex flex-col gap-2 mt-4 relative group">
                        <Button
                          className="w-full relative overflow-hidden bg-crimson/80 hover:bg-crimson/90 transition-all duration-300 text-white font-semibold text-base py-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-crimson/30 transform hover:-translate-y-0.5 border border-crimson/50"
                          size="lg"
                          onClick={() => navigate('/checkout')}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="inline-block group-hover:animate-bounce">
                              <ShoppingCart className="w-5 h-5" />
                            </span>
                            <span>{t('cart.checkout')}</span>
                            <span className="inline-flex items-center ml-1">
                              <span className="relative w-4 h-4 inline-flex items-center justify-center">
                                <svg 
                                  className="absolute inset-0 w-full h-full" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    animation: 'arrowPulse 1.5s ease-in-out infinite',
                                    willChange: 'transform',
                                    transformOrigin: 'center center'
                                  }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                              </span>
                            </span>
                          </span>
                          {/* Subtle shine effect */}
                          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                        {/* Subtle glow effect */}
                        <div className="absolute -bottom-1 left-1/2 w-4/5 h-2 bg-crimson/20 blur-md -translate-x-1/2 group-hover:opacity-100 opacity-70 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
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
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <Badge
                        variant="secondary"
                        className="bg-crimson text-white relative z-10 animate-pulse"
                        aria-hidden="true"
                        style={{
                          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        }}
                      >
                        {favorites.length}
                      </Badge>
                      <div className="absolute inset-0 bg-crimson/50 rounded-full blur-[6px] -z-0 animate-ping-slow" style={{
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                      }} />
                    </div>
                  </div>
                )}
                <span className="sr-only">
                  {favorites.length > 0
                    ? `${favorites.length} ${favorites.length === 1 ? t('favorites.item') : t('favorites.items')} in ${t('nav.favorites').toLowerCase()}`
                    : t('nav.favorites')}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-xl bg-gradient-to-b from-gray-950 via-black/95 to-gray-950 border-l border-crimson/20 flex flex-col h-screen max-h-screen">
              <SheetHeader className="border-b border-crimson/20 pb-4">
                <SheetTitle className="text-white text-2xl font-bold">
                  <span className="text-crimson">{t('favorites.title')}</span>
                  {favorites.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      ({favorites.length}{' '}
                      {favorites.length === 1
                        ? t('favorites.item')
                        : t('favorites.items')}
                      )
                    </span>
                  )}
                </SheetTitle>
              </SheetHeader>
              <div
                className="flex-1 overflow-y-auto pr-2 favorites-scrollbar"
                style={{
                  scrollBehavior: 'smooth',
                  msOverflowStyle: 'none' /* IE and Edge */,
                  scrollbarWidth: 'thin' /* Firefox */,
                  scrollbarColor:
                    'rgba(220, 38, 38, 0.4) rgba(220, 38, 38, 0.1)',
                  height: '100%',
                  padding: '1.5rem 0.5rem 1rem 0',
                  WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                }}
              >
                <style>
                  {`
                  @keyframes fadeInUp {
                    0% {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  /* Custom scrollbar for WebKit browsers */
                  .favorites-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                  }
                  .favorites-scrollbar::-webkit-scrollbar-track {
                    background: rgba(220, 38, 38, 0.1);
                    border-radius: 3px;
                  }
                  .favorites-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(220, 38, 38, 0.4);
                    border-radius: 3px;
                  }
                  .favorites-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(220, 38, 38, 0.6);
                  }
                  
                  /* For Firefox */
                  .favorites-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(220, 38, 38, 0.4) rgba(220, 38, 38, 0.1);
                  }`}
                </style>
                {favorites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Heart className="w-12 h-12 text-crimson/30 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      {t('favorites.empty_title', {
                        defaultValue: 'Your favorites list is empty',
                      })}
                    </h3>
                    <p className="text-gray-400 max-w-xs mb-6">
                      {t('favorites.empty_description', {
                        defaultValue:
                          'Add items to your favorites and they will appear here',
                      })}
                    </p>
                    <Link to="/shop">
                      <Button
                        variant="outline"
                        className="border-crimson/30 text-crimson hover:bg-crimson/10 hover:border-crimson/50"
                        onClick={() =>
                          document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                          )
                        }
                      >
                        {t('favorites.browse_shop', {
                          defaultValue: 'Browse Shop',
                        })}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col h-full -mt-1 -mx-1">
                    {favoriteProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="group relative flex gap-2 p-0 rounded-lg bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/60 hover:from-gray-900 hover:via-gray-900/90 hover:to-gray-900/70 transition-all duration-300 border border-crimson/10 hover:border-crimson/30 backdrop-blur-sm h-[calc(6rem*1.05)] m-0.5"
                        style={{
                          opacity: 0,
                          transform: 'translateY(10px)',
                          animation: `fadeInUp 0.3s ease-out forwards ${index * 0.05}s`,
                          willChange: 'opacity, transform',
                          transition:
                            'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
                          boxShadow:
                            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        }}
                        onClick={(e) => {
                          // Only navigate if the click is not on a button
                          if (!(e.target as HTMLElement).closest('button')) {
                            navigate(`/product/${product.id}`);
                          }
                        }}
                      >
                        <Link
                          to={`/product/${product.id}`}
                          className="flex-shrink-0 w-24 h-full rounded-l-md overflow-hidden bg-gray-700/50"
                        >
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name[language]}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-product.jpg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-700 p-2">
                              <span className="text-xs text-gray-400 text-center">
                                {t('product.no_image')}
                              </span>
                            </div>
                          )}
                        </Link>
                        <div className="flex-1 min-w-0 p-2 flex flex-col h-full justify-between">
                          <div>
                            <Link
                              to={`/product/${product.id}`}
                              className="block font-semibold text-white hover:text-crimson transition-colors text-[1.1rem] leading-tight line-clamp-2 mb-1"
                              title={product.name[language]}
                              style={{ fontSize: 'calc(1rem * 1.1)' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.name[language]}
                            </Link>
                            <div className="flex justify-between items-center mb-1">
                              <span
                                className="text-crimson font-bold whitespace-nowrap"
                                style={{ fontSize: 'calc(1.125rem * 1.1)' }}
                              >
                                {product.price} ₾
                              </span>
                              {product.stock === 0 && (
                                <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded-full">
                                  {t('product.out_of_stock')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-auto flex justify-between items-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs border-crimson/20 text-crimson hover:bg-crimson/10 hover:border-crimson/40 transition-colors group/remove"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromFavorites(product.id);
                              }}
                            >
                              <Heart className="w-3.5 h-3.5 mr-1.5 fill-current group-hover/remove:hidden" />
                              <HeartOff className="w-3.5 h-3.5 mr-1.5 hidden group-hover/remove:block text-red-400" />
                              {t('favorites.remove')}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs border-crimson/20 text-crimson hover:bg-crimson/10 hover:border-crimson/40 transition-colors group/add"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              disabled={product.stock === 0}
                            >
                              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                              {t('product.add_to_cart')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Profile */}
          {auth.user ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 group p-1 pr-4 rounded-full transition-colors hover:bg-gray-800/50"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black border-2 border-crimson/50 overflow-hidden flex items-center justify-center group-hover:border-crimson transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  {auth.user?.photoURL ? (
                    <>
                      <img
                        src={auth.user.photoURL}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Error loading user photo:', {
                            photoURL: auth.user?.photoURL,
                            user: auth.user,
                            error: e,
                          });
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback =
                            target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          console.log('Successfully loaded user photo:', {
                            photoURL: auth.user?.photoURL,
                            naturalWidth: (e.target as HTMLImageElement)
                              .naturalWidth,
                            naturalHeight: (e.target as HTMLImageElement)
                              .naturalHeight,
                          });
                        }}
                        crossOrigin="anonymous"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-gray-800">
                        <User className="w-5 h-5 text-crimson" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-white group-hover:text-crimson transition-colors tracking-wider">
                  {t('nav.profile').toUpperCase()}
                </span>
              </div>
            </Link>
          ) : (
            <Dialog
              open={showLoginDialog}
              onOpenChange={(open) => setShowLoginDialog(open)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 p-0 rounded-full border-2 border-crimson/50 hover:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  aria-label={t('auth.sign_in')}
                >
                  <div className="w-full h-full flex items-center justify-center bg-black rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                    <User className="w-5 h-5 text-crimson group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black/95 border-crimson/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {t('auth.sign_in')}
                  </DialogTitle>
                </DialogHeader>
                <LoginForm onClose={() => setShowLoginDialog(false)} />
                <DialogFooter />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <DiscountInfo
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
      />
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />
    </nav>
  );
};

const NavbarWithStyles = () => (
  <>
    <GlobalStyles />
    <Navbar />
  </>
);

export default NavbarWithStyles;
