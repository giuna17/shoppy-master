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
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
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
    setIsCategoriesModalOpen(false);
    
    // If switching to most popular view, refresh the most popular product
    if (!showDiscount) {
      const popular = getMostPopularProduct();
      setMostPopularProduct(popular);
    }
  };

  // Check for modal open state in URL or location state
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('categories') === 'true') {
      setIsCategoriesModalOpen(true);
    } else if (window.history.state?.openCategoriesModal) {
      setIsCategoriesModalOpen(true);
    }
    
    // Listen for popstate events (back/forward navigation)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.openCategoriesModal) {
        setIsCategoriesModalOpen(true);
      } else {
        const searchParams = new URLSearchParams(window.location.search);
        setIsCategoriesModalOpen(searchParams.get('categories') === 'true');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Handle modal open/close with URL updates
  const openCategoriesModal = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('categories', 'true');
    window.history.pushState({ openCategoriesModal: true }, '', `?${searchParams.toString()}`);
    setIsCategoriesModalOpen(true);
  };
  
  const closeCategoriesModal = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setIsCategoriesModalOpen(false);
  };
  
  const toggleCategories = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCategoriesModalOpen) {
      closeCategoriesModal();
    } else {
      openCategoriesModal();
    }
  };

  const closeModal = () => {
    closeCategoriesModal();
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
                  onClick={toggleCategories}
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
                        boxShadow: `${!showDiscounted && !isCategoriesModalOpen ? '0 0 15px rgba(220, 38, 38, 0.3)' : 'none'}`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                           style={{
                             animation: 'shimmer 3s infinite linear',
                             backgroundImage: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2) 50%, transparent)'
                           }}
                      ></div>
                      <span className={`relative z-10 transition-all duration-300 ${!showDiscounted && !isCategoriesModalOpen ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
                        {t('home.most_popular').split(' ')[0]}
                      </span>
                      <span className={`relative z-10 transition-all duration-300 ${!showDiscounted && !isCategoriesModalOpen ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
                        {t('home.most_popular').split(' ').slice(1).join(' ')}
                      </span>
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent ${!showDiscounted && !isCategoriesModalOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} transition-opacity duration-500`}></div>
                    </button>
                  </div>

                  <div className="relative group">
                    <button
                      onClick={() => toggleView(true)}
                      className="relative z-10 px-4 py-3 text-[1.65rem] font-medium cursor-pointer uppercase tracking-wider flex items-center gap-2 font-medieval transition-all duration-500 transform hover:scale-105 border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
                        boxShadow: `${showDiscounted && !isCategoriesModalOpen ? '0 0 15px rgba(220, 38, 38, 0.3)' : 'none'}`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                           style={{
                             animation: 'shimmer 8s infinite linear',
                             backgroundImage: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2) 50%, transparent)'
                           }}
                      ></div>
                      <span className={`relative z-10 transition-all duration-500 ${showDiscounted && !isCategoriesModalOpen ? 'text-crimson font-bold' : 'text-foreground/80 group-hover:text-crimson'}`}>
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
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent ${showDiscounted && !isCategoriesModalOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} transition-opacity duration-500`}></div>
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
      <section className="py-12 px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight relative z-10 font-medieval">
                <span className="text-crimson">{t('home.popular_products').split(' ')[0]}</span>
                {t('home.popular_products').split(' ').length > 1 && (
                  <span className="text-white"> {t('home.popular_products').split(' ').slice(1).join(' ')}</span>
                )}
              </h2>
              <div className="w-16 h-0.5 bg-crimson/60 mt-2" />
            </div>
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-crimson/10 hover:bg-crimson/20 text-crimson border border-crimson/20 rounded-md transition-colors group"
            >
              {t('home.view_all')}
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
                className="lucide lucide-arrow-right h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
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
      
      {/* Categories Modal */}
      {isCategoriesModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
          onClick={closeModal}
        >
          <div 
            className="bg-black/70 backdrop-blur-sm rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-crimson/50 shadow-2xl shadow-crimson/10 transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={e => e.stopPropagation()}
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <div className="relative p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson/90 via-crimson/70 to-crimson/90" />
              
              <div className="flex flex-col items-center mb-8">
                <h3 className="text-3xl font-bold text-white font-medieval tracking-wider mb-2">
                  {t('product.categories')}
                </h3>
                <div className="w-24 h-1 bg-crimson/70 rounded-full" />
              </div>

              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Close"
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M6 18L18 6M6 6l12 12" 
                    className="transition-transform duration-200 hover:scale-110"
                  />
                </svg>
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => {
                  const categoryProducts = getProductsByCategory(category);
                  const itemCount = categoryProducts.length;
                  const featuredProduct = categoryProducts[0]; // Get first product in category
                  
                  return (
                    <Link
                      key={index}
                      to={`/shop?category=${encodeURIComponent(category)}`}
                      className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-crimson/30 p-5 transition-all duration-300 hover:border-crimson/70 hover:shadow-lg hover:shadow-crimson/20 hover:scale-105 hover:z-10 h-48 flex flex-col justify-center"
                      onClick={closeModal}
                      style={{
                        animation: `fadeIn 0.4s ease-out ${index * 0.05}s forwards`,
                        opacity: 0,
                        transform: 'translateY(10px)',
                        ...(featuredProduct?.images?.[0] ? {
                          backgroundImage: `url(${featuredProduct.images[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundBlendMode: 'overlay',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        } : {})
                      }}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        {featuredProduct?.images?.[0] ? (
                          // If we have a product image, show it with a subtle overlay
                          <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm border border-crimson/50 group-hover:border-crimson/70 transition-all duration-300 relative overflow-hidden">
                            <img 
                              src={featuredProduct.images[0]} 
                              alt={featuredProduct.name[language as keyof typeof featuredProduct.name] || category}
                              className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-crimson/30 transition-all duration-500 group-hover:animate-ping" />
                          </div>
                        ) : (
                          // Fallback to icon if no product image
                          <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 group-hover:border-crimson/50 transition-all duration-300 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-crimson/30 transition-all duration-500 group-hover:animate-ping" />
                            <svg 
                              className="w-7 h-7 text-gray-300 group-hover:text-crimson transition-all duration-300 group-hover:scale-110" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                              />
                            </svg>
                          </div>
                        )}
                        
                        {/* Category name */}
                        <span className="text-base font-semibold text-white group-hover:text-crimson transition-colors duration-300 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {t(`category.${category.toLowerCase()}`)}
                        </span>
                        
                        {/* Item count */}
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-crimson/80 backdrop-blur-sm text-white group-hover:bg-crimson transition-colors duration-300">
                          {itemCount} {
                            itemCount === 1 ? t('products.one') :
                            itemCount < 5 ? t('products.few') :
                            t('products.many')
                          }
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </Link>
                  );
                })}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-crimson/90 via-crimson/70 to-crimson/90" />
            </div>
            
            {/* Custom animations */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
