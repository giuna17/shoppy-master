// Типы скидок
export type DiscountType = 'review' | 'promo' | 'seasonal';

export interface Discount {
  id: string;
  type: DiscountType;
  value: number;
  userId: string;  // Changed from number to string to match Firebase UID
  isUsed: boolean;
}

// Загрузка скидок из localStorage
const loadDiscounts = (): Discount[] => {
  const savedDiscounts = localStorage.getItem('discounts');
  return savedDiscounts ? JSON.parse(savedDiscounts) : [];
};

// Сохранение скидок в localStorage
const saveDiscounts = (discounts: Discount[]) => {
  localStorage.setItem('discounts', JSON.stringify(discounts));
};

// Инициализация скидок из хранилища
let discounts: Discount[] = loadDiscounts();

// Добавить новую скидку
export const addDiscount = (
  userId: string,
  type: DiscountType,
  value: number,
): Discount => {
  const newDiscount = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    value,
    userId,
    isUsed: false,
  };

  discounts = [...discounts, newDiscount];
  saveDiscounts(discounts);
  return newDiscount;
};

// Получить все активные скидки пользователя
export const getUserDiscounts = (userId: string): Discount[] => {
  return discounts.filter(
    (discount) => discount.userId === userId && !discount.isUsed,
  );
};

// Скидка за 5-звёздочный отзыв (одноразовая)
export const setUserDiscount = (userId: string) => {
  const existingDiscount = discounts.find(d => d.userId === userId && d.type === 'review' && !d.isUsed);
  if (!existingDiscount) {
    addDiscount(userId, 'review', 10); // 10% скидка за отзыв
  }
};

// Использовать скидку
export const useDiscount = (discountId: string) => {
  discounts = discounts.map((discount) =>
    discount.id === discountId ? { ...discount, isUsed: true } : discount,
  );
  saveDiscounts(discounts);
};

// Рассчитать общую скидку для пользователя
export const calculateTotalDiscount = (userId: string): number => {
  const userDiscounts = getUserDiscounts(userId);
  if (userDiscounts.length === 0) return 0;

  // Суммируем все скидки
  return userDiscounts.reduce((total, discount) => total + discount.value, 0);
};
