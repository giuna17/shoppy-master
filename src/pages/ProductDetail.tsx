import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  ChevronDown,
  Minus,
  Plus,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductById } from '@/services/productService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import {
  getProductAverageRating,
  getProductReviews,
} from '@/services/reviewService';
import { cartInterestService } from '@/services/cartInterestService';
import { recentlyViewedService } from '@/services/recentlyViewedService';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { SimilarProducts } from '@/components/SimilarProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get product data
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const reviews = getProductReviews(productId);
  const averageRating = getProductAverageRating(productId);
  
  // Hooks and state
  const { addToCart, cart } = useCartContext();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
  const auth = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [imageError, setImageError] = useState<number | null>(null);
  const [isSomeoneViewing, setIsSomeoneViewing] = useState(false);
  const userHasPurchased = auth.hasUserPurchasedProduct(productId);
  
  // Track product view
  useEffect(() => {
    if (product?.id) {
      recentlyViewedService.addProduct(product.id, isInFavorites(product.id));
    }
  }, [product?.id, isInFavorites]);


  // Handle scroll and redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
      return;
    }

    // Clear any URL hashes
    if (window.location.hash) {
      window.history.replaceState(null, '', ' ');
    }
    
    // Scroll to main image with a small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      if (mainImageRef.current) {
        mainImageRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        // Fallback to top if main image ref is not available
        window.scrollTo(0, 0);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id, product, navigate]);

  // Track when someone is viewing this product
  useEffect(() => {
    if (!product?.id) return;
    
    // Register interest in this product
    cartInterestService.addInterest(product.id);
    
    // Check if someone else is viewing this product
    const checkViewers = () => {
      const isViewed = cartInterestService.checkInterest(product.id);
      setIsSomeoneViewing(isViewed);
    };
    
    // Check immediately
    checkViewers();
    
    // Then check periodically
    const interval = setInterval(checkViewers, 30000);
    
    return () => clearInterval(interval);
  }, [product?.id]);

  // Handle image loading errors
  const handleImageError = (index: number) => {
    console.error(`Failed to load image: ${product.images[index]}`);
    setImageError(index);
  };

  // Переключение на следующее изображение
  const nextImage = () => {
    if (!product?.images?.length) return;
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    setImageError(null);
  };

  // Переключение на предыдущее изображение
  const prevImage = () => {
    if (!product?.images?.length) return;
    setSelectedImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
    setImageError(null);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Back to Shop Button */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-1.5 px-4 py-2.5 bg-white/90 hover:bg-white text-crimson rounded-full shadow-lg border border-crimson/20 hover:border-crimson/40 transition-all duration-300 hover:shadow-crimson/20"
            aria-label="Вернуться в магазин"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-base font-medium">Назад в магазин</span>
          </button>
        </div>

        <Navbar />
        <div ref={containerRef} className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
              {t('product.not_found')}
            </h1>
            <p className="mb-8">{t('product.not_found_message')}</p>
            <Button asChild>
              <Link to="/shop">{t('product.return_to_shop')}</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate current quantity in cart
  const itemInCart = cart.find((item) => item.product.id === product.id);
  const currentQuantity = itemInCart?.quantity || 0;
  const remainingStock = product.stock - currentQuantity;

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Function to get localized category name
  const getCategoryName = (category: string) => {
    // Try to get the translation for the category
    const translation = t(`category.${category.toLowerCase()}`);
    // If translation exists and is not the same as the key, return it
    if (translation && translation !== `category.${category.toLowerCase()}`) {
      return translation;
    }
    // Otherwise, return the category name with first letter capitalized
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleReviewAdded = () => {
    setReviewsLoaded(!reviewsLoaded);
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />,
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4 relative" ref={mainImageRef}>
            {/* Back to Shop Button - Positioned above product image */}
            <div className="absolute -top-10 left-0 z-10">
              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-1.5 px-4 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-full shadow-lg border border-red-600/50 hover:border-red-600/70 transition-all duration-300 hover:shadow-red-500/20"
                aria-label={t('product.back_to_shop')}
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span className="text-base font-medium">
                  {t('product.back_to_shop')}
                </span>
              </button>
            </div>
            <div className="relative bg-transparent">
              <div className="relative inline-block max-w-full border-2 border-crimson/30 rounded-lg overflow-hidden bg-transparent">
                {/* Someone is viewing this product */}
                {isSomeoneViewing && (
                  <div className="absolute top-2 right-2 z-20 bg-amber-500/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{t('product.in_cart')}</span>
                  </div>
                )}
                {/* Main image with red border */}
                <div 
                  className="relative w-full h-full flex items-center justify-center bg-transparent cursor-zoom-in p-0 m-0"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  {!imageError || imageError !== selectedImageIndex ? (
                    <img
                      src={product.images[selectedImageIndex]}
                      alt={product.name[language]}
                      className="block w-auto h-auto max-h-[550px]"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      onError={() => handleImageError(selectedImageIndex)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center p-4">
                        <div className="text-gray-500 mb-2">
                          Не удалось загрузить изображение
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageError(null);
                          }}
                          className="text-sm text-crimson hover:underline"
                        >
                          Попробовать снова
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image navigation */}
                {product.images.length > 1 && (
                  <>
                    {/* Previous button */}
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2.5 rounded-full shadow-lg z-10 transition-all duration-200"
                      aria-label="Предыдущее изображение"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next button */}
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2.5 rounded-full shadow-lg z-10 transition-all duration-200"
                      aria-label="Следующее изображение"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Slide indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === selectedImageIndex
                              ? 'bg-crimson scale-125 ring-2 ring-offset-2 ring-crimson/50'
                              : 'bg-white/80 hover:bg-white'
                          }`}
                          aria-label={`Показать изображение ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 -ml-[15%] text-[0.92em]">
            <div>
              <h1 className="text-[2.3em] font-bold text-crimson mb-1">
                {product.name[language]}
              </h1>
              <div className="flex items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  className={`relative ${isInFavorites(product.id) ? 'text-crimson hover:text-crimson/90' : 'text-foreground/60 hover:text-foreground'}`}
                  onClick={() =>
                    isInFavorites(product.id)
                      ? removeFromFavorites(product.id)
                      : addToFavorites(product.id)
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${isInFavorites(product.id) ? 'fill-crimson' : ''}`}
                  />
                </Button>
                <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium text-foreground/80">
                  {getCategoryName(product.category)}
                </span>

                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-foreground/70 text-sm">
                      ({reviews.length}{' '}
                      {reviews.length === 1
                        ? t('reviews.review')
                        : t('reviews.reviews')}
                      )
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[0.92em] text-foreground/80">
                  {product.description[
                    language as keyof typeof product.description
                  ] || product.description['en']}
                </p>
                <button 
                  onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="mt-2 text-sm text-crimson hover:underline flex items-center gap-1 transition-colors"
                  aria-expanded={isDetailsExpanded}
                  aria-controls="product-details"
                >
                  {isDetailsExpanded ? t('product.hide_details') : t('product.details')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDetailsExpanded ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  id="product-details"
                  className={`overflow-hidden transition-all duration-300 ${isDetailsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="border-t border-border pt-4 mt-3">
                    <h3 className="text-lg font-bold mb-3">{t('product.details')}</h3>
                    <ul className="space-y-2 text-foreground/80">
                      <li>{t('product.details.handmade')}</li>
                      <li>{t('product.details.style')}</li>
                      <li>{t('product.details.made_by')}</li>
                      <li>{t('product.details.quality')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[2.3em] font-bold">{`${product.price} ₾`}</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium ${remainingStock > 2 ? 'bg-[#8B0000]/80 text-white' : 'bg-[#8B0000]/80 text-white'}`}
                  >
                    {remainingStock > 0
                      ? t('product.in_stock')
                      : t('product.out_of_stock')}
                  </div>
                  {remainingStock > 0 && (
                    <div className="text-sm font-medium text-foreground/80 px-1">
                      {t('product.remaining_stock', { count: remainingStock })}
                    </div>
                  )}
                </div>
              </div>

              {remainingStock > 0 ? (
                <>
                  <Button
                    className="w-full bg-crimson hover:bg-crimson/90 text-black font-medium py-6 text-lg relative"
                    onClick={handleAddToCart}
                    disabled={remainingStock <= 0}
                  >
                    {/* Background cart icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <span className="relative z-10 flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />{' '}
                      {t('product.add_to_cart')}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full bg-muted text-muted-foreground font-medium py-6 text-lg"
                  disabled
                >
                  {t('product.out_of_stock')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {product && (
          <div className="mt-16">
            <SimilarProducts 
              currentProductId={product.id}
              category={typeof product.category === 'string' ? product.category : ''}
            />
          </div>
        )}

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="border-t border-border pt-8 pb-4">
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-crimson">{t('reviews.title_part1')}</span>{' '}
              <span className="text-white">{t('reviews.title_part2')}</span>
            </h2>

            {/* Review Form */}
            <ReviewForm
              productId={productId}
              onReviewAdded={handleReviewAdded}
            />

            {/* Reviews List */}
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>

      <Footer />
      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <ProductImageGallery
          images={product.images}
          currentIndex={selectedImageIndex}
          onClose={() => setIsGalleryOpen(false)}
          onIndexChange={setSelectedImageIndex}
        />
      )}
    </div>
  );
};

export default ProductDetail;
