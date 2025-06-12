import React, { useState, useEffect, useCallback } from 'react';
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

// Helper function to normalize strings for comparison
const normalize = (str: string) => {
  if (str === undefined || str === null) return '';
  return str.toString()
    .toLowerCase()
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width spaces and other invisible characters
};

const Shop = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlType = searchParams.get('type') as 'handmade' | 'other' | null;
  const { addToCart } = useCartContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(urlCategory);
  const [activeCategoryType, setActiveCategoryType] = useState<'handmade' | 'other'>(urlType || 'handmade');
  
  // Calculate default price range
  const defaultPriceRange: [number, number] = [0, 1000];
  
  // Keep filters in sync with URL
  const updateFilters = useCallback((newFilters: Partial<FilterValues> | ((prev: FilterValues) => FilterValues)) => {
    setFilters(prev => {
      const updated = typeof newFilters === 'function' 
        ? newFilters(prev) 
        : { ...prev, ...newFilters };
      console.log('Updating filters:', { prev, newFilters, updated });
      return updated;
    });
  }, []);
  
  const [filters, setFilters] = useState<FilterValues>(() => ({
    priceRange: defaultPriceRange,
    categories: urlCategory ? [urlCategory] : [],
    inStock: false,
    outOfStock: false,
    onSale: false,
    type: urlType || 'handmade'
  }));
  
  // Update URL and active category type when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Update URL parameters based on filters
    if (filters.categories?.length) {
      params.set('category', filters.categories[0]);
    } else if (searchParams.has('category')) {
      // Clear category from URL if no category is selected
      searchParams.delete('category');
    }
    
    // Only include type in URL if it's not the default 'handmade' value
    if (filters.type && filters.type !== 'handmade') {
      params.set('type', filters.type);
    } else if (searchParams.has('type')) {
      // Clear type from URL if it's the default 'handmade' value
      searchParams.delete('type');
    }
    
    // Update the URL without causing a page reload
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
    
    // Update active category type state when filters.type changes
    if (filters.type && filters.type !== activeCategoryType) {
      setActiveCategoryType(filters.type);
    }
  }, [filters, activeCategoryType, searchParams]);
  
  // Initialize filters from URL on component mount or when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlType = params.get('type') as 'handmade' | 'other' | null;
    const urlCategory = params.get('category');
    let shouldUpdateFilters = false;
    const updates: Partial<FilterValues> = {};
    
    // Check if we need to update the active category type
    if (urlType && urlType !== activeCategoryType) {
      setActiveCategoryType(urlType);
      updates.type = urlType;
      shouldUpdateFilters = true;
    }
    
    // Check if we need to update the active category
    if (urlCategory && urlCategory !== activeCategory) {
      setActiveCategory(urlCategory);
      updates.categories = [urlCategory];
      shouldUpdateFilters = true;
    }
    
    // Only update filters if we have changes
    if (shouldUpdateFilters) {
      updateFilters(prev => ({
        ...prev,
        ...updates
      }));
    }
  }, [searchParams, activeCategory, activeCategoryType, updateFilters]);
  
  // Reset filter state when activeCategory changes
  const handleCategorySelect = useCallback((categoryId: string | null) => {
    console.log('Category selected:', categoryId);
    setActiveCategory(categoryId);
    updateFilters({
      categories: categoryId ? [categoryId] : [],
      inStock: false,
      outOfStock: false,
      onSale: false
    });
  }, [updateFilters]);
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
  
  // Enhanced category preparation with strict normalization
  const prepareCategories = (cats: (string | undefined)[] | undefined) => {
    if (!cats || !cats.length) return [];
    
    const normalized = cats
      .filter((cat): cat is string => Boolean(cat))
      .map(cat => {
        const trimmed = cat.trim();
        return {
          original: trimmed,
          normalized: normalize(trimmed)
        };
      })
      .filter(cat => cat.normalized);
    
    console.log('Prepared categories:', JSON.stringify(normalized, null, 2));
    return normalized.map(cat => cat.original);
  };

  // Prepare categories for filtering
  let categoriesToFilter: string[] = [];
  if (activeCategory) {
    console.log('Using active category:', activeCategory);
    categoriesToFilter = [activeCategory];
  } else if (filters.categories?.length) {
    console.log('Using filter categories:', filters.categories);
    categoriesToFilter = prepareCategories(filters.categories) || [];
  } else {
    console.log('No category filters applied');
  }

  // Debug log before filtering
  console.log('=== FILTERING DEBUG ===');
  console.log('Active category:', activeCategory);
  console.log('Filter categories:', filters.categories);
  console.log('Categories being used for filtering:', categoriesToFilter);
  console.log('All unique categories in products:', [
    ...new Set(allProducts.map(p => p.category).filter(Boolean))
  ]);

  // Log exact values being passed to applyFilters
  console.log('=== APPLYING FILTERS ===');
  console.log('Categories being filtered:', JSON.stringify(categoriesToFilter));
  console.log('All filter values:', {
    priceRange: filters.priceRange,
    categories: categoriesToFilter,
    inStock: filters.inStock,
    outOfStock: filters.outOfStock,
    onSale: filters.onSale,
  });

  // Apply all filters
  const filteredProducts = applyFilters(allProducts, {
    priceRange: filters.priceRange,
    categories: categoriesToFilter,
    inStock: filters.inStock,
    outOfStock: filters.outOfStock,
    onSale: filters.onSale,
    type: activeCategoryType,
  });
  
  // Log the Espresso Rhythm bracelet specifically
  const espressoBracelet = allProducts.find(p => 
    p.id === 31 || p.name.en.toLowerCase().includes('espresso rhythm')
  );
  
  if (espressoBracelet) {
    console.log('=== ESPRESSO RHYTHM BRACELET DEBUG ===');
    console.log('Product data:', {
      id: espressoBracelet.id,
      name: espressoBracelet.name.en,
      category: espressoBracelet.category,
      normalizedCategory: normalize(espressoBracelet.category || '')
    });
    console.log('Is in filtered results:', filteredProducts.some(p => p.id === espressoBracelet.id));
  }

  // Debug log after filtering
  console.log('Filtered products count:', filteredProducts.length);
  console.log('Filtered product categories:', [
    ...new Set(filteredProducts.map(p => p.category).filter(Boolean))
  ]);
  console.log('=== END FILTERING DEBUG ===');
  
  // Enhanced debug logs for category filtering
  console.group('=== CATEGORY FILTERING DEBUG ===');
  
  // Log all products with their categories
  console.log('All products with categories:');
  allProducts.forEach(p => {
    console.log(`- ID: ${p.id}, Name: ${p.name.en}, Category: '${p.category}'`);
  });
  
  // Log active filtering state
  console.log('\nActive filtering state:');
  console.log('- Active category:', activeCategory);
  console.log('- Filter categories:', filters.categories);
  
  // Log which categories are being used for filtering
  const activeCategories = activeCategory ? [activeCategory] : (filters.categories || []);
  console.log('\nCategories being used for filtering:', activeCategories);
  
  // Log filtered products with details
  console.log('\nFiltered products:', filteredProducts.length);
  filteredProducts.forEach(p => {
    console.log(`- ID: ${p.id}, Name: ${p.name.en}, Category: '${p.category}'`);
  });
  
  // Check for products that might be in wrong categories
  const problematicProducts = allProducts.filter(p => 
    p.name.en.toLowerCase().includes('bracelet') && 
    ['necklaces', 'keychains'].includes(p.category.toLowerCase())
  );
  
  if (problematicProducts.length > 0) {
    console.warn('\nWARNING: Found potentially mis-categorized products:');
    problematicProducts.forEach(p => {
      console.warn(`- ID: ${p.id}, Name: ${p.name.en}, Category: '${p.category}'`);
    });
  }
  
  console.groupEnd();

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
    console.log('URL category changed:', urlCategory);
    if (urlCategory) {
      setActiveCategory(urlCategory);
      updateFilters({
        categories: [urlCategory],
        inStock: false,
        outOfStock: false,
        onSale: false
      });
    } else {
      setActiveCategory(null);
      updateFilters({
        categories: [],
        inStock: false,
        outOfStock: false,
        onSale: false
      });
    }
  }, [urlCategory, updateFilters]);

  // Function to handle category click
  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    const newActiveCategory = categoryId === activeCategory ? null : categoryId;
    
    // Update the active category and reset other filters
    updateFilters(prev => ({
      ...prev,
      categories: newActiveCategory ? [newActiveCategory] : [],
      inStock: false,
      outOfStock: false,
      onSale: false,
      type: activeCategoryType
    }));
    
    setActiveCategory(newActiveCategory);
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
                onFilterChange={updateFilters}
                categories={categories.map(category => ({
                  id: category,
                  name: t(`categories.${category}`) || category
                }))}
                initialFilters={filters}
                activeCategory={activeCategory || undefined}
                activeCategoryType={activeCategoryType}
                onCategoryTypeChange={(type) => {
                  setActiveCategoryType(type);
                  updateFilters({
                    ...filters,
                    type,
                    categories: []
                  });
                }}
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
