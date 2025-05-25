import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { getRandomPurchaseMessage } from '@/utils/purchaseMessages';

const Checkout = () => {
  const { cart, clearCart, calculateTotal, calculateDiscount, calculateTotalWithDiscount } = useCartContext();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Show purchase notification
      const message = getRandomPurchaseMessage();
      toast.success(message, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      });
      
      // Clear cart and redirect to home
      clearCart();
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('checkout.empty_cart')}</h1>
        <p className="mb-6">{t('checkout.add_items')}</p>
        <Button onClick={() => navigate('/shop')}>
          {t('checkout.continue_shopping')}
        </Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('checkout.delivery_info')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    {t('checkout.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    value={deliveryInfo.name}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
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
                    className="w-full px-3 py-2 border rounded-md"
                    value={deliveryInfo.email}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
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
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
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
                    className="w-full px-3 py-2 border rounded-md"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-crimson hover:bg-crimson/90 text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? t('checkout.processing') : t('checkout.complete_order')}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">{t('checkout.order_summary')}</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name[t('common.language') as 'ru' | 'en' | 'ka']}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × {item.product.price} ₾
                    </p>
                  </div>
                  <p className="font-medium">
                    {(item.quantity * item.product.price).toFixed(2)} ₾
                  </p>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>{calculateTotal().toFixed(2)} ₾</span>
                </div>
                {calculateDiscount().amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('cart.discount')} ({calculateDiscount().percentage}%)</span>
                    <span>-{calculateDiscount().amount.toFixed(2)} ₾</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>{t('cart.total')}</span>
                  <span>{calculateTotalWithDiscount().toFixed(2)} ₾</span>
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
