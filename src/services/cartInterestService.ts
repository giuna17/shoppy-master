interface CartInterest {
  productId: number;
  timestamp: number;
}

const INTEREST_TIMEOUT = 15 * 60 * 1000; // 15 минут в миллисекундах
const STORAGE_KEY = 'cart_interests';

// Генерируем уникальный ID для текущей сессии пользователя
const SESSION_ID = Math.random().toString(36).substring(2);

export const cartInterestService = {
  // Добавить интерес к товару
  addInterest(productId: number) {
    const interests = this.getAllInterests();
    const now = Date.now();

    // Очищаем устаревшие записи
    this.cleanExpiredInterests();

    // Добавляем новый интерес
    interests[productId] = {
      timestamp: now,
      sessionId: SESSION_ID,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
  },

  // Проверить, интересуется ли кто-то товаром (кроме текущего пользователя)
  checkInterest(productId: number): boolean {
    const interests = this.getAllInterests();
    const interest = interests[productId];

    if (!interest) return false;

    // Если это интерес текущего пользователя, возвращаем false
    if (interest.sessionId === SESSION_ID) return false;

    // Проверяем, не истек ли срок
    const now = Date.now();
    if (now - interest.timestamp > INTEREST_TIMEOUT) {
      // Если истек, удаляем запись
      delete interests[productId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
      return false;
    }

    return true;
  },

  // Удалить интерес к товару
  removeInterest(productId: number) {
    const interests = this.getAllInterests();
    const interest = interests[productId];

    // Удаляем только если это интерес текущего пользователя
    if (interest && interest.sessionId === SESSION_ID) {
      delete interests[productId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
    }
  },

  // Получить все активные интересы
  getAllInterests(): Record<number, { timestamp: number; sessionId: string }> {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  // Очистить устаревшие записи
  cleanExpiredInterests() {
    const interests = this.getAllInterests();
    const now = Date.now();
    let hasChanges = false;

    Object.entries(interests).forEach(
      ([productId, interest]: [string, CartInterest]) => {
        if (now - interest.timestamp > INTEREST_TIMEOUT) {
          delete interests[productId];
          hasChanges = true;
        }
      },
    );

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
    }
  },
};
