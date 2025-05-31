import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getRandomPurchaseMessage } from '@/utils/purchaseMessages';

const Checkout = () => {
  const { cart, clearCart, calculateTotal, calculateDiscount, calculateTotalWithDiscount } = useCartContext();
  const { t } = useLanguage();
  const { isLoggedIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

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
    address: '',
  });

  // Load saved address from localStorage when component mounts
  useEffect(() => {
    if (user?.uid) {
      const savedPhone = localStorage.getItem(`profile_phone_${user.uid}`);
      const savedAddress = localStorage.getItem(`profile_address_${user.uid}`);
      
      setDeliveryInfo(prev => ({
        ...prev,
        phone: savedPhone || '',
        address: savedAddress || '',
        name: user.displayName || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Save address to localStorage when it changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Save to localStorage if user is logged in
    if (user?.uid) {
      if (name === 'phone') {
        localStorage.setItem(`profile_phone_${user.uid}`, value);
      } else if (name === 'address') {
        localStorage.setItem(`profile_address_${user.uid}`, value);
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 relative">
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Checkout</h1>
      
      {/* Login Prompt Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${showLoginPrompt ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-card border border-border rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${showLoginPrompt ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
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
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo(prev => ({...prev, name: e.target.value}))}
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
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground"
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo(prev => ({...prev, email: e.target.value}))}
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
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground"
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
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                      {t('checkout.address')} *
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground"
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isProcessing}
                  >
                    {isProcessing ? t('checkout.processing') : t('checkout.complete_order')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => {
                  const productName = getProductName(item.product.name);
                  const productImage = Array.isArray(item.product.images) && item.product.images.length > 0 
                    ? item.product.images[0] 
                    : '';
                  
                  return (
                    <div key={item.product.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        {productImage && (
                          <img
                            src={productImage}
                            alt={productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-medium">
                            {productName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × {item.product.price} ₾
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        {(item.quantity * item.product.price).toFixed(2)} ₾
                      </p>
                    </div>
                  );
                })}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{calculateTotal().toFixed(2)} ₾</span>
                  </div>
                  {calculateDiscount().amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({calculateDiscount().percentage}%)</span>
                      <span>-{calculateDiscount().amount.toFixed(2)} ₾</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>{calculateTotalWithDiscount().toFixed(2)} ₾</span>
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
