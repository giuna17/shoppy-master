// Define types for translations
type TranslationValue = 
  | { ru: string; en: string; ge: string }
  | string[]
  | string;

interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
}

export type Translations = NestedTranslations;

// All translations go here
const translations: Translations = {
  'favorites.login_required': {
    ru: 'Войдите, чтобы сохранять избранное',
    en: 'Please login to save favorites',
    ge: 'გთხოვთ შეხვიდეთ ფავორიტების შესანახად',
  },
  'nav.home': {
    ru: 'Главная',
    en: 'Home',
    ge: 'მთავარი',
  },
  'nav.shop': {
    ru: 'Магазин',
    en: 'Shop',
    ge: 'მაღაზია',
  },
  'nav.about': {
    ru: 'О нас',
    en: 'About',
    ge: 'შესახებ',
  },
  'nav.contact': {
    ru: 'Контакты',
    en: 'Contact',
    ge: 'კონტაქტი',
  },
  'nav.promo_code': {
    ru: 'Промокод',
    en: 'Promo Code',
    ge: 'პრომო კოდი',
  },
  'promo.discount': {
    ru: 'скидка',
    en: 'sale',
    ge: 'ფასდაკლება',
  },
  'nav.enter_promo': {
    ru: 'Ввести промокод',
    en: 'Enter Promo Code',
    ge: 'შეიყვანეთ პრომო კოდი',
  },
  'nav.faq': {
    ru: 'ЧЗВ',
    en: 'FAQ',
    ge: 'კითხვები',
  },
  'nav.categories': {
    ru: 'Категории',
    en: 'Categories',
    ge: 'კატეგორიები',
  },
  'nav.cart': {
    ru: 'Корзина',
    en: 'Shopping cart',
    ge: 'კალათა',
  },
  'nav.profile': {
    ru: 'Профиль',
    en: 'Profile',
    ge: 'პროფილი',
  },
  'nav.profile_menu': {
    ru: 'Меню профиля',
    en: 'Profile menu',
    ge: 'პროფილის მენიუ',
  },
  'nav.favorites': {
    ru: 'Избранное',
    en: 'Favorites',
    ge: 'ფავორიტები',
  },
  'favorites.item': {
    ru: 'избранный товар',
    en: 'favorite item',
    ge: 'რჩეული ნივთი',
  },
  'favorites.items': {
    ru: 'избранных товара',
    en: 'favorite items',
    ge: 'რჩეული ნივთი',
  },

  // Кнопки на главной странице
  'home.shop_now': {
    ru: 'Купить сейчас',
    en: 'Shop Now',
    ge: 'შეიძინე ახლა',
  },
  'home.our_story': {
    ru: 'Наша история',
    en: 'Our Story',
    ge: 'ისტორია',
  },
  'home.subtitle': {
    ru: 'Дикая эстетика для тех, кто кует свой стиль сам — из цепей, клёпок и свободы. Готика, панк, хендмейд — всё, что бунтует вместе с тобой',
    en: 'Wild aesthetics for those who forge their own style - from chains, studs, and freedom. Gothic, punk, handmade - everything that rebels with you',
    ge: 'ველური ესთეტიკა მათთვის, ვინც თავად ქმნის საკუთარ სტილს - ჯაჭვებით, მექანიზმებით და თავისუფლებით. გოთიკა, პანკი, ხელნაკეთი - ყველაფერი, რაც აჯანყდება შენთან ერთად',
  },

  // Секции на главной
  'home.popular_products': {
    ru: 'Новинки',
    en: 'New Arrivals',
    ge: 'ახალი ნივთები',
  },
  'home.view_all': {
    ru: 'Смотреть все',
    en: 'View All',
    ge: 'ყველას ნახვა',
  },

  // Footer информация
  'footer.shop_link': {
    ru: 'Магазин',
    en: 'Shop',
    ge: 'მაღაზია',
  },
  'footer.company': {
    ru: 'Компания',
    en: 'Company',
    ge: 'კომპანია',
  },
  'footer.info': {
    ru: 'Информация',
    en: 'Info',
    ge: 'ინფორმაცია',
  },
  'footer.all_products': {
    ru: 'Все товары',
    en: 'All Products',
    ge: 'ყველა პროდუქტი',
  },
  'footer.bracelets': {
    ru: 'Браслеты',
    en: 'Bracelets',
    ge: 'სამაჯურები',
  },
  'footer.necklaces': {
    ru: 'Ожерелья',
    en: 'Necklaces',
    ge: 'ყელსაბამები',
  },
  'footer.rings': {
    ru: 'Кольца',
    en: 'Rings',
    ge: 'ბეჭდები',
  },
  'footer.candles': {
    ru: 'Свечи',
    en: 'Candles',
    ge: 'სანთლები',
  },
  'footer.about_us': {
    ru: 'О нас',
    en: 'About Us',
    ge: 'ჩვენს შესახებ',
  },
  'footer.contact': {
    ru: 'Контакты',
    en: 'Contact',
    ge: 'კონტაქტი',
  },
  'footer.faq': {
    ru: 'ЧЗВ',
    en: 'FAQ',
    ge: 'ხშირად დასმული კითხვები',
  },
  'footer.shipping': {
    ru: 'Доставка',
    en: 'Shipping',
    ge: 'მიწოდება',
  },
  'footer.handmade': {
    ru: 'Руками, а не шаблоном. С душой, а не инструкцией.\nЕсли хочешь блестяшку — не сюда. Тут делают вещи с характером🪓',
    en: 'Handmade, not templated. With soul, not instructions.\nIf you want something flashy — look elsewhere. Here we make things with character🪓',
    ge: 'ხელით, არა შაბლონით. სულით, არა ინსტრუქციით.\nთუ ბრჭვიალს ეძებ — ეს ადგილი არ არის შენთვის. აქ ხასიათიან ნივთებს ვქმნით🪓',
  },
  'footer.handmade_products': {
    ru: 'Ручная работа',
    en: 'Handmade',
    ge: 'ხელნაკეთი',
  },
  'footer.other_products': {
    ru: 'Другое',
    en: 'Other',
    ge: 'სხვა',
  },
  'common.close': {
    ru: 'Закрыть',
    en: 'Close',
    ge: 'დახურვა',
  },
  'delivery.title': {
    ru: 'Информация о доставке',
    en: 'Delivery Information',
    ge: 'მიტანის ინფორმაცია',
  },
  'delivery.description': {
    ru: 'Доставка по всему Тбилиси: цена 5 лари!\n\nСроки доставки: от 1 до 5 дней\n\nКурьер свяжется с вами заранее по указанному номеру телефона.\n\nПри заказе от 100 лари - доставка бесплатная!',
    en: 'Delivery throughout Tbilisi: price 5 GEL!\n\nDelivery time: 1 to 5 days\n\nThe courier will contact you in advance using the provided phone number.\n\nFree delivery for orders over 100 GEL!',
    ge: 'მიტანა მთელ თბილისში: ფასი 5 ლარი!\n\nმიტანის ვადები: 1 დღიდან 5 დღემდე\n\nკურიერი წინასწარ დაგიკავშირდებათ თქვენს მიერ მითითებულ ტელეფონის ნომერზე.\n\n100 ლარიდან ზემოთ შეკვეთებზე - მიტანა უფასოა!',
  },
  'footer.delivery': {
    ru: 'Доставка от 5 лари (доставка на дом).',
    en: 'Delivery from 5 lari (home delivery).',
    ge: 'მიტანა 5 ლარიდან (სახლში მიტანა).',
  },

  // Cart translations are defined later in the file
  'cart.delivery_fee': {
    ru: '+5 лар за доставку',
    en: '+5 lari for delivery',
    ge: '+5 ლარი მიწოდებისთვის',
  },
  'cart.free_delivery': {
    ru: 'Бесплатная доставка!',
    en: 'Free delivery!',
    ge: 'უფასო მიწოდება!',
  },
  'cart.promo_info': {
    ru: 'при заказе от 100 лар доставка бесплатно! - а при заказе от 500 лар - скидка 10%!',
    en: 'For orders from 100 lari, delivery is free! For orders from 500 lari, 10% discount!',
    ge: '100 ლარიდან მიწოდება უფასოა! 500 ლარიდან - 10% ფასდაკლება!',
  },
  'cart.discount_10': {
    ru: 'скидка: 10%',
    en: 'discount: 10%',
    ge: 'ფასდაკლება: 10%',
  },
  'cart.discount_5': {
    ru: 'скидка: 5%',
    en: 'discount: 5%',
    ge: 'ფასდაკლება: 5%',
  },
  'cart.discount_5_review': {
    ru: 'скидка: 5%',
    en: 'discount: 5%',
    ge: 'ფასდაკლება: 5%',
  },
  'cart.free_delivery_info': {
    ru: 'При заказе от 100 лар — бесплатная доставка!',
    en: 'For orders from 100 lari — free delivery!',
    ge: '100 ლარიდან მიტანა უფასოა!',
  },

  // Товары
  'product.categories': {
    ru: 'Категории',
    en: 'Categories',
    ge: 'კატეგორიები',
  },
  'products.zero': {
    ru: 'товаров',
    en: 'products',
    ge: 'ნაწარმი',
  },
  'products.one': {
    ru: 'товар',
    en: 'product',
    ge: 'ნივთი',
  },
  'products.few': {
    ru: 'товара',
    en: 'products',
    ge: 'ნივთი',
  },
  'products.many': {
    ru: 'товаров',
    en: 'products',
    ge: 'ნაწარმი',
  },
  'product.add_to_cart': {
    ru: 'В корзину',
    en: 'Add to cart',
    ge: 'კალათაში დამატება',
  },
  'product.featured': {
    ru: 'Рекомендуемый товар',
    en: 'Featured Product',
    ge: 'რჩეული პროდუქტი',
  },
  'product.out_of_stock': {
    ru: 'Нет в наличии',
    en: 'Out of Stock',
    ge: 'ამოწურულია',
  },
  'favorites.added': {
    ru: 'Добавлено в избранное',
    en: 'Added to Favorites',
    ge: 'რჩეულიში დამატებულია',
  },
  'favorites.added_description': {
    ru: 'Товар добавлен в избранное',
    en: 'Item has been added to your favorites',
    ge: 'ნივთი დამატებულია რჩეულიში',
  },
  'favorites.remove': {
    ru: 'Удалить из избранных',
    en: 'Remove from favorites',
    ge: 'ფავორიტებიდან ამოშლა',
  },
  'favorites.empty_title': {
    ru: 'Ваш список избранного пуст',
    en: 'Your favorites list is empty',
    ge: 'თქვენი ფავორიტების სია ცარიელია',
  },
  'favorites.empty_description': {
    ru: 'Добавляйте товары в избранное, и они появятся здесь',
    en: 'Add items to your favorites and they will appear here',
    ge: 'დაამატეთ ნივთები ფავორიტებში და ისინი აქ გამოჩნდება',
  },
  'favorites.browse_shop': {
    ru: 'В магазин',
    en: 'Browse Shop',
    ge: 'მაღაზიაში',
  },
  'favorites.removed': {
    ru: 'Убрать из избранных',
    en: 'Removed from Favorites',
    ge: 'რჩეულიდან ამოღებულია',
  },
  'favorites.removed_description': {
    ru: 'Товар удален из избранного',
    en: 'Item has been removed from your favorites',
    ge: 'ნივთი ამოღებულია რჩეულიდან',
  },
  'favorites.empty': {
    ru: 'Избранных товаров пока нет',
    en: 'No favorite items yet',
    ge: 'ჯერ არ არის რჩეული ნივთები',
  },
  'favorites.title': {
    ru: 'Избранное',
    en: 'Favorites',
    ge: 'რჩეული',
  },
  'product.in_cart': {
    ru: 'Кто-то смотрит этот товар 👀',
    en: 'Someone is viewing this item 👀',
    ge: 'ვიღაც უყურებს ამ ნივთს 👀',
  },
  'product.in_stock': {
    ru: 'В наличии',
    en: 'In stock',
    ge: 'მარაგში',
  },
  'product.discounted_products': {
    ru: 'Товары со скидкой',
    en: 'Discounted Products',
    ge: 'ფასდაკლებული ნივთები',
  },
  'product.no_discounted_products': {
    ru: 'Нет товаров со скидкой',
    en: 'No discounted products available',
    ge: 'ფასდაკლებული პროვიზია არ არის ხელმისაწვდომი',
  },
  'recently_viewed': {
    label: {
      ru: 'Недавно просмотренные',
      en: 'Recently Viewed',
      ge: 'ბოლოს ნანახი',
    },
    you_looked: {
      ru: 'Вы заглядывались 👀',
      en: 'You were looking 👀',
      ge: 'შენ ნანახი გაქვს 👀',
    },
    you_might_like: {
      ru: 'Возможно, вы искали это?',
      en: 'You might be looking for this?',
      ge: 'შეიძლება ეძებდი ამას?',
    },
    dont_lose_it: {
      ru: 'Не потеряй то, что понравилось',
      en: 'Don\'t lose what you liked',
      ge: 'არ დაკარგო რაც მოგეწონა',
    },
    view_all: {
      ru: 'Смотреть все',
      en: 'View all',
      ge: 'ყველას ნახვა',
    },
    empty_state: {
      ru: 'Вы еще ничего не смотрели!',
      en: 'You have not viewed anything yet!',
      ge: 'ჯერ არაფერი გაქვთ ნანახი!',
    },
    view_shop: {
      ru: 'Посмотреть',
      en: 'View',
      ge: 'ნახვა',
    }
  },
  'favorites.favorite': {
    ru: 'Избранное',
    en: 'Favorite',
    ge: 'რჩეული',
  },
  'product.back_to_shop': {
    ru: 'Назад в магазин',
    en: 'Back to shop',
    ge: 'მაღაზიაში დაბრუნება',
  },
  'product.details': {
    ru: 'Детали',
    en: 'Details',
    ge: 'დეტალები',
  },
  'product.detail_material': {
    ru: 'Материал',
    en: 'Material',
    ge: 'მასალა',
  },
  'product.not_found': {
    ru: 'Товар не найден',
    en: 'Product not found',
    ge: 'პროდუქტი არ მოიძებნა',
  },
  'product.not_found_message': {
    ru: 'Извините, запрашиваемый товар не существует.',
    en: 'Sorry, the requested product does not exist.',
    ge: 'ბოდიში, მოთხოვნილი პროდუქტი არ არსებობს.',
  },
  'product.return_to_shop': {
    ru: 'Вернуться в магазин',
    en: 'Return to shop',
    ge: 'მაღაზიაში დაბრუნება',
  },
  'product.no_products_found': {
    ru: 'Товары не найдены. Попробуйте изменить параметры фильтрации.',
    en: 'No products found. Try adjusting your filter criteria.',
    ge: 'პროდუქცია ვერ მოიძებნა. სცადეთ ფილტრის პარამეტრების შეცვლა.',
  },
  'product.detail_1': {
    ru: '• Ручная работа из премиум-материалов',
    en: '• Handcrafted from premium materials',
    ge: '• ხელნაკეთი პრემიუმ მასალებისგან',
  },
  'product.detail_2': {
    ru: '• Уникальный альтернативный стиль',
    en: '• Unique alternative style',
    ge: '• უნიკალური ალტერნატიული სტილი',
  },
  'product.detail_3': {
    ru: '• Фирменный дизайн Nekoshop - СДЕЛАНО ЛАПКАМИ',
    en: '• Signature Nekoshop - PAWCRAFTS design',
    ge: '• Nekoshop - დამზადებულია თათებით',
  },
  'product.detail_4': {
    ru: '• Сделано на века',
    en: '• Built to last',
    ge: '• შექმნილია საუკუნოდ',
  },
  'product.remaining_stock': {
    ru: 'Осталось: {count} шт.',
    en: 'Remaining: {count} pcs',
    ge: 'დარჩენილია: {count} ც.',
  },
  'filters.availability': {
    ru: 'Наличие',
    en: 'Availability',
    ge: 'ხელმისაწვდომობა',
  },

  'product.no_stock': {
    ru: 'Нет в наличии',
    en: 'Out of stock',
    ge: 'არ არის მარაგში',
  },
  'product.stock_warning': {
    ru: 'Вы можете заказать не больше, чем есть в наличии. Если выбрано больше — количество будет уменьшено до доступного.',
    en: "You can't order more than available in stock. If more is selected, the quantity will be reduced to available.",
    ge: 'თქვენ არ შეგიძლიათ შეუკვეთოთ მეტი, ვიდრე მარაგშია. მეტის არჩევის შემთხვევაში, რაოდენობა შემცირდება ხელმისაწვდომამდე.',
  },
  'home.most_popular': {
    ru: 'САМОЕ ПОПУЛЯРНОЕ',
    en: 'MOST POPULAR',
    ge: 'ყველაზე პოპულარული',
  },
  'product.most_viewed': {
    ru: 'Самый популярный',
    en: 'Most Viewed',
    ge: 'ყველაზე ნანახი',
  },
  'product.discounts': {
    ru: 'Товары со скидкой',
    en: 'Discounted Products',
    ge: 'ფასდაკლებული პროდუქცია',
  },
  'product.coming_soon_discounted': {
    ru: 'Скоро появятся товары со скидкой',
    en: 'Discounted products coming soon',
    ge: 'მალე გამოჩნდება ფასდაკლებული პროდუქცია',
  },

  // Категории
  // Категории товаров
  // Filters
  'filters.title': {
    ru: 'Фильтры',
    en: 'Filters',
    ge: 'ფილტრები',
  },
  'filters.most_popular': {
    ru: 'Популярные',
    en: 'Most Popular',
    ge: 'პოპულარული',
  },
  'filters.discounts': {
    ru: 'Скидки',
    en: 'Discounts',
    ge: 'ფასდაკლებები',
  },
  'filters.price': {
    ru: 'Цена',
    en: 'Price',
    ge: 'ფასი',
  },
  'filters.categories': {
    ru: 'Категории',
    en: 'Categories',
    ge: 'კატეგორიები',
  },
  'filters.materials': {
    ru: 'Материалы',
    en: 'Materials',
    ge: 'მასალები',
  },
  'filters.in_stock': {
    ru: 'В наличии',
    en: 'In stock',
    ge: 'მარაგში',
  },
  'filters.out_of_stock': {
    ru: 'Нет в наличии',
    en: 'Out of stock',
    ge: 'არ არის მარაგში',
  },
  'filters.on_sale': {
    ru: 'Со скидкой',
    en: 'On sale',
    ge: 'ფასდაკლებით',
  },
  'filters.apply': {
    ru: 'Применить',
    en: 'Apply',
    ge: 'გამოყენება',
  },
  'filters.handmade': {
    ru: 'Самодельные',
    en: 'Handmade',
    ge: 'ხელნაკეთი',
  },
  'filters.other': {
    ru: 'Другое',
    en: 'Other',
    ge: 'სხვა',
  },
  'common.apply': {
    ru: 'Применить',
    en: 'Apply',
    ge: 'გამოყენება',
  },
  'promo.have_code': {
    ru: 'Есть промокод?',
    en: 'Have a code?',
    ge: 'გაქვთ კოდი?',
  },
  'promo.want_discount': {
    ru: 'Хотите скидку?',
    en: 'Want a discount?',
    ge: 'გსურთ ფასდაკლება?',
  },
  'promo.how_to_get': {
    ru: 'Вот как её получить:',
    en: 'Here\'s how to get it:',
    ge: 'აი, როგორ მიიღოთ ის:',
  },
  'promo.social_codes': {
    ru: 'Промокоды, которые мы публикуем в соцсетях!',
    en: 'Promo codes that we post on our social media!',
    ge: 'პრომო კოდები, რომლებსაც სოციალურ ქსელებში ვაქვეყნებთ!',
  },
  'promo.over_500': {
    ru: 'Для заказов от 500 лари — скидка 10%!',
    en: 'For orders over 500 lari — get 10% off!',
    ge: '500 ლარის ზემოთ შეკვეთებზე — 10%-იანი ფასდაკლება!',
  },
  'promo.over_200': {
    ru: 'Для заказов от 200 лари — скидка 5%!',
    en: 'For orders over 200 lari — get 5% off!',
    ge: '200 ლარის ზემოთ შეკვეთებზე — 5%-იანი ფასდაკლება!',
  },
  'promo.over_100': {
    ru: 'Для заказов от 100 лари — бесплатная доставка!',
    en: 'For orders over 100 lari — free delivery!',
    ge: '100 ლარის ზემოთ შეკვეთებზე — უფასო მიწოდება!',
  },
  'promo.facebook': {
    ru: 'Facebook',
    en: 'Facebook',
    ge: 'Facebook',
  },
  'promo.instagram': {
    ru: 'Instagram',
    en: 'Instagram',
    ge: 'Instagram',
  },
  'promo.discount_info_title': {
    ru: 'Скидки на заказы',
    en: 'Order Discounts',
    ge: 'ფასდაკლებები შეკვეთებზე',
  },
  'promo.follow_us_for_discounts': {
    ru: 'Подпишитесь на наши соцсети, чтобы не пропустить акции и скидки!',
    en: 'Follow us on social media to get exclusive promo codes and discounts!',
    ge: 'გამოგვყევით სოციალურ ქსელებში, რათა არ გამოგრჩეთ აქციები და ფასდაკლებები!',
  },
  'sort.by_price_low_high': {
    ru: 'Цена: по возрастанию',
    en: 'Price: Low to High',
    ge: 'ფასი: ზრდადი',
  },
  'sort.by_price_high_low': {
    ru: 'Цена: по убыванию',
    en: 'Price: High to Low',
    ge: 'ფასი: კლებადი',
  },
  'filters.reset': {
    ru: 'Сбросить',
    en: 'Reset',
    ge: 'გაუქმება',
  },
  'filters.special_offers': {
    ru: 'Специальные предложения',
    en: 'Special Offers',
    ge: 'სპეციალური შეთავაზებები',
  },
  'filters.reset_all': {
    ru: 'Сбросить все фильтры',
    en: 'Reset all filters',
    ge: 'ყველა ფილტრის გასუფთავება',
  },
  'filters.show': {
    ru: 'Показать фильтры',
    en: 'Show filters',
    ge: 'ფილტრების ჩვენება',
  },
  'filters.hide': {
    ru: 'Скрыть фильтры',
    en: 'Hide filters',
    ge: 'ფილტრების დამალვა',
  },

  // Categories
  'category.all': {
    ru: 'Все',
    en: 'All',
    ge: 'ყველა',
  },
  'category.bracelets': {
    ru: 'Браслеты',
    en: 'Bracelets',
    ge: 'სამაჯურები',
  },
  'category.rings': {
    ru: 'Кольца',
    en: 'Rings',
    ge: 'ბეჭდები',
  },
  'category.earrings': {
    ru: 'Серьги',
    en: 'Earrings',
    ge: 'საყურეები',
  },
  'category.chokers': {
    ru: 'Чокеры',
    en: 'Chokers',
    ge: 'ჩოკერები',
  },
  'category.hairpins': {
    ru: 'Заколки',
    en: 'Hairpins',
    ge: 'სამაგრები',
  },
  'category.candles': {
    ru: 'Свечи',
    en: 'Candles',
    ge: 'სანთლები',
  },
  'category.accessories': {
    ru: 'Аксессуары',
    en: 'Accessories',
    ge: 'აქსესუარები',
  },
  'category.necklaces': {
    ru: 'Ожерелья',
    en: 'Necklaces',
    ge: 'ყელსაბამები',
  },
  'category.bracelet': {
    ru: 'Браслет',
    en: 'Bracelet',
    ge: 'სამაჯური',
  },
  'category.keychains': {
    ru: 'Брелки',
    en: 'Keychains',
    ge: 'გასაღების დამჭერები',
  },
  'category.ring': {
    ru: 'Кольцо',
    en: 'Ring',
    ge: 'ბეჭედი',
  },
  'category.earring': {
    ru: 'Серьга',
    en: 'Earring',
    ge: 'საყურე',
  },
  'category.choker': {
    ru: 'Чокер',
    en: 'Choker',
    ge: 'ჩოკერი',
  },
  'category.hairpin': {
    ru: 'Заколка',
    en: 'Hairpin',
    ge: 'სამაგარი',
  },
  'category.candle': {
    ru: 'Свеча',
    en: 'Candle',
    ge: 'სანთელი',
  },
  'category.necklace': {
    ru: 'Ожерелье',
    en: 'Necklace',
    ge: 'ყელსაბამი',
  },

  // Материалы
  'material.metal': {
    ru: 'Металл',
    en: 'Metal',
    ge: 'მეტალი',
  },
  'material.silver': {
    ru: 'Серебро',
    en: 'Silver',
    ge: 'ვერცხლი',
  },
  'material.gold': {
    ru: 'Золото',
    en: 'Gold',
    ge: 'ოქრო',
  },
  'material.leather': {
    ru: 'Кожа',
    en: 'Leather',
    ge: 'ტყავი',
  },
  'material.fabric': {
    ru: 'Ткань',
    en: 'Fabric',
    ge: 'ქსოვილი',
  },
  'material.glass': {
    ru: 'Стекло',
    en: 'Glass',
    ge: 'მინა',
  },
  'material.wood': {
    ru: 'Дерево',
    en: 'Wood',
    ge: 'ხე',
  },
  'material.wax': {
    ru: 'Воск',
    en: 'Wax',
    ge: 'ცვილი',
  },

  // Уведомления
  'toast.added_to_cart': {
    ru: 'Добавлено в корзину',
    en: 'Added to cart',
    ge: 'კალათაში დამატებულია',
  },
  'toast.added_to_cart_description': {
    ru: 'Товар был добавлен в вашу корзину',
    en: 'Product has been added to your cart',
    ge: 'პროდუქტი დაემატა თქვენს კალათას',
  },
  'toast.stock_limit_reached': {
    ru: 'Эй, не жадничай',
    en: "Hey, don't be greedy",
    ge: 'ჰეი, ნუ იქნები ხარბი',
  },
  'toast.stock_limit_message': {
    ru: 'Мы же сказали — максимум 5. Хочешь больше? Жди пополнения.',
    en: 'We said — maximum 5. Want more? Wait for restock.',
    ge: 'ჩვენ ვთქვით — მაქსიმუმ 5. გინდა მეტი? დაელოდე შევსებას.',
  },

  // Отзывы
  'reviews.title_part1': {
    ru: 'Отзывы',
    en: 'User',
    ge: 'მომხმარებლის',
  },
  'reviews.title_part2': {
    ru: 'клиентов',
    en: 'Reviews',
    ge: 'მიმოხილვები',
  },
  'reviews.leave_review': {
    ru: 'Оставить отзыв',
    en: 'Leave a Review',
    ge: 'დატოვეთ მიმოხილვა',
  },
  'reviews.rating': {
    ru: 'Оценка',
    en: 'Rating',
    ge: 'შეფასება',
  },
  'reviews.comment': {
    ru: 'Комментарий',
    en: 'Comment',
    ge: 'კომენტარი',
  },
  'reviews.comment_placeholder': {
    ru: 'Напишите ваш комментарий здесь...',
    en: 'Write your comment here...',
    ge: 'დაწერეთ თქვენი კომენტარი აქ...',
  },
  'reviews.photo_url': {
    ru: 'URL фотографии',
    en: 'Photo URL',
    ge: 'ფოტოს URL',
  },
  'reviews.photo_url_placeholder': {
    ru: 'Вставьте URL изображения здесь',
    en: 'Paste the image URL here',
    ge: 'ჩასვით სურათის URL აქ',
  },
  'reviews.submit': {
    ru: 'Отправить отзыв',
    en: 'Submit Review',
    ge: 'მიმოხილვის გაგზავნა',
  },
  'reviews.review': {
    ru: 'отзыв',
    en: 'review',
    ge: 'მიმოხილვა',
  },
  'reviews.reviews': {
    ru: 'отзывов',
    en: 'reviews',
    ge: 'მიმოხილვები',
  },
  'reviews.no_reviews': {
    ru: 'Пока нет отзывов',
    en: 'No reviews yet',
    ge: 'ჯერ არ არის მიმოხილვები',
  },
  'reviews.customer_reviews': {
    ru: 'Отзывы клиентов',
    en: 'Customer Reviews',
    ge: 'მომხმარებელთა მიმოხილვები',
  },
  'reviews.view_all': {
    ru: 'Смотреть все',
    en: 'View all',
    ge: 'ყველას ნახვა',
  },
  'reviews.success': {
    ru: 'Успех!',
    en: 'Success!',
    ge: 'წარმატება!',
  },
  'reviews.thank_you': {
    ru: 'Спасибо за ваш отзыв!',
    en: 'Thank you for your review!',
    ge: 'მადლობა თქვენი მიმოხილვისთვის!',
  },
  'reviews.error': {
    ru: 'Ошибка',
    en: 'Error',
    ge: 'შეცდომა',
  },
  'reviews.comment_required': {
    ru: 'Пожалуйста, оставьте комментарий',
    en: 'Please leave a comment',
    ge: 'გთხოვთ დატოვოთ კომენტარი',
  },
  'reviews.rating_required': {
    ru: 'Пожалуйста, поставьте оценку',
    en: 'Please provide a rating',
    ge: 'გთხოვთ მიუთითოთ შეფასება',
  },
  'reviews.must_purchase': {
    ru: 'Вы можете оставить отзыв только после покупки товара',
    en: 'You can only leave a review after purchasing the product',
    ge: 'თქვენ შეგიძლიათ დატოვოთ მიმოხილვა მხოლოდ პროდუქტის შეძენის შემდეგ',
  },
  'reviews.already_reviewed': {
    ru: 'Вы уже оставили отзыв на этот товар',
    en: 'You have already reviewed this product',
    ge: 'თქვენ უკვე დაგიტოვებიათ მიმოხილვა ამ პროდუქტზე',
  },
  'reviews.must_purchase_message': {
    ru: 'Отзывы могут оставлять только покупатели, которые приобрели этот товар.',
    en: 'Reviews can only be left by customers who have purchased this item.',
    ge: 'მიმოხილვების დატოვება შეუძლიათ მხოლოდ მომხმარებლებს, რომლებმაც შეიძინეს ეს ნივთი.',
  },
  'reviews.verified_only': {
    ru: '(только проверенные покупки)',
    en: '(verified purchases only)',
    ge: '(მხოლოდ დადასტურებული შენაძენები)',
  },
  'reviews.leave_good_review_discount': {
    ru: 'Оставь хороший отзыв и получи 5% скидку на следующий заказ!',
    en: 'Leave a good review and get 5% off your next order!',
    ge: 'დატოვე კარგი მიმოხილვა და მიიღე 5% ფასდაკლება შემდეგ შეკვეთაზე!',
  },
  'reviews.write_review': {
    ru: 'Написать отзыв',
    en: 'Write a Review',
    ge: 'მიმოხილვის დაწერა',
  },
  'reviews.your_rating': {
    ru: 'Ваша оценка',
    en: 'Your Rating',
    ge: 'თქვენი შეფასება',
  },
  'reviews.how_was_it': {
    ru: 'Как вам товар?',
    en: 'How was it?',
    ge: 'როგორ მოგეწონათ?',
  },
  'reactions.love': {
    ru: 'Обожаю!',
    en: 'Love it!',
    ge: 'მიყვარს!',
  },
  'reactions.funny': {
    ru: 'Забавно',
    en: 'Funny',
    ge: 'სასაცილოა',
  },
  'reactions.mind_blown': {
    ru: 'Восторг!',
    en: 'Mind blown!',
    ge: 'გამაოგნებელია!',
  },
  'reviews.what_did_you_like': {
    ru: 'Что вам понравилось?',
    en: 'What did you like?',
    ge: 'რა მოგეწონათ?',
  },
  'reviews.categories.price': {
    ru: 'Цена',
    en: 'Price',
    ge: 'ფასი',
  },
  'reviews.categories.quality': {
    ru: 'Качество',
    en: 'Quality',
    ge: 'ხარისხი',
  },
  'reviews.categories.design': {
    ru: 'Дизайн',
    en: 'Design',
    ge: 'დიზაინი',
  },
  'reviews.categories.delivery': {
    ru: 'Доставка',
    en: 'Delivery',
    ge: 'მიწოდება',
  },
  'reviews.categories.packaging': {
    ru: 'Упаковка',
    en: 'Packaging',
    ge: 'შეფუთვა',
  },
  'reviews.categories.usability': {
    ru: 'Удобство',
    en: 'Usability',
    ge: 'მოხერხებულობა',
  },
  'reviews.tell_us_more': {
    ru: 'Расскажите подробнее',
    en: 'Tell us more',
    ge: 'მოგვიყევით მეტი',
  },
  'reviews.features_placeholder': {
    ru: 'Что именно вам понравилось?',
    en: 'What specifically did you like?',
    ge: 'რა გაგახარეთ?',
  },
  'reviews.example': {
    ru: 'Например:',
    en: 'Example:',
    ge: 'მაგალითად:',
  },
  'reviews.example_text': {
    ru: 'Отличное качество, быстрая доставка, красивая упаковка',
    en: 'Great quality, fast delivery, beautiful packaging',
    ge: 'კარგი ხარისხი, სწრაფი მიწოდება, ლამაზი შეფუთვა',
  },
  'reviews.liked': {
    ru: 'понравилось',
    en: 'liked',
    ge: 'მოეწონა',
  },
  'reviews.reactions.love': {
    ru: 'Я влюбился!',
    en: 'I fell in love!',
    ge: 'თავი შემაყვარა!',
  },
  'reviews.reactions.funny': {
    ru: 'Это странно, но прикольно!',
    en: 'It\'s weird but cool!',
    ge: 'უცნაურია, მაგრამ მაგარია!',
  },
  'reviews.reactions.mind_blown': {
    ru: 'Я в полном шоке!',
    en: 'I\'m completely shocked!',
    ge: 'შოკშივარ!',
  },
  'reviews.success_title': {
    ru: 'Спасибо за отзыв!',
    en: 'Thank you for your review!',
    ge: 'მადლობა თქვენი მიმოხილვისთვის!',
  },
  'reviews.success_message': {
    ru: 'Ваш отзыв успешно опубликован',
    en: 'Your review has been published',
    ge: 'თქვენი მიმოხილვა გამოქვეყნებულია',
  },
  'reviews.submit_error': {
    ru: 'Произошла ошибка при отправке отзыва',
    en: 'An error occurred while submitting your review',
    ge: 'შეცდომა მიმოხილვის გაგზავნისას',
  },
  'reviews.filters': {
    ru: 'Фильтры',
    en: 'Filters',
    ge: 'ფილტრები',
  },
  'reviews.clear_all': {
    ru: 'Очистить все',
    en: 'Clear all',
    ge: 'ყველას წაშლა',
  },
  'reviews.comment_help': {
    ru: 'Напишите отзыв о товаре',
    en: 'Write your review about this product',
    ge: 'დაწერეთ მიმოხილვა ამ პროდუქტზე',
  },
  'reviews.max_size': {
    ru: 'макс. {{size}}',
    en: 'max {{size}}',
    ge: 'მაქს. {{size}}',
  },
  'reviews.choose_photo': {
    ru: 'Выбрать фото',
    en: 'Choose photo',
    ge: 'აირჩიეთ ფოტო',
  },
  'reviews.add_photo': {
    ru: 'Добавить фото',
    en: 'Add photo',
    ge: 'ფოტოს დამატება',
  },
  'common.optional': {
    ru: 'необязательно',
    en: 'optional',
    ge: 'არასავალდებულო',
  },
  'common.clear': {
    ru: 'Очистить',
    en: 'Clear',
    ge: 'გასუფთავება',
  },
  'common.required_fields': {
    ru: 'Обязательные поля',
    en: 'Required fields',
    ge: 'სავალდებულო ველები',
  },
  'reviews.sort_by': {
    ru: 'Сортировать по',
    en: 'Sort by',
    ge: 'დალაგება',
  },
  'reviews.newest': {
    ru: 'Сначала новые',
    en: 'Newest first',
    ge: 'უახლესი ჯერ',
  },
  'reviews.highest_rated': {
    ru: 'Высокий рейтинг',
    en: 'Highest rated',
    ge: 'მაღალი რეიტინგი',
  },
  'reviews.with_photos': {
    ru: 'С фотографиями',
    en: 'With photos',
    ge: 'ფოტოებით',
  },
  'reviews.stars': {
    ru: 'звезды',
    en: 'stars',
    ge: 'ვარსკვლავი',
  },

  // Cart
  'cart.title': {
    ru: 'Корзина',
    en: 'Shopping Cart',
    ge: 'კალათა',
  },
  'cart.item': {
    ru: 'товар',
    en: 'item',
    ge: 'ნივთი',
  },
  'cart.items': {
    ru: 'товара',
    en: 'items',
    ge: 'ნივთი',
  },
  'cart.empty': {
    ru: 'Ваша корзина пуста',
    en: 'Your cart is empty',
    ge: 'თქვენი კალათა ცარიელია',
  },
  'cart.subtotal': {
    ru: 'Промежуточный итог',
    en: 'Subtotal',
    ge: 'შუალედური ჯამი',
  },
  'cart.shipping': {
    ru: 'Доставка',
    en: 'Shipping',
    ge: 'მიწოდება',
  },
  'cart.free': {
    ru: 'Бесплатно',
    en: 'Free',
    ge: 'უფასო',
  },
  'cart.discount_applied': {
    ru: 'Применена скидка {{percent}}',
    en: '{{percent}} discount applied',
    ge: '{{percent}} ფასდაკლება',
  },
  'cart.total': {
    ru: 'Итого',
    en: 'Total',
    ge: 'სულ',
  },
  'cart.checkout': {
    ru: 'Оформить заказ',
    en: 'Checkout',
    ge: 'შეკვეთის დასრულება',
  },
  'cart.empty_title': {
    ru: 'Ваша корзина пуста',
    en: 'Your cart is empty',
    ge: 'თქვენი კალათა ცარიელია',
  },
  'cart.empty_description': {
    ru: 'Добавляйте товары в корзину, и они появятся здесь',
    en: 'Add items to your cart and they will appear here',
    ge: 'დაამატეთ ნივთები კალათაში და ისინი აქ გამოჩნდება',
  },
  'cart.continue_shopping': {
    ru: 'В магазин',
    en: 'Continue Shopping',
    ge: 'მაღაზიაში',
  },
  'cart.add_more_for_free_delivery': {
    ru: 'Добавьте товаров на {{amount}} GEL для бесплатной доставки',
    en: 'Add {{amount}} GEL more for free delivery',
    ge: 'დაამატეთ {{amount}} ლარის ღირებულების ნივთი უფასო მიტანისთვის',
  },
  'cart.empty_cart_title': {
    ru: 'Ваша корзина пуста',
    en: 'Your cart is empty',
    ge: 'თქვენი კალათა ცარიელია',
  },
  'cart.empty_cart_message': {
    ru: 'Похоже, вы еще ничего не добавили в корзину',
    en: 'Looks like you haven\'t added anything to your cart yet',
    ge: 'როგორც ჩანს, თქვენ ჯერ არაფერი გაქვთ დამატებული კალათაში',
  },
  'cart.remove': {
    ru: 'Удалить',
    en: 'Remove',
    ge: 'წაშლა',
  },
  'similar.products': {
    ru: 'Похожие товары',
    en: 'Similar Products',
    ge: 'მსგავსი პროდუქტები',
  },
  'product.hide_details': {
    ru: 'Скрыть детали',
    en: 'Hide details',
    ge: 'დამალვა დეტალები',
  },
  'product.details.handmade': {
    ru: '• Ручная работа из премиальных материалов',
    en: '• Handmade from premium materials',
    ge: '• ხელნაკეთი პრემიუმ მასალებისგან',
  },
  'product.details.style': {
    ru: '• Уникальный альтернативный стиль',
    en: '• Unique alternative style',
    ge: '• უნიკალური ალტერნატიული სტილი',
  },
  'product.details.made_by': {
    ru: '• Nekoshop - сделано с любовью',
    en: '• Nekoshop - made with love',
    ge: '• Nekoshop - დამზადებულია თათებით',
  },
  'product.quality': {
    ru: '• Создано на века',
    en: '• Made to last a lifetime',
    ge: '• შექმნილია საუკუნოდ',
  },
  'cart.quantity': {
    ru: 'Количество',
    en: 'Quantity',
    ge: 'რაოდენობა',
  },
  'cart.update': {
    ru: 'Обновить',
    en: 'Update',
    ge: 'განახლება',
  },

  // Аутентификация
  'auth.sign_in': {
    ru: 'Войти',
    en: 'Sign In',
    ge: 'შესვლა',
  },
  'auth.signing_in': {
    ru: 'Вход',
    en: 'Signing in',
    ge: 'შესვლა',
  },
  'auth.sign_up': {
    ru: 'Зарегистрироваться',
    en: 'Sign Up',
    ge: 'რეგისტრაცია',
  },

  'auth.sign_out': {
    ru: 'Выйти',
    en: 'Sign Out',
    ge: 'გამოსვლა',
  },
  'auth.email': {
    ru: 'Электронная почта',
    en: 'Email',
    ge: 'ელ.ფოსტა',
  },
  'auth.password': {
    ru: 'Пароль',
    en: 'Password',
    ge: 'პაროლი',
  },
  'auth.name': {
    ru: 'Имя',
    en: 'Name',
    ge: 'სახელი',
  },
  'auth.continue_with': {
    ru: 'Продолжить с',
    en: 'Continue with',
    ge: 'გაგრძელება',
  },
  'auth.google': {
    ru: 'Google',
    en: 'Google',
    ge: 'Google',
  },
  'auth.facebook': {
    ru: 'Facebook',
    en: 'Facebook',
    ge: 'Facebook',
  },
  'auth.no_account': {
    ru: 'Нет аккаунта?',
    en: "Don't have an account?",
    ge: 'არ გაქვთ ანგარიში?',
  },

  'auth.already_account': {
    ru: 'Уже есть аккаунт?',
    en: 'Already have an account?',
    ge: 'უკვე გაქვთ ანგარიში?',
  },
  'auth.forgot_password': {
    ru: 'Забыли пароль?',
    en: 'Forgot password?',
    ge: 'დაგავიწყდათ პაროლი?',
  },
  'auth.or': {
    ru: 'или',
    en: 'or',
    ge: 'ან',
  },
  'auth.profile': {
    ru: 'Профиль',
    en: 'Profile',
    ge: 'პროფილი',
  },
  'auth.welcome': {
    ru: 'Добро пожаловать',
    en: 'Welcome',
    ge: 'მოგესალმებით',
  },

  // Authentication additional translations
  'auth.login_success': {
    ru: 'Вы успешно вошли в систему',
    en: 'You have successfully logged in',
    ge: 'თქვენ წარმატებით შეხვედით სისტემაში',
  },
  'auth.logout_success': {
    ru: 'Вы успешно вышли из системы',
    en: 'You have successfully logged out',
    ge: 'თქვენ წარმატებით გამოხვედით სისტემიდან',
  },
  'auth.signup_success': {
    ru: 'Регистрация успешна',
    en: 'Registration successful',
    ge: 'რეგისტრაცია წარმატებულია',
  },
  'auth.login_failed': {
    ru: 'Ошибка входа. Проверьте email и пароль.',
    en: 'Login failed. Please check your email and password.',
    ge: 'ავტორიზაცია ვერ მოხერხდა. გთხოვთ შეამოწმოთ ელ. ფოსტა და პაროლი.',
  },

  'checkout.login_with_google': {
    ru: 'Войти с Google',
    en: 'Sign in with Google',
    ge: 'შესვლა Google-ით',
  },
  'auth.signup_failed': {
    ru: 'Ошибка регистрации',
    en: 'Registration failed',
    ge: 'რეგისტრაცია ვერ მოხერხდა',
  },
  'auth.error': {
    ru: 'Ошибка',
    en: 'Error',
    ge: 'შეცდომა',
  },
  'auth.goodbye': {
    ru: 'До свидания',
    en: 'Goodbye',
    ge: 'ნახვამდის',
  },

  // Reviews additional translations
  'reviews.login_required': {
    ru: 'Для оставления отзыва необходимо войти в систему',
    en: 'Login required to leave a review',
    ge: 'მიმოხილვის დასატოვებლად საჭიროა სისტემაში შესვლა',
  },

  // About page translations
  'about.title': {
    ru: 'О нас',
    en: 'About',
    ge: 'ჩვენს შესახებ',
  },
  'about.intro': {
    ru: 'NEKO — это не просто магазин. Это место, где каждое изделие рождено в заботливых и талантливых золотых руках. Здесь нет конвейеров. Нет банальности. Только душа, стиль и ручная магия.',
    en: 'NEKO is not just a store. It is a place where every item is born in the caring and talented golden hands. No assembly lines. No banality. Just soul, style, and handmade magic.',
    ge: 'NEKO მხოლოდ მაღაზია არ არის. ეს ადგილია, სადაც ყოველი ნივთი იბადება ზრუნვისა და ნიჭიერი ოქროს ხელების მიერ. აქ არ არის კონვეიერები. არ არის ბანალურობა. მხოლოდ სული, სტილი და ხელნაკეთი მაგია.',
  },
  'about.quote': {
    ru: 'Мы не следим за модой. Мы сами её рожаем.',
    en: 'We do not follow fashion. We give birth to it ourselves.',
    ge: 'ჩვენ მოდას არ მივყვებით. ჩვენ თვითონ ვშობთ მას.',
  },
  'about.philosophy_title': {
    ru: 'Наша философия',
    en: 'Our Philosophy',
    ge: 'ჩვენი ფილოსოფია',
  },
  'about.philosophy_text': {
    ru: 'Каждый товар в NEKO — это вызов обыденности. Это вещь с характером, с эмоцией и с историей. Мы создаём для тех, кто ценит настоящее и хочет выделяться не криками, а аурой.',
    en: 'Every item at NEKO is a challenge to the ordinary. It is a thing with character, emotion, and a story. We create for those who value authenticity and want to stand out not with screams, but with an aura.',
    ge: 'NEKO-ში ყოველი ნივთი გამოწვევაა ყოველდღიურობისთვის. ეს არის ნივთი ხასიათით, ემოციებით და ისტორიით. ჩვენ ვქმნით მათთვის, ვინც აფასებს ნამდვილს და სურს გამორჩეულობა არა ყვირილით, არამედ აურით.',
  },
  'about.craftsmanship_title': {
    ru: 'Ручная магия',
    en: 'Handmade Magic',
    ge: 'ხელნაკეთი მაგია',
  },
  'about.craftsmanship_text': {
    ru: 'Всё, что ты найдёшь у нас — сделано вручную. Наши мастера не просто работают — они импровизируют. В ход идет любой материал который попадется им в лапы, металл, ткань и даже странные штуки, которые превращаются в офигенные артефакты. Главное — чтобы вещь была живая.',
    en: 'Everything you find here is handmade. Our masters do not just work—they improvise. Any material that comes into their hands is used: metal, fabric, and even strange things that turn into amazing artifacts. The main thing is that the item should be alive.',
    ge: 'ყველაფერი, რასაც აქ იპოვით, ხელნაკეთია. ჩვენი ოსტატები უბრალოდ არ მუშაობენ - ისინი იმპროვიზირებენ. ნებისმიერი მასალა, რაც მათ ხელში მოხვდება, გამოიყენება: ლითონი, ქსოვილი და უცნაური ნივთებიც კი, რომლებიც საოცარ არტეფაქტებად იქცევიან. მთავარია, რომ ნივთი იყოს ცოცხალი.',
  },
  'about.join_title': {
    ru: 'Присоединяйся к NEKO-движению',
    en: 'Join the NEKO Movement',
    ge: 'შეუერთდი NEKO მოძრაობას',
  },
  'about.join_text': {
    ru: 'Покупая у нас — ты не просто берёшь вещь. Ты носишь часть идеи. Ты становишься частью стаи. Становишься тем, кто ценит уникальность, нежность к деталям и магию ручной работы.',
    en: 'When you buy from us, you are not just taking an item. You are carrying a piece of an idea. You become part of the pack. You become someone who values uniqueness, attention to detail, and the magic of handmade.',
    ge: 'როდესაც ჩვენგან ყიდულობ, შენ მხოლოდ ნივთს არ იღებ. შენ იდეის ნაწილს ატარებ. შენ ხდები ჯგუფის ნაწილი. ხდები ის, ვინც აფასებს უნიკალურობას, დეტალებისადმი ზრუნვას და ხელნაკეთი ნივთის მაგიას.',
  },
  'about.closing': {
    ru: 'NEKO SHOP это не просто магазин, это магазин моей принцессы для продажы ее самоделок золотыми лапками, горжусь тобой моя ведьмочка <3',
    en: 'NEKO SHOP is not just a shop, it\'s my princess\'s shop for selling her handmade creations with golden paws, I\'m proud of you my little witch <3',
    ge: 'NEKO SHOP არ არის უბრალოდ მაღაზია, ეს არის ჩემი პრინცესის მაღაზია მისი ხელნაკეთი ნივთების გასაყიდად ოქროსხელებით აწყობილი, ვამაყობ შენით ჩემო პატარა witch<3',
  },

  // FAQ translations
  'faq.title': {
    ru: 'Часто задаваемые вопросы',
    en: 'Frequently Asked Questions',
    ge: 'ხშირად დასმული კითხვები'
  },
  'faq.subtitle': {
    ru: 'Здесь вы найдёте ответы на самые популярные вопросы',
    en: 'Find answers to the most common questions',
    ge: 'იპოვეთ პასუხები ყველაზე გავრცელებულ კითხვებზე'
  },
  'faq.q1.question': {
    ru: 'Эти изделия делаются вручную?',
    en: 'Are these items handmade?',
    ge: 'ეს ნივთები ხელნაკეთია?'
  },
  'faq.q1.answer': {
    ru: 'Да! Мы собираем все украшения вручную!',
    en: 'Yes! We make all our jewelry by hand!',
    ge: 'დიახ! ჩვენ ყველა სამკაულს ხელით ვქმნით!'
  },
  'faq.q2.question': {
    ru: 'Какие материалы вы используете?',
    en: 'What materials do you use?',
    ge: 'რა მასალებს იყენებთ?'
  },
  'faq.q2.answer': {
    ru: 'Любые, которые нам попадаются под руку! От кожи до меди и т.д.',
    en: 'Whatever we can get our hands on! From leather to copper and more.',
    ge: 'ყველაფერი, რაც ხელთ გვხვდება! ტყავიდან სპილენძამდე და ა.შ.'
  },
  'faq.q3.question': {
    ru: 'Сколько времени занимает доставка?',
    en: 'How long does delivery take?',
    ge: 'რამდენი ხანი სჭირდება მიტანას?'
  },
  'faq.q3.answer': {
    ru: 'От 1 до 5 дней в зависимости от нагрузки. Мы сообщим вам по номеру телефона заранее - перед тем как курьер выйдет доставлять ваш заказ.',
    en: 'From 1 to 5 days depending on the workload. We will notify you by phone in advance - before the courier goes out to deliver your order.',
    ge: '1-დან 5 დღემდე დამოკიდებულია დატვირთვაზე. ჩვენ წინასწარ გაცნობებთ ტელეფონზე - სანამ კურიერი გამოვა თქვენი შეკვეთის მიტანისთვის.'
  },
  'faq.q4.question': {
    ru: 'Можно ли продавать свои самоделки на вашем сайте?',
    en: 'Can I sell my handmade items on your website?',
    ge: 'შემიძლია ჩემი ხელნაკეთი ნივთები თქვენს საიტზე გავყიდო?'
  },
  'faq.q4.answer': {
    ru: 'Всё возможно, не проверишь и не узнаешь! Свяжитесь с нами в разделе: Contact Us',
    en: 'Everything is possible, you never know until you try! Contact us in the Contact Us section',
    ge: 'ყველაფერი შესაძლებელია, ვერ გაიგებ, სანამ არ სცდი! დაგვიკავშირდით გვერდზე: Contact Us'
  },
  'faq.q5.question': {
    ru: 'Почему ваши товары лишь в единичных экземплярах?',
    en: 'Why are your items only available in single quantities?',
    ge: 'რატომ არის თქვენი ნივთები მხოლოდ ერთეულებში?'
  },
  'faq.q5.answer': {
    ru: 'Потому что мы создаём всё, используя воображение и немного магии (хе-хе) и импровизацию!',
    en: 'Because we create everything using imagination and a bit of magic (hehe) and improvisation!',
    ge: 'იმიტომ, რომ ჩვენ ყველაფერს ვქმნით ფანტაზიის, ცოტაოდენი მაგიის ( ჰე-ჰე ) და იმპროვიზაციის გამოყენებით!'
  },
  'faq.needHelp': {
    ru: 'Остались вопросы? Мы с радостью поможем!',
    en: 'Still have questions? We\'re happy to help!',
    ge: 'კიდევ გაქვთ შეკითხვები? სიამოვნებით დაგეხმარებით!'
  },
  'faq.contactUs': {
    ru: 'Связаться с нами',
    en: 'Contact Us',
    ge: 'დაგვიკავშირდით'
  },

  // Contact page translations
  'contact.title': {
    ru: 'Связаться',
    en: 'Contact',
    ge: 'დაკავშირება',
  },
  'contact.us': {
    ru: 'с нами',
    en: 'Us',
    ge: 'ჩვენთან',
  },
  'contact.get_in_touch': {
    ru: 'Давайте поговорим!',
    en: "Let's Talk!",
    ge: 'მოდით ვისაუბროთ!',
  },
  'contact.questions': {
    ru: 'Есть желание поговорить о сотрудничестве? Или у вас есть вопросы? Свяжитесь с нами, и мы обязательно поможем вам реализовать ваши идеи!',
    en: "Interested in collaboration? Or maybe you have questions? Get in touch with us, and we'll help you bring your ideas to life!",
    ge: 'დაინტერესებული ხართ თანამშრომლობით? ან იქნებ გაქვთ შეკითხვები? დაგვიკავშირდით და დაგეხმარებით თქვენი იდეების რეალიზებაში!',
  },
  'contact.collaboration': {
    ru: 'Если вы заинтересованы в сотрудничестве, партнерстве или у вас есть специальный запрос - наша команда с радостью обсудит с вами все детали. Мы открыты к предложениям о коллаборациях, оптовым заказам и другим формам сотрудничества. Свяжитесь с нами удобным способом:',
    en: 'If you are interested in collaboration, partnership, or have a special request - our team will be happy to discuss all the details with you. We are open to collaboration proposals, wholesale orders, and other forms of cooperation. Contact us in any convenient way:',
    ge: 'თუ გაინტერესებთ თანამშრომლობა, პარტნიორობა ან გაქვთ სპეციალური მოთხოვნა - ჩვენი გუნდი სიამოვნებით გაგიზიარებთ ყველა დეტალს. ჩვენ ვართ ღია თანამშრომლობის წინადადებებისთვის, საბითუმო შეკვეთებისთვის და თანამშრომლობის სხვა ფორმებისთვის. დაგვიკავშირდით ნებისმიერი მოსახერხებელი გზით:',
  },
  'contact.telegram': {
    ru: 'Телеграм:',
    en: 'Telegram:',
    ge: 'ტელეგრამი:',
  },
  'contact.telegram_username': {
    ru: '@not_even_here',
    en: '@not_even_here',
    ge: '@not_even_here',
  },
  'contact.email_address': {
    ru: 'grge339@gmail.com',
    en: 'grge339@gmail.com',
    ge: 'grge339@gmail.com',
  },
  'contact.submit': {
    ru: 'Отправить сообщение',
    en: 'Send Message',
    ge: 'შეტყობინების გაგზავნა',
  },
  'contact.social_media': {
    ru: 'Социальные сети',
    en: 'Social Media',
    ge: 'სოციალური ქსელები',
  },
  'contact.first_name': {
    ru: 'Имя',
    en: 'First Name',
    ge: 'სახელი',
  },
  'contact.last_name': {
    ru: 'Фамилия',
    en: 'Last Name',
    ge: 'გვარი',
  },
  'contact.email': {
    ru: 'Электронная почта',
    en: 'Email Address',
    ge: 'ელ.ფოსტა',
  },
  'contact.message': {
    ru: 'Сообщение',
    en: 'Message',
    ge: 'შეტყობინება',
  },
  'contact.first_name_placeholder': {
    ru: 'Введите ваше имя',
    en: 'Enter your first name',
    ge: 'შეიყვანეთ თქვენი სახელი',
  },
  'contact.last_name_placeholder': {
    ru: 'Введите вашу фамилию',
    en: 'Enter your last name',
    ge: 'შეიყვანეთ თქვენი გვარი',
  },
  'contact.email_placeholder': {
    ru: 'example@email.com',
    en: 'example@email.com',
    ge: 'example@email.com',
  },
  'contact.message_placeholder': {
    ru: 'Чем мы можем помочь?',
    en: 'How can we help you?',
    ge: 'როგორ შეგვიძლია დაგეხმაროთ?',
  },
  'contact.send_message': {
    ru: 'Отправить сообщение',
    en: 'Send Message',
    ge: 'შეტყობინების გაგზავნა',
  },
  'contact.message_sent': {
    ru: 'Сообщение отправлено',
    en: 'Message sent',
    ge: 'შეტყობინება გაგზავნილია',
  },
  'contact.message_received': {
    ru: 'Мы получили ваше сообщение и скоро ответим!',
    en: 'We have received your message and will respond soon!',
    ge: 'ჩვენ მივიღეთ თქვენი შეტყობინება და მალე გიპასუხებთ!',
  },
  'contact.sending': {
    ru: 'Отправка...',
    en: 'Sending...',
    ge: 'იგზავნება...',
  },
  'contact.error': {
    ru: 'Ошибка',
    en: 'Error',
    ge: 'შეცდომა',
  },
  'contact.error_message': {
    ru: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз позже.',
    en: 'There was an error sending your message. Please try again later.',
    ge: 'შეცდომა გაგზავნისას. გთხოვთ, სცადოთ მოგვიანებით.',
  },
  'contact.error_name_required': {
    ru: 'Пожалуйста, введите ваше имя',
    en: 'Please enter your name',
    ge: 'გთხოვთ შეიყვანოთ თქვენი სახელი',
  },
  'contact.error_email_invalid': {
    ru: 'Пожалуйста, введите корректный email адрес',
    en: 'Please enter a valid email address',
    ge: 'გთხოვთ შეიყვანოთ სწორი ელექტრონული ფოსტის მისამართი',
  },
  'contact.error_message_required': {
    ru: 'Пожалуйста, введите ваше сообщение',
    en: 'Please enter your message',
    ge: 'გთხოვთ შეიყვანოთ თქვენი შეტყობინება',
  },
  'contact.error_configuration': {
    ru: 'Ошибка конфигурации сервиса отправки сообщений',
    en: 'Email service configuration error',
    ge: 'ელექტრონული ფოსტის მომსახურების კონფიგურაციის შეცდომა',
  },
  'product.details.material': {
    ru: 'Материал',
    en: 'Material',
    ge: 'მასალა',
  },
  'product.details.stainless_steel': {
    ru: 'Нержавеющая сталь',
    en: 'Stainless Steel',
    ge: 'უჟანგავი ფოლადი',
  },
  'product.details.chain_length': {
    ru: 'Длина цепочки',
    en: 'Chain Length',
    ge: 'ჯაჭვის სიგრძე',
  },
  'product.details.pendant_size': {
    ru: 'Размер подвески',
    en: 'Pendant Size',
    ge: 'გულსაკიდის ზომა',
  },

  'product.details.cm': {
    ru: 'см',
    en: 'cm',
    ge: 'სმ',
  },

  // Profile page translations
  'profile.purchases': {
    ru: 'Покупки',
    en: 'Purchases',
    ge: 'შესყიდვები',
  },
  'profile.reviews': {
    ru: 'Отзывы',
    en: 'Reviews',
    ge: 'მიმოხილვები',
  },
  'profile.pending_reviews': {
    ru: 'Ожидающие отзыва',
    en: 'Pending Reviews',
    ge: 'მოლოდინში მიმოხილვები',
  },
  'profile.purchase_history': {
    ru: 'История покупок',
    en: 'Purchase History',
    ge: 'შესყიდვების ისტორია',
  },
  'profile.recent_purchases': {
    ru: 'Ваши последние покупки',
    en: 'Your recent purchases',
    ge: 'თქვენი ბოლო შესყიდვები',
  },
  'profile.my_reviews': {
    ru: 'Мои отзывы',
    en: 'My Reviews',
    ge: 'ჩემი მიმოხილვები',
  },
  'profile.reviews_description': {
    ru: 'Отзывы, которые вы оставили о товарах',
    en: 'Reviews you have left for products',
    ge: 'მიმოხილვები, რომლებიც დატოვეთ პროდუქტებზე',
  },
  'profile.no_purchases': {
    ru: 'У вас пока нет покупок',
    en: 'You have no purchases yet',
    ge: 'თქვენ ჯერ არ გაქვთ შესყიდვები',
  },
  'profile.no_reviews': {
    ru: 'Вы еще не оставили отзывов',
    en: "You haven't left any reviews yet",
    ge: 'თქვენ ჯერ არ დაგიტოვებიათ მიმოხილვები',
  },
  'profile.view_product': {
    ru: 'Посмотреть товар',
    en: 'View Product',
    ge: 'პროდუქტის ნახვა',
  },
  'profile.no_pending_reviews': {
    ru: 'Нет товаров, ожидающих отзыва',
    en: 'No products awaiting review',
    ge: 'არ არის პროდუქტები მიმოხილვის მოლოდინში',
  },
  language: {
    ru: 'ru',
    en: 'en',
    ge: 'ge',
  },
  'profile.address': {
    ru: 'Адрес',
    en: 'Address',
    ge: 'მისამართი',
  },
  'profile.address_description': {
    ru: 'Укажите адрес проживания и номер телефона для доставки',
    en: 'Enter your address and phone number for delivery',
    ge: 'შეიყვანეთ მისამართი და ტელეფონის ნომერი მიწოდებისთვის',
  },
  'profile.city': {
    ru: 'Город',
    en: 'City',
    ge: 'ქალაქი',
  },
  'profile.tbilisi': {
    ru: 'Тбилиси',
    en: 'Tbilisi',
    ge: 'თბილისი',
  },
  'profile.only_tbilisi': {
    ru: 'Мы пока что доставляем лишь по Тбилиси',
    en: 'We currently deliver only in Tbilisi',
    ge: 'ამჟამად ვაწვდით მხოლოდ თბილისში',
  },
  'profile.address_field': {
    ru: 'Адрес проживания',
    en: 'Address',
    ge: 'საცხოვრებელი მისამართი',
  },
  'profile.address_placeholder': {
    ru: 'Улица, дом, квартира',
    en: 'Street, house, apartment',
    ge: 'ქუჩა, სახლი, ბინა',
  },
  'profile.phone': {
    ru: 'Телефон',
    en: 'Phone',
    ge: 'ტელეფონი',
  },
  'profile.phone_placeholder': {
    ru: 'Ваш номер телефона',
    en: 'Your phone number',
    ge: 'თქვენი ტელეფონის ნომერი',
  },
  'profile.save': {
    ru: 'Сохранить',
    en: 'Save',
    ge: 'შენახვა',
  },
  'profile.saved': {
    ru: 'Сохранено!',
    en: 'Saved!',
    ge: 'შენახულია!',
  },
  'profile.edit': {
    ru: 'Изменить',
    en: 'Edit',
    ge: 'რედაქტირება',
  },
  'custom_order.title': {
    ru: 'Заказать свой дизайн',
    en: 'Custom Design Order',
    ge: 'ინდივიდუალური დიზაინის შეკვეთა',
  },
  'custom_order.description': {
    ru: 'Если у вас есть пример товара, который вы хотите реализовать, пришлите нам его фото или ссылку через любую удобную для вас социальную сеть.',
    en: "If you have an example of a product you'd like to create, send us its photo or link through any social network that works best for you.",
    ge: 'თუ გაქვთ პროდუქტის ნიმუში, რომელიც გსურთ შექმნათ, გამოგვიგზავნეთ მისი ფოტო ან ბმული ნებისმიერი სოციალური ქსელით.',
  },
  'custom_order.social_links': {
    ru: 'Связаться с нами',
    en: 'Contact us',
    ge: 'დაგვიკავშირდით',
  },
  'custom_order.button': {
    ru: 'Заказать свой дизайн',
    en: 'Custom Order',
    ge: 'ინდივიდუალური შეკვეთა',
  },

  'home.search_placeholder': {
    ru: 'Поиск по товарам...',
    en: 'Search products...',
    ge: 'პროდუქტების ძიება...',
  },
  'shop.search_title': {
    ru: 'Ищешь что-то конкретное?',
    en: 'Looking for something? ',
    ge: 'რამე კონკრეტულს ეძებთ?',
  },
  'shop.custom_design_title': {
    ru: 'Хочешь заказать свой дизайн?',
    en: 'Want to order your own design?',
    ge: 'გინდათ თქვენი დიზაინის შეკვეთა?',
  },
  'shop.custom_design_button': {
    ru: 'ТОГДА ЖМИ СЮДА!',
    en: 'THEN CLICK HERE!',
    ge: 'მაშინ დააჭირეთ აქ!',
  },
  'footer.shop': {
    ru: 'Магазин',
    en: 'Shop',
    ge: 'მაღაზია',
  },
  'footer.alternative_jewelry': {
    ru: 'Альтернативные украшения для тех, кто бросает вызов нормам и принимает анархию.',
    en: 'Alternative jewelry for those who defy norms and embrace anarchy.',
    ge: 'ალტერნატივა მათთვის, ვინც უარყოფს ნორმებს და აწვება თავის გზას.',
  },
  'reviews.testimonials': {
    ru: 'Отзывы',
    en: 'Testimonials',
    ge: 'მიმოხილვები',
  },
  'most_popular': {
    ru: 'САМЫЙ ПОПУЛЯРНЫЙ',
    en: 'MOST POPULAR',
    ge: 'ყველაზე პოპულარული',
  },
  'profile.fill_address_warning': {
    ru: 'Пожалуйста, заполните адрес проживания и номер телефона в профиле.',
    en: 'Please fill in your address and phone number in your profile.',
    ge: 'გთხოვთ შეავსოთ თქვენი მისამართი და ტელეფონის ნომერი პროფილში.',
  },
  'checkout.optional': {
    ru: 'Необязательно',
    en: 'Optional',
    ge: 'არასავალდებულო',
  },
  'checkout.comment': {
    ru: 'Комментарий к заказу',
    en: 'Order Comment',
    ge: 'შეკვეთის კომენტარი',
  },
  'checkout.comment_placeholder': {
    ru: 'Дополнительная информация для доставки',
    en: 'Additional delivery information',
    ge: 'დამატებითი ინფორმაცია მიტანისთვის',
  },
  'checkout.title': {
    ru: 'Оформление заказа',
    en: 'Checkout',
    ge: 'შეკვეთის გაფორმება',
  },
  'checkout.subtitle': {
    ru: 'Пожалуйста, заполните форму ниже, чтобы завершить заказ',
    en: 'Please fill out the form below to complete your order',
    ge: 'გთხოვთ შეავსოთ ფორმა შეკვეთის დასასრულებლად',
  },
  'checkout.delivery_info': {
    ru: 'Информация о доставке',
    en: 'Delivery Information',
    ge: 'მიტანის ინფორმაცია',
  },
  'checkout.name': {
    ru: 'Имя',
    en: 'Name',
    ge: 'სახელი',
  },
  'checkout.name_placeholder': {
    ru: 'Введите ваше имя',
    en: 'Enter your name',
    ge: 'შეიყვანეთ თქვენი სახელი',
  },
  'checkout.email': {
    ru: 'Email',
    en: 'Email',
    ge: 'იმეილი',
  },
  'checkout.email_placeholder': {
    ru: 'example@email.com',
    en: 'example@email.com',
    ge: 'example@email.com',
  },
  'checkout.phone': {
    ru: 'Телефон',
    en: 'Phone',
    ge: 'ტელეფონი',
  },
  'checkout.phone_placeholder': {
    ru: 'Введите номер телефона',
    en: 'Enter phone number',
    ge: 'შეიყვანეთ ტელეფონის ნომერი',
  },
  'checkout.city': {
    ru: 'Город',
    en: 'City',
    ge: 'ქალაქი',
  },
  'checkout.district': {
    ru: 'Район',
    en: 'District',
    ge: 'უბანი',
  },
  'checkout.district_placeholder': {
    ru: 'Выберите район',
    en: 'Select district',
    ge: 'აირჩიეთ უბანი',
  },
  'checkout.building': {
    ru: 'Дом',
    en: 'Building',
    ge: 'სახლი',
  },
  'checkout.building_placeholder': {
    ru: 'Номер дома',
    en: 'Building number',
    ge: 'სახლის ნომერი',
  },
  'checkout.floor': {
    ru: 'Этаж',
    en: 'Floor',
    ge: 'სართული',
  },
  'checkout.floor_placeholder': {
    ru: 'Номер этажа',
    en: 'Floor number',
    ge: 'სართულის ნომერი',
  },
  'checkout.apartment': {
    ru: 'Квартира',
    en: 'Apartment',
    ge: 'ბინა',
  },
  'checkout.apartment_placeholder': {
    ru: 'Номер квартиры',
    en: 'Apartment number',
    ge: 'ბინის ნომერი',
  },
  'checkout.address': {
    ru: 'Адрес',
    en: 'Address',
    ge: 'მისამართი',
  },
      ru: 'Улица и номер дома',
      en: 'Street and building number',
      ge: 'ქუჩა და სახლის ნომერი',
    },
    'comment': {
      ru: 'Комментарий',
      en: 'Comment',
      ge: 'კომენტარი',
    },
    'optional': {
    optional: {
      ru: 'необязательно',
      en: 'optional',
      ge: 'არასავალდებულო',
    },
    processing: {
      ru: 'Обработка...',
      en: 'Processing...',
      ge: 'მუშავდება...',
    },

  common: {
    close: {
      ru: 'Закрыть',
      en: 'Close',
      ge: 'დახურვა',
    },
    back_to_home: {
      ru: 'Вернуться на главную',
      en: 'Back to Home',
      ge: 'მთავარზე დაბრუნება',
    },
  },
  auth: {
    sign_in_with_google: {
      ru: 'Войти с Google',
      en: 'Sign in with Google',
      ge: 'შესვლა Google-ით',
    },
  },
    city: {
      ru: 'Город',
      en: 'City',
      ge: 'ქალაქი',
    },
    only_tbilisi: {
      ru: 'В настоящее время доставка доступна только по Тбилиси',
      en: 'Currently, delivery is only available in Tbilisi',
      ge: 'ამჟამად მიტანა ხელმისაწვდომია მხოლოდ თბილისში',
    },
    district: {
      ru: 'Район',
      en: 'District',
      ge: 'უბანი',
    },
    building: {
      ru: 'Здание',
      en: 'Building',
      ge: 'შენობა',
    },
    floor: {
      ru: 'Этаж',
      en: 'Floor',
      ge: 'სართული',
    },
    apartment: {
      ru: 'Квартира',
      en: 'Apartment',
      ge: 'ბინა',
    },
    required_field: {
      ru: 'Обязательное поле',
      en: 'Required field',
      ge: 'სავალდებულო ველი',
    },
    select_city: {
      ru: 'Выберите город',
      en: 'Select city',
      ge: 'აირჩიეთ ქალაქი',
    },
  'purchase_messages': [
    '🎯 Quest completed: [Purchase successful].',
    '🔓 Unlocked: New equipment item.',
    '🗃️ Added to inventory. Use wisely.',
    '🧩 You found hidden loot. Not everyone gets this far.',
    '🎲 The odds were in your favor. Epic drop!',
    '👣 You chose the path. This item is now part of your story.',
    '⚗️ Crafted something worthy. Let\'s test it in battle.',
    '🛠️ Your build is looking serious now.',
    '👁️ You saw potential where others passed by.',
    '🕹️ Equipment slot filled. Time to take the next step.',
    '💾 Progress saved. No turning back now.',
    '💣 This is not just an item — it\'s your advantage.',
    '👑 Purchase confirmed. Prestige +1.',
    '📡 Signal received. Artifact en route to your world.',
    '⚔️ Combat rating increased. You\'re ready for the next wave.',
    '🎮 Item received. Rarity: Unique.',
    '📦 You unlocked a new ally.',
    '⚙️ You activated an artifact. Now to figure out what it does.',
    '🛡️ This is not just gear. It\'s a buff to your style.',
    '🔥 Inventory updated. Someone just got stronger.',
    '🕶️ Stylish. Dangerous. Yours.',
    '💬 NPCs are jealous. You\'re the main character now.',
    '🌌 You pulled an artifact from another reality. Must-have.',
    '🧠 +10 to charisma. The rest will follow.',
    '🚀 You didn\'t just choose a product. You chose an upgrade.',
    '🔮 Item bound to owner. No returns.',
    '🎮 Loot secured. Mission accomplished.',
    '📖 A new chapter begins with this purchase.',
    '⚡ You received ⚡ buff: Confidence +25%',
    '🛰️ Your signal received. Delivery launched from the stratosphere.',
    '🧤 The power is in the details. And you\'ve got it all.',
    '🪙 You spent coins. Got a legend.',
    '🚫 You\'re no longer the one who watched. You\'re the one who chose.',
    '🗡️ Something ominously good in your inventory.',
    '🎯 You never miss. And this choice is no exception.',
    '📡 Interdimensional delivery activated. Prepare your slot.',
    '🎖️ Achievement unlocked: Good taste.',
    '🕳️ You looked into the black box... and took the best.',
    '🎁 You didn\'t just order. You summoned this.',
    '👤 They\'ll be asking: where did you get that?'
  ],
    name: {
      ru: 'Имя',
      en: 'Name',
      ge: 'სახელი',
    },
    email: {
      ru: 'Электронная почта',
      en: 'Email',
      ge: 'ელ. ფოსტა',
    },
    phone: {
      ru: 'Телефон',
      en: 'Phone',
      ge: 'ტელეფონი',
    },
    address: {
      ru: 'Адрес доставки',
      en: 'Delivery Address',
      ge: 'მიტანის მისამართი',
    },
    order_summary: {
      ru: 'Детали заказа',
      en: 'Order Summary',
      ge: 'შეკვეთის დეტალები',
    },
    complete_order: {
      ru: 'Подтвердить заказ',
      en: 'Complete Order',
      ge: 'შეკვეთის დადასტურება',
    },
    empty_cart: {
      ru: 'Ваша корзина пуста',
      en: 'Your cart is empty',
      ge: 'თქვენი კალათა ცარიელია',
    },
    add_items: {
      ru: 'Добавьте товары в корзину, чтобы продолжить',
      en: 'Add items to your cart to continue',
      ge: 'გააგრძელეთ შესაძენად',
    },
    continue_shopping: {
      ru: 'Продолжить покупки',
      en: 'Continue Shopping',
      ge: 'შენახვის გაგრძელება',
    },
    login_required: {
      ru: 'Вход обязателен',
      en: 'Login Required',
      ge: 'ავტორიზაცია აუცილებელია',
    },
    login_prompt: {
      ru: 'Пожалуйста, войдите, чтобы продолжить оформление заказа',
      en: 'Please log in to continue with your order',
      ge: 'გთხოვთ შეხვიდეთ ანგარიშზე შეკვეთის გასაგრძელებლად',
    },
  },
  'auth.sign_in_with_google': {
    ru: 'Войти с Google',
    en: 'Sign in with Google',
    ge: 'შესვლა Google-ით',
  },
  'common.back_to_home': {
    ru: 'Вернуться на главную',
    en: 'Back to Home',
    ge: 'მთავარზე დაბრუნება',
  },
  'profile.go_to_address': {
    ru: 'Заполнить',
    en: 'Fill in',
    ge: 'შეავსეთ',
  },
  'footer.terms': {
    ru: 'Условия и положения',
    en: 'Terms and Conditions',
    ge: 'წესები და პირობები',
  },
  'categories.handmade': {
    ru: 'САМОДЕЛЬНЫЕ',
    en: 'HANDMADE',
    ge: 'ხელნაკეთი',
  },
  'categories.other': {
    ru: 'ДРУГОЕ',
    en: 'OTHER',
    ge: 'სხვა',
  },

  'cart.decrease_quantity': {
    ru: 'Уменьшить количество',
    en: 'Decrease quantity',
    ge: 'რაოდენობის შემცირება',
  },
  'cart.increase_quantity': {
    ru: 'Увеличить количество',
    en: 'Increase quantity',
    ge: 'რაოდენობის გაზრდა',
  },

  'cart.delivery': {
    ru: 'Доставка',
    en: 'Delivery',
    ge: 'მიტანა',
  },
  'cart.success': {
    ru: 'Заказ оформлен успешно!',
    en: 'Order placed successfully!',
    ge: 'შეკვეთა წარმატებით დასრულდა!',
  },
  'product.items': {
    ru: 'шт',
    en: 'pcs',
    ge: 'ც',
  },
  'product.our_story': {
    ru: 'История',
    en: 'Story',
    ge: 'ისტორია',
  },
  'product.no_reviews': {
    ru: 'Нет отзывов. Будьте первым, кто оставит отзыв!',
    en: 'No reviews yet. Be the first to review!',
    ge: 'ჯერ არ არის მიმოხილვები. იყავით პირველი!',
  },
  'product.image_not_available': {
    ru: 'Изображение недоступно',
    en: 'Image not available',
    ge: 'სურათი ხელმიუწვდომელია',
  },

};

// Export the translations
export default translations;
