import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Facebook, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
              {t('about.title')} <span className="text-crimson">NEKO</span> <span className="text-white">SHOP</span>
            </h1>
            <div className="w-24 h-1 bg-crimson mx-auto mt-6"></div>
          </div>

          <div className="space-y-10 text-gray-300">
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">{t('about.intro')}</p>

            <div className="my-12 bg-card/50 border border-border/30 p-8 rounded-xl backdrop-blur-sm">
              <blockquote className="text-2xl italic font-medium text-center text-white leading-relaxed">
                "{t('about.quote')}"
              </blockquote>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-crimson/30 pb-2 inline-block">
                {t('about.philosophy_title')}
              </h2>
              <p className="text-lg leading-relaxed">{t('about.philosophy_text')}</p>
            </div>

            <div className="space-y-6 pt-6">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-crimson/30 pb-2 inline-block">
                {t('about.craftsmanship_title')}
              </h2>
              <p className="text-lg leading-relaxed">{t('about.craftsmanship_text')}</p>
            </div>

            <div className="space-y-6 pt-6">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-crimson/30 pb-2 inline-block">
                {t('about.join_title')}
              </h2>
              <p className="text-lg leading-relaxed">{t('about.join_text')}</p>
            </div>

            <p className="text-lg font-medium text-center mb-8">
              {t('about.closing')}
            </p>

            <div className="flex justify-center space-x-6 mt-10">
              <a
                href="https://www.facebook.com/NekosShopy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-crimson/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-crimson" />
              </a>
              <a
                href="https://www.instagram.com/nekosshop/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-crimson/20 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6 text-crimson"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a>
              <a
                href="https://t.me/not_even_here"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-crimson/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-6 h-6 text-crimson" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
