import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import DeliveryModal from './DeliveryModal';

const Footer = () => {
  const { t } = useLanguage();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/nekos-logo.jpeg"
                alt="Neko mini logo"
                className="h-8 w-8"
              />
              <h3 className="text-xl font-bold tracking-tighter">
                <span className="text-crimson">NEKO</span>
                <span className="text-black">.</span>
                <span className="text-white">shop</span>
              </h3>
            </div>
            <p className="text-sm text-foreground/80">
              {t('footer.alternative_jewelry')}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.shop')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.all_products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=handmade"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.handmade_products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=other"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.other_products')} <span className="text-xs">სხვა</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <a
                  href="https://nekoshop.online/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-crimson transition"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setIsDeliveryModalOpen(true)}
                  className="text-foreground/80 hover:text-crimson transition w-full text-left"
                >
                  {t('footer.shipping')}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.info')}</h4>
            <div className="space-y-2 text-foreground/80">
              <p>{t('footer.handmade')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-foreground/60">
          <p> </p>
        </div>
      </div>
      <DeliveryModal 
        isOpen={isDeliveryModalOpen} 
        onClose={() => setIsDeliveryModalOpen(false)} 
      />
      
      {/* Bottom section with legal links */}
      <div className="border-t border-border mt-8 pt-6 pb-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-foreground/60 mb-4 md:mb-0">
            {new Date().getFullYear()} NEKO.shop. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://nekoshop.online/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 hover:text-crimson transition"
            >
              Privacy Policy
            </a>
            <a 
              href="https://nekoshop.online/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 hover:text-crimson transition"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
