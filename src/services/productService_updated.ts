// This is a temporary file with the updated product images
// Please replace the content of productService.ts with this content

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
  // ... (other products remain the same) ...
  {
    id: 19,
    name: {
      ru: 'Серьги "Солнечный свет"',
      en: 'Earrings "Sunlight"',
      ge: 'საყურეები "მზის შუქი"',
    },
    description: {
      ru: 'Элегантные серьги с изящными подвесками в форме солнца, воплощающие тепло, свет и утонченную красоту. Их сияние добавит образу изысканности, а лёгкое покачивание при движении создаст эффект живого блеска.\n\nИдеальное украшение для вечернего выхода, романтического свидания или особого события. Несмотря на выразительный дизайн, серьги остаются лёгкими и комфортными, что делает их отличным выбором для длительного ношения.\n\nПозвольте себе блистать, словно солнечный луч, с каждым шагом!',
      en: 'Elegant earrings with graceful sun-shaped pendants, embodying warmth, light, and refined beauty. Their radiance will add sophistication to your look, while the gentle sway with movement creates a living sparkle effect.\n\nPerfect for evening outings, romantic dates, or special occasions. Despite their expressive design, the earrings remain light and comfortable, making them an excellent choice for extended wear.\n\nLet yourself shine like a sunbeam with every step!',
      ge: 'ელეგანტური საყურეები დახვეწილი მზის ფორმის ჩამოკიდებულებებით, რომლებიც განასახიერებენ სითბოს, სინათლეს და დახვეწილ სილამაზეს. მათი ბრწყინვალება დაამატებს თქვენს იერსებას დახვეწილობას, ხოლო მსუბუქი ქანაობა მოძრაობისას შექმნის ცოცხალი ბზინვარების ეფექტს.\n\nიდეალურია საღამოს გასვლისთვის, რომანტიკული პაემნისთვის ან განსაკუთრებული ღონისძიებისთვის. გამომხატველი დიზაინის მიუხედავად, საყურეები რჩება მსუბუქი და კომფორტული, რაც მათ შესანიშნავ არჩევანს ხდის ხანგრძლივი ტარებისთვის.\n\nნება მოგეცეთ საკუთარ თავს ისე ინათოთ, როგორც მზის სხივი, ყოველი ნაბიჯით!',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356262_714391001147663_7135250089724160584_n.jpg',
      '/lovable-uploads/494356262_714391001147663_7135250089724160584_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл с золотым покрытием'],
    colors: ['Золотой'],
  },
  {
    id: 20,
    name: {
      ru: 'Серьги "Полумесяц Луны"',
      en: 'Earrings "Moon Crescent"',
      ge: 'საყურეები "მთვარის ნახევარმთვარე"',
    },
    description: {
      ru: 'Нежные и утончённые серьги, вдохновлённые волшебством ночного неба. Изящная форма полумесяца придаёт образу загадочности и романтики, подчёркивая индивидуальность и внутреннюю гармонию.\n\nДобавят изысканности как повседневному наряду, так и вечернему образу. Лёгкие и удобные, они станут вашим спутником в любой день — от деловых встреч до тихих вечерних прогулок под звёздами.\n\nПусть лунный свет всегда будет с вами — в каждом движении и каждом взгляде.',
      en: 'Delicate and sophisticated earrings inspired by the magic of the night sky. The graceful crescent moon shape adds an air of mystery and romance to your look, emphasizing individuality and inner harmony.\n\nThey will add elegance to both casual and evening outfits. Lightweight and comfortable, they will become your companion for any occasion — from business meetings to quiet evening walks under the stars.\n\nLet the moonlight always be with you — in every movement and every glance.',
      ge: 'ნაზი და დახვეწილი საყურეები, შთაგონებული ღამის ცის მაგიით. მოხდენილი ნახევარმთვარის ფორმა თქვენს იმიჯს საიდუმლოებასა და რომანტიკას ამატებს, ხაზს უსვამს ინდივიდუალობასა და შინაგან ჰარმონიას.\n\nდაუმატებს დახვეწილობას როგორც ყოველდღიურ, ისე საღამოს ტანსაცმელს. მსუბუქი და კომფორტული, ისინი გახდება თქვენი თანამგზავრი ნებისმიერ დღეს — ბიზნეს შეხვედრებიდან ვარსკვლავების ქვეშ ჩუმ ღამის ფრიადამდე.\n\nნება მთვარის შუქმა ყოველთვის იყოს თქვენთან — ყოველ მოძრაობაში და თვალისჩამომშრალი ყოველ შეხედვაში.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356774_1769263413996811_5281240654920214474_n.jpg',
      '/lovable-uploads/494356774_1769263413996811_5281240654920214474_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Сплав металла', 'Искусственные кристаллы'],
    colors: ['Фиолетовый', 'Серебро'],
  },
  // ... (rest of the products remain the same) ...
];

export function getProducts() {
  return products;
}

export function getProductById(id: number) {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string) {
  return products.filter(product => product.category === category);
}
