import { useEffect } from 'react';
import { toast } from 'sonner';
import { getRandomPurchaseMessage } from '@/utils/purchaseMessages';

export const usePurchaseNotification = (show: boolean) => {
  useEffect(() => {
    if (show) {
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
        className: 'purchase-notification',
      });
    }
  }, [show]);

  return null;
};

export default usePurchaseNotification;
