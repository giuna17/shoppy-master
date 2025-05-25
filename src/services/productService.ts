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
    id: 19,
    name: {
      ru: "Серьги 'Лунный свет' (золото)",
      en: "Earrings 'Moonlight' (gold)",
      ge: "საყურეები 'მთვარის შუქი' (ოქრო)",
    },
    description: {
      ru: 'Элегантные золотые серьги с подвесками в виде полумесяцев. Идеальное украшение для вечернего выхода. Легкие и удобные для длительного ношения.',
      en: 'Elegant gold earrings with crescent moon pendants. Perfect for evening wear. Lightweight and comfortable for extended wear.',
      ge: 'ელეგანტური ოქროსფერი საყურეები ნახევარმთვარის ფორმის ჩამოკიდებულებებით. იდეალურია საღამოს ტანსაცმელთან ერთად. მსუბუქი და კომფორტული ხანგრძლივი ტარებისთვის.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356262_714391001147663_7135250089724160584_n.jpg'
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
      ru: "Серьги 'Аметистовый рассвет'",
      en: "Earrings 'Amethyst Dawn'",
      ge: "საყურეები 'ამეთვისტოს განთიადი'",
    },
    description: {
      ru: 'Нежные фиолетовые серьги с кристаллами. Добавят изысканности любому образу. Идеально подходят как для повседневной носки, так и для особых случаев.',
      en: 'Delicate purple earrings with crystals. Add sophistication to any look. Perfect for both everyday wear and special occasions.',
      ge: 'ნაზია იისფერი საყურეები კრისტალებით. ნებისმიერ იმიჯს დაუმატებს დახვეწილობას. იდეალურია როგორც ყოველდღიური, ასევე სპეციალური დღეებისთვის.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356774_1769263413996811_5281240654920214474_n.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Сплав металла', 'Искусственные кристаллы'],
    colors: ['Фиолетовый', 'Серебро'],
  },
  {
    id: 21,
    name: {
      ru: "Серьги 'Золотые капли'",
      en: "Earrings 'Golden Drops'",
      ge: "საყურეები 'ოქროს წვეთები'",
    },
    description: {
      ru: 'Стильные золотые серьги-капли с геометрическим узором. Универсальное украшение, которое подойдет к любому наряду. Легкие и удобные в носке.',
      en: 'Stylish gold drop earrings with geometric pattern. Versatile accessory that complements any outfit. Lightweight and comfortable to wear.',
      ge: 'სტილური ოქროსფერი წვეთის ფორმის საყურეები გეომეტრიული ორნამენტებით. უნივერსალური აქსესუარი, რომელიც ნებისმიერ ტანსაცმელს შეეფერება. მსუბუქი და კომფორტული ტარებისთვის.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494358021_1236477491488223_1113084814910147747_n.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл с золотым покрытием'],
    colors: ['Золотой'],
  },
  {
    id: 22,
    name: {
      ru: "Серьги 'Розовый бриллиант'",
      en: "Earrings 'Pink Diamond'",
      ge: "საყურეები 'ვარდისფერი ბრილიანტი'",
    },
    description: {
      ru: 'Роскошные серьги с розовыми стразами в виде цветка. Идеальный акцент для романтичного образа. Подходят для особых случаев и вечерних выходов.',
      en: 'Luxurious earrings with pink crystal flower design. Perfect accent for a romantic look. Suitable for special occasions and evening wear.',
      ge: 'ფუფუნებისმოყვარე საყურეები ვარდისფერი კრისტალებით ყვავილის ფორმის დიზაინში. იდეალური აქცენტი რომანტულ იმიჯზე. შესაფერისია სპეციალური დღეებისა და საღამოს ტანსამოსისთვის.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494360448_1202980541322821_433259679981194833_n.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл', 'Искусственные кристаллы'],
    colors: ['Розовое золото', 'Кристаллы'],
  },
  {
    id: 23,
    name: {
      ru: "Серьги 'Серебряный лист'",
      en: "Earrings 'Silver Leaf'",
      ge: "საყურეები 'ვერცხლის ფოთოლი'",
    },
    description: {
      ru: 'Элегантные серебряные серьги в виде листьев. Легкие и изящные, они станут прекрасным дополнением как к повседневному, так и к вечернему образу.',
      en: 'Elegant silver leaf-shaped earrings. Lightweight and delicate, they make a beautiful addition to both casual and evening looks.',
      ge: 'ელეგანტური ვერცხლისფერი ფოთლის ფორმის საყურეები. მსუბუქი და დელიკატური, შესანიშნავად დაემატება როგორც ყოველდღიურ, ასევე საღამოს იმიჯს.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/496514974_486316394509569_7569377168526650890_n.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Серебро 925 пробы'],
    colors: ['Серебро'],
  },
  {
    id: 18,
    name: {
      ru: "Кулон 'Шмель'",
      en: "Pendant 'Bumblebee'",
      ge: "შუბლჭვირის ფორმის ბროლჯვარი",
    },
    description: {
      ru: 'Стильный кулон в виде шмеля с яркими акцентами. Символ трудолюбия, упорства и сладкой жизни. Идеально подходит для создания ярких летних образов. Изготовлен из легкого металлического сплава с цветными вставками.',
      en: 'Stylish bumblebee pendant with bright accents. A symbol of hard work, perseverance, and the sweet life. Perfect for creating vibrant summer looks. Made of lightweight metal alloy with colored inserts.',
      ge: 'სტილური შუბლჭვირის ფორმის ბროლჯვარი ნათელი აქცენტებით. შრომისმოყვარეობის, უდრეკობისა და ტკბილი ცხოვრების სიმბოლო. იდეალურია ზაფხულის ნათელი იმიჯის შესაქმნელად. დამზადებულია მსუბუქი ლითონის შენადნობისგან ფერადი ჩანართებით.',
    },
    price: 62,
    currency: '₾',
    images: [
      '/lovable-uploads/bumbl_1.jpg',
      '/lovable-uploads/bumbl_2.jpeg',
    ],
    category: 'necklaces',
    stock: 1,
    featured: true,
    materials: ['Металлический сплав', 'Цветные вставки'],
    colors: ['Желтый', 'Черный'],
  },
  {
    id: 17,
    name: {
      ru: "Кулон 'Крест веры'",
      en: "Pendant 'Cross of Faith'",
      ge: "ჯვარი 'რწმენის ჯვარი'",
    },
    description: {
      ru: 'Изящное ожерелье с кулоном в виде креста. Символ веры, надежды и духовной силы. Идеально подходит для повседневного ношения и особых случаев. Изготовлено из высококачественного металла с износостойким покрытием.',
      en: 'Elegant necklace featuring a cross pendant. A symbol of faith, hope, and spiritual strength. Perfect for both everyday wear and special occasions. Made of high-quality metal with a durable finish.',
      ge: 'დახვეწილი საყელური ჯვრის ფორმის ქინძისთავით. რწმენის, იმედის და სულიერი ძალის სიმბოლო. იდეალურია როგორც ყოველდღიური, ასევე სპეციალური დღეებისთვის. დამზადებულია მაღალი ხარისხის ლითონისაგან გამძლე საფარით.',
    },
    price: 68,
    currency: '₾',
    images: [
      '/lovable-uploads/jvar_1.jpg',
      '/lovable-uploads/jvar_2.jpg',
    ],
    category: 'necklaces',
    stock: 1,
    featured: true,
    materials: ['Металл с покрытием'],
    colors: ['Серебро'],
  },
  {
    id: 16,
    name: {
      ru: "Чокер 'Готическая роза'",
      en: "Choker 'Gothic Rose'",
      ge: "ჩოკერი 'გოთიკური ვარდი'",
    },
    description: {
      ru: 'Загадочный кожаный чокер с металлической подвеской в виде готической розы. Идеальное сочетание элегантности и бунтарского духа. Подчеркнет ваш индивидуальный стиль и добавит образу таинственности.',
      en: 'Mysterious leather choker with a gothic rose metal pendant. The perfect combination of elegance and rebellious spirit. Will highlight your individual style and add mystery to your look.',
      ge: 'დამაფიქრებელი ტყავის ჩოკერი გოთიკური ვარდის ფორმის ლითონის ქინძისთავით. ელეგანტურობისა და ამბოხებული სულისკვეთების სრულყოფილი ჰარმონია. ხაზს უსვამს თქვენს ინდივიდუალურ სტილს და დაამატებს იმიჯს იდუმალებას.',
    },
    price: 58,
    currency: '₾',
    images: [
      '/lovable-uploads/gul_1.jpg',
      '/lovable-uploads/gul_2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серебро'],
  },
  {
    id: 15,
    name: {
      ru: "Ожерелье 'Морская раковина'",
      en: "Necklace 'Seashell'",
      ge: "საყელური 'ზღვის ნიჟარა'",
    },
    description: {
      ru: 'Элегантное ожерелье с подвеской в виде морской раковины. Символ морской романтики и свободы. Идеально подходит для создания летних образов и пляжных луков. Изготовлено из высококачественного сплава с серебряным покрытием.',
      en: 'Elegant necklace featuring a seashell pendant. A symbol of sea romance and freedom. Perfect for creating summer looks and beach outfits. Made of high-quality alloy with silver plating.',
      ge: 'ელეგანტური საყელური ზღვის ნიჟარის ფორმის ქინძისთავით. ზღვის რომანტიკისა და თავისუფლების სიმბოლო. იდეალურია ზაფხულის სტილისა და ზღვისპირეული იერსახის შესაქმნელად. დამზადებულია მაღალი ხარისხის ფოლადისაგან ვერცხლის საფარით.',
    },
    price: 75,
    currency: '₾',
    images: [
      '/lovable-uploads/conchx_1.jpg',
      '/lovable-uploads/conchx_2.jpg',
    ],
    category: 'necklaces',
    stock: 1,
    featured: true,
    materials: ['Металл с серебряным покрытием'],
    colors: ['Серебро'],
  },
  {
    id: 14,
    name: {
      ru: "Чокер 'The Walking Dead'",
      en: "Choker 'The Walking Dead'",
      ge: "ჩოკერი 'The Walking Dead'",
    },
    description: {
      ru: 'Стильный кожаный чокер в тематике The Walking Dead. Идеальный аксессуар для поклонников сериала и постапокалиптического стиля. В комплекте представлены две фотографии с разных ракурсов.',
      en: 'Stylish leather choker inspired by The Walking Dead. Perfect accessory for fans of the series and post-apocalyptic style. Includes two photos from different angles.',
      ge: 'სტილური ტყავის ჩოკერი The Walking Dead-ის სტილში. იდეალური აქსესუარი სერიალის და პოსტ-აპოკალიფსური სტილის მოყვარულებისთვის. შედის ორი ფოტო სხვადასხვა კუთხით.',
    },
    price: 65,
    currency: '₾',
    images: [
      '/lovable-uploads/walking_1.jpg',
      '/lovable-uploads/walking_2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серый'],
  },
  {
    id: 12,
    name: {
      ru: "Чокер 'Бритва'",
      en: "Choker 'Razor'",
      ge: "ჩოკერი 'ბრიტვა'",
    },
    description: {
      ru: 'Стильный чокер с металлической подвеской в виде бритвы. Идеально подходит для создания смелого и дерзкого образа.',
      en: 'Stylish choker with a razor-shaped metal pendant. Perfect for creating a bold and edgy look.',
      ge: 'სტილური ჩოკერი ლითონის ბრიტვის ფორმის ქინძისთავით. იდეალური თამამი და თამაზირებული იმიჯის შესაქმნელად.',
    },
    price: 55,
    currency: '₾',
    images: [
      '/lovable-uploads/britva_1.jpg',
      '/lovable-uploads/britva_2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серебро'],
  },
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
      '/lovable-uploads/choker-dvd-2.jpeg',
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
  try {
    console.log(`[getProductById] Looking for product with ID: ${id}`);
    const product = products.find((product) => product.id === id);
    
    if (!product) {
      console.warn(`[getProductById] Product not found with ID: ${id}`);
      return null;
    }
    
    console.log(`[getProductById] Found product:`, product);
    return product;
  } catch (error) {
    console.error(`[getProductById] Error finding product with ID ${id}:`, error);
    return null;
  }
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};
