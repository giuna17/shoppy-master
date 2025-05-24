import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedProduct from '@/components/FeaturedProduct';
import FeaturedReviews from '@/components/FeaturedReviews';
import { Button } from '@/components/ui/button';
import { getProducts, getFeaturedProducts } from '@/services/productService';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';

const Index = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCartContext();
  const [showFeatured, setShowFeatured] = useState(true);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const featuredProducts = getFeaturedProducts();
  const products = getProducts().slice(0, 4); // Show first 4 products on homepage

  // Get the Star of David choker product from the service
  const starOfDavidProduct = getProducts().find(p => p.id === 11) || {
    id: 11,
    name: {
      ru: "Чокер 'Звезда Давида' из стали",
      en: "Steel 'Star of David' Choker",
      ge: "ფოლადის 'დავითის ვარსკვლავი' ჩოკერი",
    },
    description: {
      ru: 'Элегантный стальной чокер с подвеской в виде Звезды Давида. Символ иудаизма и еврейской идентичности. Идеально подходит для повседневного ношения и особых случаев. Выполнен из высококачественной хирургической стали, не вызывает аллергии и не темнеет со временем.',
      en: 'Elegant steel choker featuring a Star of David pendant. A symbol of Judaism and Jewish identity. Perfect for both everyday wear and special occasions. Made from high-quality surgical steel, hypoallergenic and tarnish-resistant.',
      ge: 'ელეგანტური ფოლადის ჩოკერი დავითის ვარსკვლავის ქინძისთავით. იუდაიზმისა და ებრაული იდენტობის სიმბოლო. იდეალურია როგორც ყოველდღიური, ასევე სპეციალური დღეებისთვის. დამზადებულია მაღალი ხარისხის ქირურგიული ფოლადისგან, ჰიპოალერგენული და გაუფერულებადი.',
    },
    price: 45,
    currency: '₾',
    images: [
      '/lovable-uploads/choker-dvd-1.jpg',
      '/lovable-uploads/choker-dvd-2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
  };

  const toggleFeatured = () => {
    setShowFeatured(!showFeatured);
    // Скрываем блок со скидками при показе избранного
    if (!showFeatured) setShowDiscounted(false);
  };

  const toggleDiscounted = () => {
    setShowDiscounted(!showDiscounted);
    // Скрываем избранный товар при показе скидок
    if (!showDiscounted) setShowFeatured(false);
  };

  const handleAddToCart = (productId: number) => {
    const product =
      products.find((p) => p.id === productId) ||
      featuredProducts.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero section */}
      <section className="py-16 px-4 bg-background relative flex items-center justify-center min-h-[60vh]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-no-repeat bg-center bg-contain opacity-50 scale-[1.95] translate-y-[15%]" />
          {/* Gradient overlay to hide bottom part */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background"
            style={{ top: '65%' }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 mt-6 relative z-10 font-medieval">
            <span className="text-crimson">Handmade</span>{' '}
            <span className="text-white">Oddities</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            {t('home.subtitle')}
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: '4.4%' }}
          >
            <Button
              asChild
              className="bg-crimson hover:bg-crimson/90 text-black font-medium px-10 py-7 text-lg"
              style={{ transform: 'scale(1.15)' }}
            >
              <Link to="/shop">{t('home.shop_now')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-foreground border-crimson hover:bg-crimson/10 px-10 py-7 text-lg"
              style={{ transform: 'scale(1.15)' }}
            >
              <Link to="/about">{t('home.our_story')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Product Section - Star of David Choker */}
      <section className="py-12 px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="w-[101%] -mx-[0.5%] relative">
            <div className="bg-card border border-border rounded-lg p-6 relative">
              <div className="absolute -top-12 left-0 right-0 flex gap-4 justify-start">
                <button
                  onClick={toggleFeatured}
                  className={`z-10 px-6 py-2 rounded-lg text-xl font-medium border transition-colors cursor-pointer uppercase tracking-wider flex gap-1 font-medieval ${
                    showFeatured
                      ? 'bg-crimson/10 text-white border-crimson/30 hover:bg-crimson/20'
                      : 'bg-background/90 text-foreground/80 border-border hover:bg-muted/20'
                  }`}
                >
                  <span className="text-crimson">{t('home.most_popular').split(' ')[0]}</span>
                  <span className="text-white">{t('home.most_popular').split(' ').slice(1).join(' ')}</span>
                </button>
                <button
                  onClick={toggleDiscounted}
                  className={`z-10 px-6 py-2 rounded-lg text-xl font-medium border transition-colors cursor-pointer uppercase tracking-wider flex gap-1 font-medieval ${
                    showDiscounted
                      ? 'bg-muted/30 text-white border-crimson/20 hover:bg-muted/50'
                      : 'bg-background/80 text-foreground/60 border-border hover:bg-muted/20'
                  }`}
                >
                  {t('product.discounts')}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center mt-6">
                {showFeatured && starOfDavidProduct && (
                  <>
                    <div className="relative aspect-square max-w-md mx-auto md:mx-0">
                      <a
                        className="block"
                        href={`/product/${starOfDavidProduct.id}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-star w-60 h-60"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <img
                          src={starOfDavidProduct.images[0]}
                          alt={starOfDavidProduct.name.ru}
                          className="object-cover w-full h-full rounded-md crimson-glow border-2 border-crimson relative z-1"
                        />
                      </a>
                    </div>
                    <div className="space-y-4">
                      <a
                        className="block"
                        href={`/product/${starOfDavidProduct.id}`}
                      >
                        <h2 className="text-4xl font-bold text-crimson tracking-tight">
                          {starOfDavidProduct.name[language]}
                        </h2>
                      </a>
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        {starOfDavidProduct.description[language]}
                      </p>
                      <div className="flex justify-between items-center pt-4">
                        <p className="text-3xl font-bold">
                          {starOfDavidProduct.price}{' '}
                          {starOfDavidProduct.currency}
                        </p>
                        <button
                          onClick={() => handleAddToCart(starOfDavidProduct.id)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-crimson hover:bg-crimson/90 text-black font-medium relative px-6 py-6 text-lg"
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-shopping-cart w-8 h-8"
                            >
                              <circle cx="8" cy="21" r="1"></circle>
                              <circle cx="19" cy="21" r="1"></circle>
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                            </svg>
                          </div>
                          <span className="relative z-1 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-shopping-cart mr-2 h-4 w-4"
                            >
                              <circle cx="8" cy="21" r="1"></circle>
                              <circle cx="19" cy="21" r="1"></circle>
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                            </svg>
                            В корзину
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Блок товаров со скидкой */}
              {showDiscounted && (
                <div className="col-span-2 mt-6 p-6 bg-muted/10 rounded-lg border border-border">
                  <h3 className="text-2xl font-bold text-crimson mb-6">
                    {t('product.discounted_products')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Здесь будут отображаться товары со скидкой */}
                    <div className="text-center text-foreground/60">
                      <p>{t('product.coming_soon_discounted')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Products */}
      <section className="py-12 px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ fontSize: '1.8rem' }}>
              {t('home.popular_products')}
            </h2>
            <Button
              asChild
              variant="link"
              className="text-crimson hover:text-crimson/80 text-lg"
            >
              <Link to="/shop">
                {t('home.view_all')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-2 h-5 w-5"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <FeaturedReviews />

      <Footer />
    </div>
  );
};

export default Index;
