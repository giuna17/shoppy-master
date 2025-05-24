// Типы скидок
export type DiscountType = 'review' | 'promo' | 'seasonal';

export interface Discount {
  id: string;
  type: DiscountType;
  value: number;
  userId: number;
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
  userId: number,
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
export const getUserDiscounts = (userId: number): Discount[] => {
  return discounts.filter(
    (discount) => discount.userId === userId && !discount.isUsed,
  );
};

// Использовать скидку
export const useDiscount = (discountId: string) => {
  discounts = discounts.map((discount) =>
    discount.id === discountId ? { ...discount, isUsed: true } : discount,
  );
  saveDiscounts(discounts);
};

// Рассчитать общую скидку для пользователя
export const calculateTotalDiscount = (userId: number): number => {
  const userDiscounts = getUserDiscounts(userId);
  if (userDiscounts.length === 0) return 0;

  // Суммируем все скидки
  return userDiscounts.reduce((total, discount) => total + discount.value, 0);
};
