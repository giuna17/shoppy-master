import { Product } from './productService';

const STORAGE_KEY = 'favorites';

export interface FavoriteItem {
  productId: number;
  dateAdded: string;
}

export const favoritesService = {
  // Получить все избранные товары
  getFavorites(): FavoriteItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Добавить товар в избранное
  addToFavorites(productId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.some((item) => item.productId === productId)) {
      favorites.push({
        productId,
        dateAdded: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  },

  // Удалить товар из избранного
  removeFromFavorites(productId: number): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter((item) => item.productId !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // Проверить, находится ли товар в избранном
  isInFavorites(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some((item) => item.productId === productId);
  },

  // Очистить избранное
  clearFavorites(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
