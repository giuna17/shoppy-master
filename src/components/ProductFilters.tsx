import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProducts } from '@/services/productService';
import {
  FilterValues,
  materialOptions,
  colorOptions,
} from './ProductFilters.utils';

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  categories: Category[];
  initialFilters?: FilterValues;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  categories,
  initialFilters,
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
      materials: [],
      colors: [],
      inStock: false,
    },
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    // Ensure we have exactly two values for the price range
    if (value.length >= 2) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [value[0], value[1]] as [number, number],
      }));
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];

      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handleMaterialToggle = (material: string) => {
    setFilters((prev) => {
      const newMaterials = prev.materials.includes(material)
        ? prev.materials.filter((m) => m !== material)
        : [...prev.materials, material];

      return {
        ...prev,
        materials: newMaterials,
      };
    });
  };

  const handleColorToggle = (color: string) => {
    setFilters((prev) => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];

      return {
        ...prev,
        colors: newColors,
      };
    });
  };

  const handleStockToggle = () => {
    setFilters((prev) => ({
      ...prev,
      inStock: !prev.inStock,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: [minProductPrice, maxProductPrice] as [number, number],
      categories: [],
      materials: [],
      colors: [],
      inStock: false,
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
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
        <div className="flex justify-between items-center mb-4">
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
              <div className="flex justify-between text-sm text-foreground/80">
                <span>{filters.priceRange[0]} ₾</span>
                <span>{filters.priceRange[1]} ₾</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-3">
              {t('filters.categories')}
            </h4>
            <div className="space-y-2">
              {categories.map((category) => {
                // Use the translation for the category name if available, otherwise fallback to the name from the category object
                const categoryName = t(
                  `category.${category.id.toLowerCase()}`,
                ).startsWith('category.')
                  ? category.name
                  : t(`category.${category.id.toLowerCase()}`);

                return (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                      className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-normal cursor-pointer"
                    >
                      {categoryName}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-sm font-medium mb-3">
              {t('filters.materials')}
            </h4>
            <div className="space-y-2">
              {['metal', 'fabric', 'glass', 'wood', 'leather', 'wax'].map(
                (material) => (
                  <div key={material} className="flex items-center">
                    <Checkbox
                      id={`material-${material}`}
                      checked={filters.materials.includes(material)}
                      onCheckedChange={() => handleMaterialToggle(material)}
                    />
                    <label
                      htmlFor={`material-${material}`}
                      className="text-sm ml-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {t(`material.${material}`)}
                    </label>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* In Stock */}
          <div>
            <div className="flex items-center">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={handleStockToggle}
                className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
              />
              <Label
                htmlFor="in-stock"
                className="ml-2 text-sm font-normal cursor-pointer"
              >
                {t('filters.in_stock')}
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleApplyFilters}
              className="bg-crimson hover:bg-crimson/90 text-black font-medium"
            >
              {t('filters.apply')}
            </Button>
            <Button variant="outline" onClick={handleResetFilters}>
              {t('filters.reset')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
