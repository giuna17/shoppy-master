import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Truck, Clock, Phone, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6 text-crimson">
            {t('delivery.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2 px-2">
          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 mt-1 text-crimson flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {language === 'ru' && 'Доставка по всему Тбилиси'}
                {language === 'en' && 'Delivery throughout Tbilisi'}
                {language === 'ge' && 'მიტანა მთელ თბილისში'}
              </h3>
              <p className="text-foreground/90">
                {language === 'ru' && 'Цена: 5 лари'}
                {language === 'en' && 'Price: 5 GEL'}
                {language === 'ge' && 'ფასი: 5 ლარი'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 mt-1 text-crimson flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {language === 'ru' && 'Сроки доставки'}
                {language === 'en' && 'Delivery time'}
                {language === 'ge' && 'მიტანის ვადები'}
              </h3>
              <p className="text-foreground/90">
                {language === 'ru' && 'от 1 до 5 дней'}
                {language === 'en' && '1 to 5 days'}
                {language === 'ge' && '1 დღიდან 5 დღემდე'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 mt-1 text-crimson flex-shrink-0" />
            <p className="text-foreground/90">
              {language === 'ru' && 'Курьер свяжется с вами заранее по указанному номеру телефона'}
              {language === 'en' && 'The courier will contact you in advance using the provided phone number'}
              {language === 'ge' && 'კურიერი წინასწარ დაგიკავშირდებათ თქვენს მიერ მითითებულ ტელეფონის ნომერზე'}
            </p>
          </div>

          <div className="flex items-start gap-4 bg-crimson/10 p-4 rounded-lg border border-crimson/20">
            <Gift className="w-6 h-6 mt-1 text-crimson flex-shrink-0" />
            <p className="text-foreground/90 font-medium">
              {language === 'ru' && 'При заказе от 100 лари - доставка бесплатная!'}
              {language === 'en' && 'Free delivery for orders over 100 GEL!'}
              {language === 'ge' && '100 ლარიდან ზემოთ შეკვეთებზე - მიტანა უფასოა!'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryModal;
