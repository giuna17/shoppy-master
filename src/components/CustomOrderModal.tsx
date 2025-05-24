import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomOrderModal = ({ isOpen, onClose }: CustomOrderModalProps) => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      link: 'https://t.me/not_even_here',
      color: 'bg-[#0088cc] hover:bg-[#0088cc]/90',
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      link: 'https://instagram.com',
      color: 'bg-[#E4405F] hover:bg-[#E4405F]/90',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      link: 'https://facebook.com',
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[490px] bg-card p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-crimson">
            {t('custom_order.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-foreground/80 text-lg leading-relaxed">
            {t('custom_order.description')}
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-foreground font-semibold text-lg mb-2">
              {t('custom_order.social_links')}:
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="default"
                  className={`flex-1 ${social.color}`}
                  onClick={() => window.open(social.link, '_blank')}
                >
                  {social.icon}
                  <span className="ml-2">{social.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomOrderModal;
