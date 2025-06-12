import React, { useState, useEffect, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProducts } from '@/services/productService';
import { FilterValues } from './ProductFilters.utils';

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  categories: Category[];
  initialFilters?: FilterValues;
  activeCategory?: string;
  activeCategoryType?: 'handmade' | 'other';
  onCategoryTypeChange?: (type: 'handmade' | 'other') => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  categories,
  initialFilters,
  activeCategory,
  activeCategoryType: propActiveCategoryType = 'handmade',
  onCategoryTypeChange,
}) => {
  const { t } = useLanguage();
  const products = getProducts();

  // Calculate min and max price from products
  const prices = products.map((product) => product.price);
  const minProductPrice = Math.min(...prices);
  const maxProductPrice = Math.max(...prices);

  const [activeCategoryType, setActiveCategoryType] = useState<'handmade' | 'other'>(propActiveCategoryType);
  
  // Update local state when prop changes
  useEffect(() => {
    setActiveCategoryType(propActiveCategoryType);
  }, [propActiveCategoryType]);
  
  // Handle category type change
  const handleCategoryTypeChange = (type: 'handmade' | 'other') => {
    setActiveCategoryType(type);
    
    // Update the filters with the new type and clear categories
    const updatedFilters = {
      ...filters,
      type,
      categories: []
    };
    
    // Update local filters
    setFilters(updatedFilters);
    
    // Notify parent component
    onFilterChange(updatedFilters);
    
    // Call the onCategoryTypeChange callback if provided
    if (onCategoryTypeChange) {
      onCategoryTypeChange(type);
    }
  };

  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || {
      priceRange: [minProductPrice, maxProductPrice],
      categories: [],
      inStock: false,
      outOfStock: false,
      onSale: false,
    },
  );

  // Update filters when activeCategory changes
  useEffect(() => {
    if (activeCategory) {
      setFilters(prev => ({
        ...prev,
        categories: [activeCategory],
      }));
      // Don't call onFilterChange here to prevent infinite loop
    } else if (filters.categories.length > 0) {
      // Only clear categories if they were set by activeCategory
      setFilters(prev => ({
        ...prev,
        categories: [],
      }));
    }
  }, [activeCategory]); // Only depend on activeCategory

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isBraceletsCategory = filters.categories.includes('bracelets') || activeCategory === 'bracelets';
  console.log('Active category:', activeCategory); // Debugging line

  // Centralized filter update handler
  const handleFilterChange = (updates: Partial<FilterValues>) => {
    setFilters(prev => {
      const updated = {
        ...prev,
        ...updates,
        type: activeCategoryType // Always include the active category type
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const handlePriceChange = (value: number[]) => {
    // Ensure we have exactly two values for the price range
    if (value.length >= 2) {
      handleFilterChange({
        priceRange: [value[0], value[1]] as [number, number]
      });
    }
  };

  // Normalize category name for comparison
  const normalize = (str: string) => str.toLowerCase().trim();

  const handleCategoryToggle = (categoryId: string) => {
    // If clicking the active category, clear the filter
    if (filters.categories.includes(categoryId)) {
      handleFilterChange({
        categories: []
      });
    } else {
      // Otherwise, set the selected category
      handleFilterChange({
        categories: [categoryId] // Only allow one category at a time
      });
    }
  };

  const handleStockToggle = () => {
    handleFilterChange({
      inStock: !filters.inStock,
      // If enabling inStock, make sure outOfStock is disabled
      ...(filters.outOfStock && { outOfStock: false })
    });
  };

  const handleOutOfStockToggle = () => {
    handleFilterChange({
      outOfStock: !filters.outOfStock,
      // If enabling outOfStock, make sure inStock is disabled
      ...(filters.inStock && { inStock: false })
    });
  };

  const handleOnSaleToggle = () => {
    handleFilterChange({
      onSale: !filters.onSale
    });
  };

  const handleResetFilters = () => {
    handleFilterChange({
      priceRange: [minProductPrice, maxProductPrice] as [number, number],
      categories: [],
      inStock: false,
      outOfStock: false,
      onSale: false
    });
  };

  const handleClearFilters = handleResetFilters; // Alias for backward compatibility

  // Function to get localized category name
  const getCategoryName = (category: string) => {
    // Try to get the translation for the category
    const translation = t(`category.${category.toLowerCase()}`);
    // If no translation found, return the category with first letter capitalized
    return translation === `category.${category.toLowerCase()}`
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : translation;
  };

  // Filter categories based on active category type
  const filteredCategories = useMemo(() => {
    if (activeCategoryType === 'handmade') {
      return categories.filter(category => 
        !['candles', 'keychains'].includes(category.id.toLowerCase())
      );
    } else {
      return categories.filter(category => 
        ['candles', 'keychains'].includes(category.id.toLowerCase())
      );
    }
  }, [categories, activeCategoryType]);

  // Update active category type when filters.type changes
  useEffect(() => {
    if (filters.type && filters.type !== activeCategoryType) {
      setActiveCategoryType(filters.type);
    }
  }, [filters.type, activeCategoryType]);

  // Add default categories if they don't exist
  const allCategories = [
    { id: 'chokers', name: 'Чокеры' },
    { id: 'earrings', name: 'Серьги' },
    { id: 'bracelets', name: 'Браслеты' },
    { id: 'rings', name: 'Кольца' },
    { id: 'hairpins', name: 'Заколки' },
    { id: 'necklaces', name: 'Ожерелья' },
    { id: 'keychains', name: 'Брелки' },
    { id: 'candles', name: 'Свечи' }
  ];
  
  // Merge with existing categories, avoiding duplicates
  const mergedCategories = [
    ...allCategories.filter(cat => !categories.some(c => c.id === cat.id)),
    ...categories
  ].filter(category => {
    if (activeCategoryType === 'handmade') {
      // In handmade section, exclude 'other' categories
      return !['candles', 'keychains'].includes(category.id.toLowerCase());
    } else {
      // In 'other' section, show all categories
      return true;
    }
  });

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <Filter className="mr-2 h-5 w-5" /> {t('filters.title')}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden"
            >
              {isFilterOpen ? t('filters.hide') : t('filters.show')}
            </Button>
          </div>
        </div>

        <div
          className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden md:block'}`}
        >
          {/* Price Range */}
          <div>
            <h4 className="text-sm font-medium mb-3">{t('filters.price')}</h4>
            <div className="px-2">
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                min={minProductPrice}
                max={maxProductPrice}
                step={5}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-foreground/80 mb-3">
                <span>{filters.priceRange[0]} ₾</span>
                <span>{filters.priceRange[1]} ₾</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[1.1em] text-crimson hover:text-crimson/80 font-medium transition-colors 
                         flex items-center justify-center w-full py-2 px-3 rounded-md 
                         border border-crimson/30 hover:border-crimson/50 hover:bg-crimson/5"
              >
                {t('filters.reset')}
              </button>
            </div>
          </div>

          {/* Category Type Toggle */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-lg border border-crimson/50 bg-card overflow-hidden">
              <button
                onClick={() => handleCategoryTypeChange('handmade')}
                className={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeCategoryType === 'handmade'
                    ? 'bg-crimson/80 text-white'
                    : 'text-foreground hover:bg-crimson/30 hover:text-white'
                }`}
              >
                {t('filters.handmade')}
              </button>
              <button
                onClick={() => handleCategoryTypeChange('other')}
                className={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeCategoryType === 'other'
                    ? 'bg-crimson/80 text-white'
                    : 'text-foreground/70 hover:bg-foreground/5'
                }`}
              >
                {t('filters.other')}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-3">
              {t('filters.categories')}
            </h4>
            <div className="space-y-2">
              {mergedCategories.length > 0 ? (
                mergedCategories.map((category) => {
                  const isActive = activeCategory ? 
                    normalize(category.id) === normalize(activeCategory) :
                    filters.categories.some(cat => normalize(cat) === normalize(category.id));
                  
                  // Get the display name, using translation if available
                  const displayName = t(`category.${category.id.toLowerCase()}`).startsWith('category.') 
                    ? category.name 
                    : t(`category.${category.id.toLowerCase()}`);

                  return (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={isActive}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                        className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className={`ml-2 text-sm font-normal cursor-pointer ${
                          isActive ? 'text-crimson font-medium' : ''
                        }`}
                      >
                        {displayName}
                      </Label>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">
                  {activeCategoryType === 'handmade' 
                    ? 'Нет доступных категорий для ручной работы' 
                    : 'Нет доступных категорий'}
                </p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('filters.availability')}</h4>
            <div className="space-y-2 pl-2">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={handleStockToggle}
                    className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                  />
                  <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                    {t('filters.in_stock')}
                  </Label>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="out-of-stock"
                    checked={filters.outOfStock}
                    onCheckedChange={handleOutOfStockToggle}
                    className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                  />
                  <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                    {t('filters.out_of_stock')}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* On Sale Section */}
          <div className="space-y-2 pt-4 mt-4 border-t border-border">
            <h4 className="text-sm font-medium">{t('filters.special_offers')}</h4>
            <div className="space-y-2 pl-2">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={filters.onSale}
                    onCheckedChange={handleOnSaleToggle}
                    className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                  />
                  <Label
                    htmlFor="on-sale"
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {t('filters.on_sale')}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
