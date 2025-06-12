import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Index from './pages/Index';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import ReviewsPage from './pages/ReviewsPage';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Cron job is now handled by the backend API
// The frontend will make API calls to update popular products

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading of critical assets
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5 + Math.random() * 15; // Random progress increment
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsAssetsLoaded(true);
        // Wait for React to be fully hydrated
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      }
      setLoadingProgress(Math.min(progress, 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Preloader 
      isLoading={isLoading}
      progress={loadingProgress}
      isAssetsLoaded={isAssetsLoaded}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <FavoritesProvider>
                  <Toaster />
                  <Sonner />
                  <HelmetProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <Layout>
                        <div id="main" className="min-h-screen flex flex-col">
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route
                              path="/category/:categoryName"
                              element={<CategoryPage />}
                            />
                            <Route path="/reviews" element={<ReviewsPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/terms" element={<TermsAndConditions />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </div>
                      </Layout>
                    </BrowserRouter>
                  </HelmetProvider>
                </FavoritesProvider>
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Preloader>
  );
};

export default App;
