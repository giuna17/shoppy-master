import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { CartItem } from '@/contexts/CartContext.utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Helper function to format price with currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ka-GE', {
    style: 'currency',
    currency: 'GEL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getRandomPurchaseMessage } from '@/utils/purchaseMessages';

const Checkout = () => {
  const { 
    cart, 
    clearCart, 
    calculateTotal,
    calculateDiscount,
    calculateTotalWithDiscount,
    getDeliveryFee,
    isFreeDelivery,
    removeFromCart
  } = useCartContext();
  const { t } = useLanguage();
  const { isLoggedIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Calculate cart values
  const subtotal = calculateTotal();
  const discount = calculateDiscount().amount;
  const deliveryFee = getDeliveryFee();
  const total = calculateTotalWithDiscount();

  const handleClose = () => {
    navigate('/');
  };
  
  // Helper function to get product name in current language
  const getProductName = (name: unknown): string => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    
    // Handle case where name is an object with language keys
    if (typeof name === 'object' && name !== null) {
      const nameObj = name as Record<string, string>;
      // Get current language from localStorage or default to 'ru'
      const currentLang = localStorage.getItem('shoppy_language') || 'ru';
      
      // Try to get the name in the current language, fallback to English, then to any available language
      return nameObj[currentLang] || nameObj.en || Object.values(nameObj)[0] || '';
    }
    
    return String(name);
  };
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(!isLoggedIn);
  const { user } = useAuth();
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    city: 'Тбилиси', // Default to Tbilisi as it's the only option
    district: '',
    building: '',
    floor: '',
    apartment: '',
    comment: '',
  });

  // Load saved address from localStorage when component mounts
  useEffect(() => {
    if (user?.uid) {
      setDeliveryInfo(prev => ({
        ...prev,
        phone: localStorage.getItem(`profile_phone_${user.uid}`) || '',
        city: localStorage.getItem(`profile_city_${user.uid}`) || 'Тбилиси',
        district: localStorage.getItem(`profile_district_${user.uid}`) || '',
        building: localStorage.getItem(`profile_building_${user.uid}`) || '',
        floor: localStorage.getItem(`profile_floor_${user.uid}`) || '',
        apartment: localStorage.getItem(`profile_apartment_${user.uid}`) || '',

        comment: localStorage.getItem(`profile_comment_${user.uid}`) || '',
        name: user.displayName || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Save address to localStorage when it changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Save to localStorage if user is logged in
    if (user?.uid) {
      if (name === 'phone') {
        localStorage.setItem(`profile_phone_${user.uid}`, value);

      } else if (name === 'district') {
        localStorage.setItem(`profile_district_${user.uid}`, value);
      } else if (name === 'building') {
        localStorage.setItem(`profile_building_${user.uid}`, value);
      } else if (name === 'floor') {
        localStorage.setItem(`profile_floor_${user.uid}`, value);
      } else if (name === 'apartment') {
        localStorage.setItem(`profile_apartment_${user.uid}`, value);
      } else if (name === 'city') {
        localStorage.setItem(`profile_city_${user.uid}`, value);
      } else if (name === 'comment') {
        localStorage.setItem(`profile_comment_${user.uid}`, value);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setShowLoginPrompt(false);
      // Here you can add the payment processing logic after successful login
      // For now, we'll just show a success message
      toast.success('Successfully logged in with Google');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google');
    }
  };

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    }
  }, [isLoggedIn]);

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    // If user is logged in, proceed with payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      const message = getRandomPurchaseMessage();
      toast.success(message, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      });
      
      // Redirect to success page
      navigate('/success');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePayClick(e);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground bg-gradient-to-br from-background to-[#0a0404] flex items-center justify-center p-4">
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-border/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-accent/10 to-transparent rounded-full"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary/80"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t('cart.empty_cart_title') || 'Your cart is empty'}
              </h1>
              
              <p className="text-muted-foreground mb-8">
                {t('cart.empty_cart_message') || 'Looks like you haven\'t added anything to your cart yet.'}
              </p>
              
              <Button 
                onClick={() => navigate('/shop')}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transform"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M15 18l6-6-6-6"/>
                  <path d="M3 12h18"/>
                </svg>
                {t('cart.continue_shopping') || 'Continue Shopping'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-gradient-to-br from-background to-[#0a0404] relative">
      <div className="container mx-auto px-4 py-12 relative max-w-6xl">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none z-0"></div>
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
          aria-label={t('common.close')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t('checkout.title')}
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {t('checkout.subtitle')}
          </p>
      
      {/* Login Prompt Overlay */}
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-500 ${showLoginPrompt ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-card border border-border/50 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${showLoginPrompt ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-crimson/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-crimson" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">
              {t('checkout.login_required')}
            </h2>
            
            <p className="text-muted-foreground text-center mb-6">
              {t('checkout.login_prompt')}
            </p>
            
            <Button 
              type="button" 
              className="w-full bg-crimson hover:bg-crimson/90 text-white flex items-center justify-center gap-2 h-12 text-base font-medium"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="currentColor"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="currentColor"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="currentColor"
                />
              </svg>
              {t('auth.sign_in_with_google')}
            </Button>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('common.back_to_home')}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-1 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/>
                    <polyline points="3.29 7 12 12 20.71 7"/>
                    <line x1="12" y1="22" x2="12" y2="12"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('checkout.delivery_info')}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      {t('checkout.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo(prev => ({...prev, name: e.target.value}))}
                      placeholder={t('checkout.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      {t('checkout.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo(prev => ({...prev, email: e.target.value}))}
                      placeholder={t('checkout.email_placeholder')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                      {t('checkout.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      placeholder={t('checkout.phone_placeholder')}
                      value={deliveryInfo.phone}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setDeliveryInfo(prev => ({
                          ...prev,
                          phone: value
                        }));
                        
                        // Save to localStorage if user is logged in
                        if (user?.uid) {
                          localStorage.setItem(`profile_phone_${user.uid}`, value);
                        }
                      }}
                      onKeyDown={(e) => {
                        // Prevent non-numeric characters
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="city">
                      {t('checkout.city')} <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="city"
                        name="city"
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent appearance-none transition-all duration-200"
                        value={deliveryInfo.city}
                        onChange={handleAddressChange}
                      >
                        <option value="Тбилиси">Тбилиси</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t('checkout.only_tbilisi')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="district">
                      {t('checkout.district')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      value={deliveryInfo.district}
                      onChange={handleAddressChange}
                      placeholder={t('checkout.district_placeholder')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="building">
                      {t('checkout.building')} <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="building"
                        name="building"
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 group-hover:border-primary/30"
                        value={deliveryInfo.building}
                        onChange={handleAddressChange}
                        placeholder={t('checkout.building_placeholder')}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="floor">
                      {t('checkout.floor')}
                      <span className="text-muted-foreground text-xs ml-1">({t('checkout.optional')})</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 group-hover:border-primary/30"
                        value={deliveryInfo.floor}
                        onChange={handleAddressChange}
                        placeholder={t('checkout.floor_placeholder')}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="apartment">
                      {t('checkout.apartment')}
                      <span className="text-muted-foreground text-xs ml-1">({t('checkout.optional')})</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 group-hover:border-primary/30"
                        value={deliveryInfo.apartment}
                        onChange={handleAddressChange}
                        placeholder={t('checkout.apartment_placeholder')}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-foreground/80" htmlFor="comment">
                    {t('checkout.comment')}
                    <span className="text-muted-foreground text-xs ml-1">({t('checkout.optional')})</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <textarea
                      id="comment"
                      className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none group-hover:border-primary/30"
                      name="comment"
                      value={deliveryInfo.comment}
                      onChange={handleAddressChange}
                      placeholder={t('checkout.comment_placeholder')}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transform"
                    disabled={isProcessing}
                  >
                    {isProcessing ? t('checkout.processing') : t('checkout.complete_order')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-border/30 overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full -ml-20 -mb-20"></div>
              
              <h2 className="text-2xl font-bold mb-6 relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('checkout.order_summary')}
              </h2>
              <div className="space-y-4 relative z-10">
                <div className="max-h-[300px] overflow-y-auto pr-2 -mr-2">
                  {cart.map((item) => {
                    const productName = getProductName(item.product.name);
                    const productImage = Array.isArray(item.product.images) && item.product.images.length > 0 
                      ? item.product.images[0] 
                      : '';
                    
                    return (
                      <div key={item.product.id} className="flex items-start justify-between py-3 group">
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            {productImage ? (
                              <img
                                src={productImage}
                                alt={productName}
                                className="w-16 h-16 object-cover rounded-lg border border-border/30 group-hover:border-primary/50 transition-colors duration-200"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                  <circle cx="9" cy="9" r="2"/>
                                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                </svg>
                              </div>
                            )}
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="pt-1">
                            <h3 className="font-medium text-foreground line-clamp-2">{productName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatPrice(item.product.price)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.product.id);
                            }}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1 -mr-2 -mt-1"
                            aria-label={t('cart.remove_item')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                              <line x1="10" x2="10" y1="11" y2="17"/>
                              <line x1="14" x2="14" y1="11" y2="17"/>
                            </svg>
                          </button>
                          <span className="font-medium text-foreground whitespace-nowrap mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border/30 mt-6 pt-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <span>{t('cart.discount')}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                          -{Math.round((discount / subtotal) * 100)}%
                        </span>
                      </div>
                      <span className="text-destructive font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <span>{t('cart.delivery')}</span>
                        {subtotal + discount >= 100 ? (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                            {t('cart.free')}
                          </span>
                        ) : null}
                      </div>
                      <span className={cn("font-medium", {
                        "line-through text-muted-foreground/50": subtotal + discount >= 100,
                        "text-foreground": subtotal + discount < 100
                      })}>
                        {subtotal + discount >= 100 ? (
                          <span className="text-green-600 ml-1">{t('cart.free')}</span>
                        ) : (
                          formatPrice(deliveryFee)
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-border/30 mt-2">
                    <span className="font-semibold">{t('cart.total')}</span>
                    <div className="text-right">
                      <div className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </div>
                      {subtotal + discount < 100 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {t('cart.add_more_for_free_delivery', {
                            amount: formatPrice(100 - (subtotal + discount))
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
