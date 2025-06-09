import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedProduct from '@/components/FeaturedProduct';
import FeaturedReviews from '@/components/FeaturedReviews';
import { Button } from '@/components/ui/button';
import { getProducts, getFeaturedProducts, getMostPopularProduct, getProductsByCategory, Product } from '@/services/productService';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

// Add custom animation styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes slowPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes slowPing {
      75%, 100% {
        transform: scale(1.8);
        opacity: 0;
      }
    }
    .animate-slow-pulse {
      animation: slowPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-slow-ping {
      animation: slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .animate-ping-slow {
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .animate-pulse-slow {
      animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes move-right {
      0% { transform: translateX(-100%); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateX(100vw); opacity: 0; }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-move-right {
      animation: move-right 8s linear infinite;
    }
    .delay-500 {
      animation-delay: 0.5s;
    }
    .delay-1000 {
      animation-delay: 1s;
    }
    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    .animate-spin-slow-reverse {
      animation: spin-reverse 4s linear infinite;
    }
  </style>
`);

const Index = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCartContext();
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [mostPopularProduct, setMostPopularProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const featuredProducts = getFeaturedProducts();
  const products = getProducts().slice(0, 4); // Show first 4 products on homepage
  
  // Get all categories including hardcoded ones from Shop page
  const allProducts = getProducts();
  const categories = Array.from(
    new Set([
      'chokers',
      'earrings',
      'bracelets',
      'rings',
      'hairpins',
      'candles',
      'necklaces',
      ...allProducts.map(p => p.category)
    ].filter(Boolean))
  ).sort();

  // Load featured product on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = getProducts();
        const featured = products.filter(product => product.featured);

        if (featured.length > 0) {
          setFeaturedProduct(featured[0]);
        } else {
          // If no featured products, use the first product as fallback
          setFeaturedProduct(products[0] || null);
        }

        // Load most popular product
        const popular = getMostPopularProduct();
        setMostPopularProduct(popular);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Toggle between most popular and discounted products
  const toggleView = (showDiscount: boolean) => {
    setShowDiscounted(showDiscount);
    
    // If switching to most popular view, refresh the most popular product
    if (!showDiscount) {
      const popular = getMostPopularProduct();
      setMostPopularProduct(popular);
    }
  };

  // Function to open categories from Navbar
  const openCategories = () => {
    // Find the categories button by its text content
    const navButtons = Array.from(document.querySelectorAll('nav button'));
    const categoriesButton = navButtons.find(button => 
      button.textContent?.includes(t('nav.categories'))
    ) as HTMLButtonElement | undefined;
    
    if (categoriesButton) {
      categoriesButton.click();
    }
  };
  
  const handleAddToCart = (productId: number) => {
    const product = getProducts().find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  // Get and memoize discounted products - only include specific product IDs
  const discountedProducts = React.useMemo(() => {
    const allProducts = getProducts();
    
    // Only include specific product IDs that should be on sale
    const discountedProductIds = [31]; // Add more IDs here as needed
    
    // Filter products to only include the ones in our discounted list
    const filteredProducts = allProducts.filter(product => 
      discountedProductIds.includes(product.id) && 
      product.originalPrice && 
      product.originalPrice > product.price
    );
    
    // Sort by ID to maintain consistent order
    return [...filteredProducts].sort((a, b) => a.id - b.id);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimson"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="relative flex items-start justify-center h-[calc(70vh-64px)] -mt-[6%]">
          <div className="relative w-[65%] h-full">
            <img
              src="/lovable-uploads/backgrnd.jpeg"
              alt="Background"
              className="w-full h-full object-cover object-center"
              style={{
                objectPosition: 'center 30%',
                opacity: 0.37
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/90" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto text-center relative z-10">
            <div className="relative inline-block">
              {/* Animated background elements */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-crimson/10 blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-crimson/5 blur-2xl animate-pulse-slow delay-1000"></div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 relative z-10 font-medieval">
                {/* Animated decorative elements */}
                <div className="absolute -left-16 -top-8 w-8 h-8 rounded-full bg-crimson/20 blur-md animate-float"></div>
                <div className="absolute -right-12 -bottom-4 w-6 h-6 rounded-full bg-crimson/15 blur-sm animate-float delay-500"></div>
                
                <div className="relative inline-block">
                  <span className="relative">
                    <span className="relative z-10 text-crimson drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                      Pawmade
                    </span>
                    {' '}
                    <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      Oddities
                    </span>
                  </span>
                  
                  {/* Animated underline */}
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-crimson/60 to-transparent">
                    <span className="absolute top-0 left-0 w-8 h-full bg-crimson/80 blur-sm animate-move-right"></span>
                  </span>
                </div>
              </h1>
            </div>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
              {t('home.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6">
              {/* Shop Now Button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900 via-crimson to-red-800 rounded-xl blur opacity-75 group-hover:opacity-100 group-hover:duration-200 transition-all duration-700"></div>
                <Link 
                  to="/shop"
                  className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white font-bold px-14 py-6 text-lg rounded-xl border-2 border-red-900/60 hover:border-crimson/80 shadow-2xl hover:shadow-[0_0_25px_rgba(185,28,28,0.4)] transition-all duration-300 transform group-hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 tracking-wider">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="animate-bounce"
                      style={{ animationDuration: '2s' }}
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    {t('home.shop_now')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </Link>
              </div>

              {/* Categories Button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/80 via-red-800/60 to-red-900/80 rounded-xl blur opacity-75 group-hover:opacity-100 group-hover:duration-200 transition-all duration-700"></div>
                <button
                  onClick={openCategories}
                  className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white/90 hover:text-white font-bold px-14 py-6 text-lg rounded-xl border-2 border-red-900/60 hover:border-red-800/70 shadow-2xl hover:shadow-[0_0_25px_rgba(153,27,27,0.25)] transition-all duration-300 transform group-hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 tracking-wider">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:rotate-12 transition-transform duration-300"
                    >
                      <rect x="3" y="4" width="18" height="4" rx="1" />
                      <rect x="3" y="10" width="18" height="4" rx="1" />
                      <rect x="3" y="16" width="18" height="4" rx="1" />
                    </svg>
                    {t('product.categories')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Section - Most Popular Product */}
      <section className="py-12 px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="w-[101%] -mx-[0.5%] relative">
            <div className="relative">
              <div className="absolute -top-20 left-0 right-0 flex items-center">
                <div className="flex gap-8">
                  <div className="relative group">
                    <button
                      onClick={() => toggleView(false)}
                      className="relative z-10 px-4 py-3 text-[1.65rem] font-medium cursor-pointer uppercase tracking-wider flex items-center gap-2 font-medieval transition-all duration-500 transform hover:scale-105 border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
                        boxShadow: !showDiscounted ? '0 0 15px rgba(220, 38, 38, 0.3)' : 'none'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                           style={{
                             animation: 'shimmer 3s infinite linear',
                             backgroundImage: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2) 50%, transparent)'
                           }}
                      ></div>
                      <span className={`relative z-10 transition-all duration-300 ${!showDiscounted ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
                        {t('home.most_popular').split(' ')[0]}
                      </span>
                      <span className={`relative z-10 transition-all duration-300 ${!showDiscounted ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
                        {t('home.most_popular').split(' ').slice(1).join(' ')}
                      </span>
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent ${!showDiscounted ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} transition-opacity duration-500`}></div>
                    </button>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => toggleView(true)}
                      className="relative z-10 px-4 py-3 text-[1.65rem] font-medium cursor-pointer uppercase tracking-wider flex items-center gap-2 font-medieval transition-all duration-500 transform hover:scale-105 border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
                        boxShadow: showDiscounted ? '0 0 15px rgba(220, 38, 38, 0.3)' : 'none'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                           style={{
                             animation: 'shimmer 8s infinite linear',
                             backgroundImage: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2) 50%, transparent)'
                           }}
                      ></div>
                      <span className={`relative z-10 transition-all duration-500 ${showDiscounted ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
                        {t('product.discounts')}
                      </span>
                      {discountedProducts.length > 0 && (
                        <span className="relative z-10 bg-red-900/80 text-white text-sm font-bold px-2.5 py-0.5 rounded-full flex items-center justify-center min-w-6 h-6 transform transition-all duration-500 group-hover:scale-110">
                          <span className="relative z-20">
                            {discountedProducts.length}
                          </span>
                          <span className="absolute inset-0 rounded-full bg-red-900/80 opacity-70" 
                                style={{
                                  animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                                  animationDelay: '2s'
                                }}>
                          </span>
                        </span>
                      )}
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent ${showDiscounted ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} transition-opacity duration-500`}></div>
                    </button>
                  </div>
                </div>

                {/* Categories button has been moved to the Navbar */}
              </div>
              <div className="mt-12">

                {!showDiscounted && featuredProduct && (
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Image Section */}
                    <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-xl overflow-hidden border-2 border-crimson/20">
                      <a
                        className="block h-full w-full"
                        href={`/product/${featuredProduct.id}`}
                      >
                        <img
                          src={featuredProduct.images[0]}
                          alt={featuredProduct.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <div className="absolute top-3 right-3 bg-crimson/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {t('most_popular')}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-col h-full">
                      {/* Title Section (Green) */}
                      <div className="mb-4">
                        <h2 className="text-3xl font-bold text-crimson">
                          {featuredProduct.name[language]}
                        </h2>
                      </div>
                      
                      {/* Description Section (Blue) */}
                      <div className="flex-grow">
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          {featuredProduct.description[language]}
                        </p>
                      </div>
                      
                      {/* Price & Button Section (Orange) */}
                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <p className="text-3xl font-bold text-crimson">
                          {featuredProduct.price} {featuredProduct.currency}
                        </p>
                        <button
                          onClick={() => handleAddToCart(featuredProduct.id)}
                          className="bg-crimson hover:bg-crimson/90 text-white font-medium py-3 px-8 rounded-full transition-all flex items-center gap-2 hover:scale-105"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-shopping-cart"
                          >
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                          </svg>
                          {t('product.add_to_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {showDiscounted && discountedProducts.length > 0 && (
                  <div className="mt-8">
                    <div className="relative">
                      <div className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-thin scrollbar-thumb-crimson/50 scrollbar-track-transparent hover:scrollbar-thumb-crimson/70 scrollbar-thumb-rounded-full">
                        <div className="flex space-x-6 pr-4">
                          {discountedProducts.map((product) => (
                            <div 
                              key={`discounted-${product.id}`} 
                              className="w-80 flex-shrink-0"
                            >
                              <ProductCard
                                {...product}
                                originalPrice={product.originalPrice}
                                onAddToCart={() => handleAddToCart(product.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Scroll indicator */}
                      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-crimson/70 transition-all duration-300" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Products */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 px-2 sm:px-0">
            <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight relative z-10 font-medieval">
                <span className="text-crimson">{t('home.popular_products').split(' ')[0]}</span>
                {t('home.popular_products').split(' ').length > 1 && (
                  <span className="text-white"> {t('home.popular_products').split(' ').slice(1).join(' ')}</span>
                )}
              </h2>
              <div className="w-12 sm:w-16 h-0.5 bg-crimson/60 mt-1 sm:mt-2" />
            </div>
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium bg-crimson/10 hover:bg-crimson/20 text-crimson border border-crimson/20 rounded-md transition-colors group w-full sm:w-auto"
            >
              {t('home.view_all')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div className="overflow-x-auto pb-4 -mx-2 sm:mx-0 sm:overflow-visible">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 min-w-max sm:min-w-0 px-2 sm:px-0">
              {products.map((product) => (
                <div key={product.id} className="w-[calc(50vw-24px)] sm:w-full">
                  <ProductCard
                    {...product}
                    onAddToCart={() => handleAddToCart(product.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed Products - Placed right after New Products */}
          <div className="col-span-full mt-12">
            <RecentlyViewed className="bg-muted/30" />
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <div className="w-[94%] mx-auto">
        <div className="mx-0.5">
          <FeaturedReviews />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
