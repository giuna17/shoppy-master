import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';

interface ProductDetailProps {
  product: {
    id: number;
    name: { [key: string]: string };
    description: { [key: string]: string };
    price: number;
    originalPrice?: number;
    images: string[];
    stock: number;
    onSale?: boolean;
  };
  onClose: () => void;
  onAddToCart: (id: number) => void;
}

const ProductDetail = ({
  product,
  onClose,
  onAddToCart,
}: ProductDetailProps) => {
  const { language, t } = useLanguage();
  const { cart } = useCartContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Скроллим вверх при открытии карточки
  useEffect(() => {
    window.scrollTo(0, 0);

    // Логируем информацию о путях к изображениям при монтировании
    console.log('=== PRODUCT DETAIL MOUNTED ===');
    console.log('Product ID:', product.id);
    console.log('Product name:', product.name[language]);
    console.log('All images:', product.images);
    console.log('Current image index:', currentImageIndex);
    console.log('Current image path:', product.images[currentImageIndex]);
    console.log(
      'Image element:',
      document.querySelector('.product-main-image'),
    );

    // Проверяем доступность изображений
    if (product.images && product.images.length > 0) {
      product.images.forEach((img, idx) => {
        const imgObj = new Image();
        imgObj.onload = () =>
          console.log(`✅ Image ${idx} (${img}) loaded successfully`);
        imgObj.onerror = () =>
          console.error(`❌ Failed to load image ${idx}:`, img);
        imgObj.src = img;
      });
    }
  }, [product.id]);

  // Сбрасываем ошибку при смене изображения
  useEffect(() => {
    setImageError(false);
  }, [currentImageIndex]);

  const itemInCart = cart.find((item) => item.product.id === product.id);
  const currentQuantity = itemInCart?.quantity || 0;
  const remainingStock = product.stock - currentQuantity;
  const isOutOfStock = remainingStock <= 0;

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container max-w-4xl mx-auto my-8 bg-transparent rounded-xl overflow-hidden">
        {/* Заголовок */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {product.name[language]}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6 bg-transparent">
          {/* Галерея изображений */}
          <div className="relative">
            <div className="relative aspect-square">
              <div className="relative w-full h-full border-4 border-red-500 p-2">
                <div className="relative w-full h-full">
                  {!imageError ? (
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name[language]}
                      className="w-[130%] h-[130%] object-contain"
                      style={{ transform: 'translate(-15%, -15%)' }}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">
                        {t('product.image_not_available')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Информация о продукте */}
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.name[language]}
                </h1>
                <div className="flex flex-col gap-1">
                  {product.originalPrice && product.originalPrice > product.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-crimson">
                        {product.price} ₾
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {product.originalPrice} ₾
                      </span>
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-crimson">
                      {product.price} ₾
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-foreground/90">
                    {product.description[language]}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <span>{t('product.in_stock')}:</span>
                    <span
                      className={`font-medium ${isOutOfStock ? 'text-destructive' : 'text-green-600'}`}
                    >
                      {isOutOfStock
                        ? t('product.out_of_stock')
                        : `${remainingStock} ${t('product.items')}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 mt-6">
                  <Button
                    onClick={handleAddToCartClick}
                    disabled={isOutOfStock}
                    className={`flex-1 py-6 text-lg font-medium ${
                      isOutOfStock
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-crimson hover:bg-crimson/90 text-white'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isOutOfStock
                      ? t('product.out_of_stock')
                      : t('product.add_to_cart')}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 py-6 text-lg font-medium border-crimson text-crimson hover:bg-crimson/10"
                  >
                    {t('product.our_story')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="p-6 border-t">
          <h3 className="text-xl font-bold mb-4">
            <span className="text-crimson">{t('reviews.title_part1')}</span>{' '}
            <span className="text-white">{t('reviews.title_part2')}</span>
          </h3>
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('product.no_reviews')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
