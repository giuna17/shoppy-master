export interface Product {
  id: number;
  name: {
    ru: string;
    en: string;
    ge: string;
  };
  description: {
    ru: string;
    en: string;
    ge: string;
  };
  price: number;
  currency: string;
  images: string[];
  category: string;
  featured?: boolean;
  stock: number;
  materials: string[];
  colors: string[];
  onSale?: boolean;
}

const products: Product[] = [
  {
    id: 11,
    name: {
      ru: "Чокер 'Звезда Давида' из стали",
      en: "Steel 'Star of David' Choker",
      ge: "ფოლადის 'დავითის ვარსკვლავი' ჩოკერი",
    },
    description: {
      ru: 'Элегантный стальной чокер с подвеской в виде Звезды Давида. Символ иудаизма и еврейской идентичности. Идеально подходит для повседневного ношения и особых случаев. Выполнен из высококачественной хирургической стали, не вызывает аллергии и не темнеет со временем.',
      en: 'Elegant steel choker featuring a Star of David pendant. A symbol of Judaism and Jewish identity. Perfect for both everyday wear and special occasions. Made from high-quality surgical steel, hypoallergenic and tarnish-resistant.',
      ge: 'ელეგანტური ფოლადის ჩოკერი დავითის ვარსკვლავის ქინძისთავით. იუდაიზმისა და ებრაული იდენტობის სიმბოლო. იდეალურია როგორც ყოველდღიური, ასევე სპეციალური დღეებისთვის. დამზადებულია მაღალი ხარისხის ქირურგიული ფოლადისგან, ჰიპოალერგენული და გაუფერულებადი.',
    },
    price: 45,
    currency: '₾',
    images: [
      '/lovable-uploads/choker-dvd-1.jpg',
      '/lovable-uploads/choker-dvd-2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Металл', 'Стекло'],
    colors: ['Серебро'],
  },
  {
    id: 9,
    name: {
      ru: "Чокер с подвеской Guns N' Roses",
      en: "Guns N' Roses Choker",
      ge: "Guns N' Roses ჩოკერი",
    },
    description: {
      ru: "Стильный чокер с подвеской в виде логотипа Guns N' Roses. Идеальный аксессуар для поклонников рок-музыки.",
      en: "Stylish choker with a Guns N' Roses logo pendant. Perfect accessory for rock music fans.",
      ge: "სტილური ჩოკერი Guns N' Roses-ის ლოგოთი. იდეალური აქსესუარი როკ-მუსიკის მოყვარულებისთვის.",
    },
    price: 35,
    currency: '₾',
    images: [
      '/lovable-uploads/choker-gnr-1.jpg',
      '/lovable-uploads/choker-gnr-2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный'],
  },
  // Removed products with IDs: 8 (Серьги Солнце и Луна) and 10 (Черный кожаный чокер с шипами) as per user request
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id: number) => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};
