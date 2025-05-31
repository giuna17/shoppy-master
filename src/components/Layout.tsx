import { ReactNode, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const getScrollContainer = () => {
    return document.getElementById('main') || document.documentElement || document.body;
  };

  const handleScroll = () => {
    const scrollContainer = getScrollContainer();
    const scrollTop = scrollContainer.scrollTop || window.pageYOffset;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    const scrollContainer = getScrollContainer();
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollContainer = getScrollContainer();
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson/5 via-transparent to-transparent opacity-40"></div>
      <div className="relative z-10">
        {children}
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed left-6 bottom-6 z-50 inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium',
          'bg-crimson/10 hover:bg-crimson/20 text-crimson border border-crimson/20 rounded-md',
          'transition-all duration-300 transform group',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        )}
        aria-label={t('common.scroll_to_top', { defaultValue: 'Scroll to top' })}
      >
        {t('common.scroll_to_top', { defaultValue: 'Back to top' })}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default Layout;
