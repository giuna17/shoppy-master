import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
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
// Cron job is now handled by the backend API
// The frontend will make API calls to update popular products

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Toaster />
              <Sonner />
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
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </Layout>
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
