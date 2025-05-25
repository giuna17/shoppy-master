import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { favoritesService, FavoriteItem } from '@/services/favoritesService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';
import { recentlyViewedService } from '@/services/recentlyViewedService';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isInFavorites: (productId: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Загружаем избранное при монтировании
  useEffect(() => {
    const loadedFavorites = favoritesService.getFavorites();
    setFavorites(loadedFavorites);
  }, []);

  const addToFavorites = (productId: number) => {
    favoritesService.addToFavorites(productId);
    setFavorites(favoritesService.getFavorites());
    
    // Update recently viewed service
    recentlyViewedService.updateFavoriteStatus(productId, true);

    toast({
      title: t('favorites.added'),
      description: t('favorites.added_description'),
      duration: 3000,
    });
  };

  const removeFromFavorites = (productId: number) => {
    favoritesService.removeFromFavorites(productId);
    setFavorites(favoritesService.getFavorites());
    
    // Update recently viewed service
    recentlyViewedService.updateFavoriteStatus(productId, false);

    toast({
      title: t('favorites.removed'),
      description: t('favorites.removed_description'),
      duration: 3000,
    });
  };

  const isInFavorites = (productId: number) => {
    return favoritesService.isInFavorites(productId);
  };

  const clearFavorites = () => {
    favoritesService.clearFavorites();
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
