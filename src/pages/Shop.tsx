import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { FilterValues } from '@/components/ProductFilters.utils';
import { getProducts, getProductsByCategory } from '@/services/productService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomOrderModal from '@/components/CustomOrderModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { applyFilters } from '@/services/reviewService';
import { Search, Filter } from 'lucide-react';

const Shop = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const { addToCart } = useCartContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    urlCategory,
  );
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 1000],
    categories: urlCategory ? [urlCategory] : [],
    inStock: false,
    outOfStock: false,
    onSale: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);

  const allProducts = getProducts();

  // Define all available categories including those that might not have products yet
  const allCategories = [
    'chokers',
    'earrings',
    'bracelets',
    'rings',
    'hairpins',
    'candles',
    'necklaces',
    'accessories',
  ];

  // Get unique categories from products and combine with all categories
  const productCategories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const categories = [...new Set([...allCategories, ...productCategories])];

  // Filter products based on filters
  let products = applyFilters(allProducts, {
    priceRange: filters.priceRange,
    categories: filters.categories.length > 0 ? filters.categories : undefined,
    inStock: filters.inStock,
    outOfStock: filters.outOfStock,
    onSale: filters.onSale,
  });

  // Sort products to show out of stock items at the bottom
  products = [...products].sort((a, b) => {
    if (a.stock <= 0 && b.stock > 0) return 1;
    if (a.stock > 0 && b.stock <= 0) return -1;
    return 0;
  });

  // Применяем поиск по названию и описанию
  if (searchQuery.trim()) {
    products = products.filter((product) => {
      const lang = t('language');
      return (
        product.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description[lang]
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
  }

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);

    // If category is selected in filters, update the active category
    if (newFilters.categories.length === 1) {
      setActiveCategory(newFilters.categories[0]);
    } else if (newFilters.categories.length === 0 && activeCategory) {
      setActiveCategory(null);
    }
  };

  // Effect to handle URL category changes
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
      setFilters((prev) => ({
        priceRange: prev?.priceRange || [0, 1000],
        categories: [urlCategory],
        inStock: prev?.inStock || false,
        outOfStock: prev?.outOfStock || false,
        onSale: prev?.onSale || false,
      }));
    }
  }, [urlCategory]);

  // Function to get localized category name
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    setFilters((prev) => ({
      ...prev,
      categories: categoryId === activeCategory ? [] : [categoryId],
    }));
  };

  const getCategoryName = (category: string) => {
    const translation = t(`category.${category}`);
    return translation === `category.${category}`
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : translation;
  };

  // Get translated categories
  const translatedCategories = categories.map((category) => ({
    id: category,
    name: getCategoryName(category),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">


          <CustomOrderModal
            isOpen={isCustomOrderModalOpen}
            onClose={() => setIsCustomOrderModalOpen(false)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Product Filters - Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search Section */}
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Search className="mr-2 h-5 w-5" /> {t('shop.search_title')}
                </h3>
                <Input
                  type="search"
                  placeholder={t('home.search_placeholder')}
                  className="w-full bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Custom Order Section */}
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-crimson">{t('shop.custom_design_title')}</span>
                </h3>
                <Button
                  variant="default"
                  className="bg-red-900/80 hover:bg-red-900/70 w-full text-sm py-1.5 font-bold text-white transition-colors"
                  onClick={() => setIsCustomOrderModalOpen(true)}
                >
                  {t('shop.custom_design_button')}
                </Button>
              </div>

              {/* Product Filters */}
              <ProductFilters
                onFilterChange={handleFilterChange}
                categories={translatedCategories}
                initialFilters={{
                  priceRange: [0, 1000],
                  categories: [],
                  inStock: false,
                  outOfStock: false,
                  onSale: false,
                }}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-foreground/80 text-xl font-semibold">
                    {t('product.no_products_found') ||
                      'Нет товаров, соответствующих фильтрам.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => {
                    // Ensure we're passing the correct props to ProductCard
                    const {
                      id,
                      name,
                      description,
                      price,
                      currency,
                      images,
                      stock,
                    } = product;
                    return (
                      <ProductCard
                        key={id}
                        id={id}
                        category={activeCategory || ''}
                        name={name}
                        description={description}
                        price={price}
                        currency={currency}
                        images={images}
                        stock={stock}
                        onAddToCart={(product) => addToCart(product)}
                        materials={[]}
                        colors={[]}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
