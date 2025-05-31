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
  // Calculate default price range
  const defaultPriceRange: [number, number] = [0, 1000];
  
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: defaultPriceRange,
    categories: urlCategory ? [urlCategory] : [],
    inStock: false,
    outOfStock: false,
    onSale: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPriceDesc, setSortByPriceDesc] = useState(false);

  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);

  const allProducts = getProducts();

  // Функция нормализации — всё в нижний регистр и без пробелов
  const normalize = (str: string) => (str || '').toLowerCase().trim();

  // Получаем все уникальные категории из продуктов
  const allCategories = Array.from(
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
  );

  // Создаем маппинг нормализованных имен категорий к их оригинальным значениям
  const categoryMap = allCategories.reduce<Record<string, string>>((acc, category) => {
    const norm = normalize(category);
    if (!acc[norm]) {
      acc[norm] = category;
    }
    return acc;
  }, {});

  // Используем оригинальные категории из маппинга
  const categories = Object.values(categoryMap);

  // Debug: Log categories and filters
  console.log('All categories:', categories);
  console.log('Active filters:', filters);
  console.log('Active category:', activeCategory);
  
  // Debug: Log current state
  console.log('Current filters:', filters);
  console.log('Active category:', activeCategory);
  
  // Apply all filters
  const filteredProducts = applyFilters(allProducts, {
    priceRange: filters.priceRange,
    categories: activeCategory ? [activeCategory] : (filters.categories?.length ? filters.categories : undefined),
    inStock: filters.inStock,
    outOfStock: filters.outOfStock,
    onSale: filters.onSale,
  });
  
  console.log('Filtered products count:', filteredProducts.length);
  console.log('All products categories:', [...new Set(allProducts.map(p => p.category))]);
  
  // Debug: Log filtered products
  console.log('Filtered products count:', filteredProducts.length);
  if (filters.categories.length > 0) {
    console.log('Products in selected categories:', filteredProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price
    })));
  }

  // Apply search filter if there's a search query
  const searchedProducts = searchQuery.trim()
    ? filteredProducts.filter((product) => {
        const lang = t('language');
        return (
          product.name[lang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description[lang]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : filteredProducts;

  // Sort products to show out of stock items at the bottom
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (a.stock <= 0 && b.stock > 0) return 1;
    if (a.stock > 0 && b.stock <= 0) return -1;
    return 0;
  });

  // Apply price sorting if enabled
  const productsToRender = sortByPriceDesc 
    ? [...sortedProducts].sort((a, b) => b.price - a.price)
    : sortedProducts;

  const handleAddToCart = (productId: number) => {
    const product = productsToRender.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    // If categories array is empty, clear the active category
    if (newFilters.categories && newFilters.categories.length === 0) {
      setActiveCategory(null);
    } else if (newFilters.categories && newFilters.categories.length > 0) {
      // If a category is selected, update the active category
      setActiveCategory(newFilters.categories[0]);
    }

    // Ensure price range stays within default bounds
    const updatedFilters = {
      ...newFilters,
      priceRange: [
        Math.max(0, newFilters.priceRange[0]),
        Math.min(1000, newFilters.priceRange[1])
      ] as [number, number]
    };
    setFilters(updatedFilters);
  };

  // Effect to handle URL category changes
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
      // Update filters to match URL category
      setFilters(prev => ({
        ...prev,
        categories: [urlCategory],
        // Reset other filters when URL changes
        inStock: false,
        outOfStock: false,
        onSale: false
      }));
    } else {
      setActiveCategory(null);
      // Clear categories when no URL category
      setFilters(prev => ({
        ...prev,
        categories: []
      }));
    }
  }, [urlCategory]);

  // Function to handle category click
  const handleCategoryClick = (categoryId: string) => {
    const newActiveCategory = categoryId === activeCategory ? null : categoryId;
    setActiveCategory(newActiveCategory);
    
    // Update filters to match the active category
    const newFilters = {
      ...filters,
      categories: newActiveCategory ? [newActiveCategory] : [],
      // Reset other filters when changing categories
      inStock: false,
      outOfStock: false,
      onSale: false
    };
    
    setFilters(newFilters);
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
                initialFilters={filters}
                activeCategory={activeCategory}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {/* Sort Button */}
              <div className="mb-6 flex justify-end">
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 ${sortByPriceDesc ? 'bg-accent' : 'bg-card'} hover:bg-accent transition-colors border border-gray-300 dark:border-gray-600`}
                  onClick={() => setSortByPriceDesc(!sortByPriceDesc)}
                  aria-label={sortByPriceDesc ? t('sort.by_price_low_high') : t('sort.by_price_high_low')}
                >
                  <span className="text-sm font-medium text-foreground">
                    {sortByPriceDesc 
                      ? t('sort.by_price_low_high')
                      : t('sort.by_price_high_low')}
                  </span>
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
                    className={`transition-transform duration-200 ${sortByPriceDesc ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </Button>
              </div>

              {productsToRender.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-foreground/80 text-xl font-semibold">
                    {t('product.no_products_found') ||
                      'Нет товаров, соответствующих фильтрам.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsToRender.map((product) => {
                    // Ensure we're passing the correct props to ProductCard
                    const {
                      id,
                      name,
                      description,
                      price,
                      originalPrice,
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
                        originalPrice={originalPrice}
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
