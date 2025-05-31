import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { X, Gift, Facebook, Instagram } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface DiscountInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6 text-crimson">
            {language === 'ru' && 'Хочешь скидку?'}
            {language === 'en' && 'Want a discount?'}
            {language === 'ge' && 'გსურთ მიიღოთ ფასდაკლება?'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2 px-2">
          <div className="text-center font-medium mb-6">
            {language === 'ru' && 'Вот как её получить:'}
            {language === 'en' && 'Here\'s how to get it:'}
            {language === 'ge' && 'აი რამოდენიმე მეთოდი მის მისაღებად:'}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-crimson/20 rounded-full flex items-center justify-center text-crimson font-bold">1</div>
              <div>
                <p className="font-medium">
                  {language === 'ru' && 'Промокоды, которые мы выкладываем в наших соцсетях!'}
                  {language === 'en' && 'Promo codes that we post on our social media!'}
                  {language === 'ge' && 'პრომო კოდები, რომლებსაც ჩვენს სოციალურ ქსელებში ვპოსტავთ!'}
                </p>
                <div className="flex gap-4 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
                    onClick={() => handleSocialClick('https://www.facebook.com/NekosShopy')}
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 bg-pink-600 hover:bg-pink-700 text-white border-pink-700"
                    onClick={() => handleSocialClick('https://www.instagram.com/nekosshop/')}
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-crimson/20 rounded-full flex items-center justify-center text-crimson font-bold">2</div>
              <div>
                <p className="font-medium">
                  {language === 'ru' && 'При заказе от 500 лар — получаешь 10% скидку!'}
                  {language === 'en' && 'For orders over 500 lari — get 10% off!'}
                  {language === 'ge' && '500 ლარიდან ზემოთ შეკვეთებზე — მიიღეთ 10%-იანი ფასდაკლება!'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-crimson/20 rounded-full flex items-center justify-center text-crimson font-bold">3</div>
              <div>
                <p className="font-medium">
                  {language === 'ru' && 'При заказе от 200 лар — получаешь 5% скидку!'}
                  {language === 'en' && 'For orders over 200 lari — get 5% off!'}
                  {language === 'ge' && '200 ლარიდან ზემოთ შეკვეთებზე — მიიღეთ 5%-იანი ფასდაკლება!'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-crimson/20 rounded-full flex items-center justify-center text-crimson font-bold">4</div>
              <div>
                <p className="font-medium">
                  {language === 'ru' && 'При заказе от 100 лар — доставка бесплатная!'}
                  {language === 'en' && 'For orders over 100 lari — free delivery!'}
                  {language === 'ge' && '100 ლარიდან ზემოთ შეკვეთებზე — უფასო მიტანა!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountInfo;
