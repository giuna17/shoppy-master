// Navigation
export const NAVIGATION = {
  home: 'Главная',
  shop: 'Магазин',
  about: 'О нас',
  contact: 'Контакты',
  cart: 'Корзина',
  profile: 'Профиль',
  login: 'Войти',
  logout: 'Выйти',
  signup: 'Регистрация',
};

// Authentication
export const AUTH = {
  email: 'Email',
  password: 'Пароль',
  forgot_password: 'Забыли пароль?',
  sign_in: 'Войти',
  sign_up: 'Зарегистрироваться',
  no_account: 'Нет аккаунта?',
  have_account: 'Уже есть аккаунт?',
  or_continue_with: 'Или продолжить с',
};

// Product
export const PRODUCT = {
  add_to_cart: 'В корзину',
  in_stock: 'В наличии',
  out_of_stock: 'Нет в наличии',
  quantity: 'Количество',
  price: 'Цена',
  total: 'Итого',
  remove: 'Удалить',
  continue_shopping: 'Продолжить покупки',
  proceed_to_checkout: 'Оформить заказ',
  your_cart: 'Ваша корзина',
  cart_empty: 'Ваша корзина пуста',
  cart_total: 'Итого к оплате',
  discount: 'Скидка',
  apply: 'Применить',
  promo_code: 'Промокод',
};

// Categories
export const CATEGORIES = {
  bracelets: 'Браслеты',
  rings: 'Кольца',
  earrings: 'Серьги',
  hairpins: 'Заколки',
  candles: 'Свечи',
};

// Category translations for the t() function
export const CATEGORY = {
  bracelets: 'Браслеты',
  rings: 'Кольца',
  earrings: 'Серьги',
  hairpins: 'Заколки',
  candles: 'Свечи',
};

// Cart
export const CART = {
  item: 'товар',
  items: 'товара',
  items_plural: 'товаров',
  cart_total: 'Итого',
  clear_cart: 'Очистить корзину',
  checkout: 'Оформить заказ',
  continue_shopping: 'Продолжить покупки',
  your_cart_is_empty: 'Ваша корзина пуста',
  add_items_to_cart: 'Добавьте товары в корзину',
};

// Product Filters
export const FILTERS = {
  title: 'Фильтры',
  categories: 'Категории',
  price: 'Ценовой диапазон',
  price_range: 'Ценовой диапазон',
  sort_by: 'Сортировать по',
  new_arrivals: 'Новинки',
  price_low_high: 'Цена: по возрастанию',
  price_high_low: 'Цена: по убыванию',
  popularity: 'Популярные',
  reset: 'Сбросить',
  apply: 'Применить',
  show: 'Показать',
  hide: 'Скрыть',
  materials: 'Материалы',
  colors: 'Цвета',
  in_stock: 'В наличии',
};

// Common
export const COMMON = {
  loading: 'Загрузка...',
  error: 'Произошла ошибка',
  success: 'Успешно',
  close: 'Закрыть',
  save: 'Сохранить',
  cancel: 'Отмена',
  back: 'Назад',
  next: 'Далее',
  search: 'Поиск',
  all: 'Все',
};

// Product Details
export const PRODUCT_DETAILS = {
  description: 'Описание',
  specifications: 'Характеристики',
  reviews: 'Отзывы',
  add_review: 'Добавить отзыв',
  rating: 'Рейтинг',
  your_rating: 'Ваша оценка',
  your_review: 'Ваш отзыв',
  submit: 'Отправить',
  no_reviews: 'Пока нет отзывов',
  be_first_to_review: 'Будьте первым, кто оставит отзыв',
};

// Checkout
export const CHECKOUT = {
  checkout: 'Оформление заказа',
  shipping_address: 'Адрес доставки',
  payment_method: 'Способ оплаты',
  order_summary: 'Детали заказа',
  shipping_method: 'Способ доставки',
  billing_address: 'Платежный адрес',
  same_as_shipping: 'Такой же, как адрес доставки',
  place_order: 'Оформить заказ',
  back_to_cart: 'Вернуться в корзину',
  order_total: 'Итого к оплате',
  shipping: 'Доставка',
  tax: 'Налог',
  discount: 'Скидка',
  subtotal: 'Подытог',
  continue_to_shipping: 'Продолжить доставку',
  continue_to_payment: 'Перейти к оплате',
  return_to_information: 'Вернуться к информации',
  return_to_shipping: 'Вернуться к доставке',
  contact_information: 'Контактная информация',
  shipping_methods: 'Способы доставки',
  payment_methods: 'Способы оплаты',
  order_confirmation: 'Подтверждение заказа',
  thank_you: 'Спасибо за заказ!',
  order_number: 'Номер заказа',
  order_confirmation_email: 'Подтверждение заказа отправлено на',
  order_details: 'Детали заказа',
  track_order: 'Отследить заказ',
  continue_shopping: 'Продолжить покупки',
};

export default {
  NAVIGATION,
  AUTH,
  PRODUCT,
  CATEGORIES,
  CART,
  FILTERS,
  COMMON,
  PRODUCT_DETAILS,
  CHECKOUT,
};
