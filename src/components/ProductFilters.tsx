import React, { useState, useEffect } from 'react';
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
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  categories,
  initialFilters,
  activeCategory,
}) => {
  const { t } = useLanguage();
  const products = getProducts();

  // Calculate min and max price from products
  const prices = products.map((product) => product.price);
  const minProductPrice = Math.min(...prices);
  const maxProductPrice = Math.max(...prices);

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

  const handlePriceChange = (value: number[]) => {
    // Ensure we have exactly two values for the price range
    if (value.length >= 2) {
      setFilters((prev) => {
        const updated = {
          ...prev,
          priceRange: [value[0], value[1]] as [number, number],
        };
        onFilterChange(updated);
        return updated;
      });
    }
  };

  // Normalize category name for comparison
  const normalize = (str: string) => str.toLowerCase().trim();

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => {
      // If clicking the active category, clear the filter
      if (prev.categories.includes(categoryId)) {
        const updated = {
          ...prev,
          categories: [],
        };
        onFilterChange(updated);
        return updated;
      }
      
      // Otherwise, set the selected category
      const updated = {
        ...prev,
        categories: [categoryId], // Only allow one category at a time
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const handleStockToggle = () => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        inStock: !prev.inStock,
        // If enabling inStock, make sure outOfStock is disabled
        ...(prev.outOfStock && { outOfStock: false }),
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const handleOutOfStockToggle = () => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        outOfStock: !prev.outOfStock,
        // If enabling outOfStock, make sure inStock is disabled
        ...(prev.inStock && { inStock: false }),
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const handleOnSaleToggle = () => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        onSale: !prev.onSale,
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: [0, 1000] as [number, number], // Always reset to default range
      categories: [],
      inStock: false,
      outOfStock: false,
      onSale: false,
    };

    // Reset active category in parent component
    onFilterChange({
      ...resetFilters,
      // Force categories to be an empty array to trigger the reset
      categories: []
    });

    // Also update local state
    setFilters(resetFilters);
  };

  // Function to get localized category name
  const getCategoryName = (category: string) => {
    // Try to get the translation for the category
    const translation = t(`category.${category.toLowerCase()}`);
    // If no translation found, return the category with first letter capitalized
    return translation === `category.${category.toLowerCase()}`
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : translation;
  };

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

          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-3">
              {t('filters.categories')}
            </h4>
            <div className="space-y-2">
              {categories.map((category) => {
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
              })}
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
