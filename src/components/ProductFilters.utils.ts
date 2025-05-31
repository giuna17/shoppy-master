export interface FilterValues {
  priceRange: [number, number];
  categories: string[];
  inStock: boolean;
  outOfStock: boolean;
  onSale: boolean;
}

export const materialOptions = [
  'Металл',
  'Ткань',
  'Стекло',
  'Дерево',
  'Кожа',
  'Воск',
];
export const colorOptions = [
  'Silver',
  'Gold',
  'Black',
  'White',
  'Red',
  'Green',
  'Blue',
  'Purple',
  'Pink',
];
