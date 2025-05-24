export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}
