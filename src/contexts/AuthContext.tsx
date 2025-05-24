import React, { useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  User,
  AuthContextType,
  AuthContext,
  useAuth,
} from './AuthContext.utils';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Load user data from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    try {
      // Mock authentication - in a real app this would call a backend API
      if (password.length < 3) {
        throw new Error('Invalid password');
      }

      // Mock successful login
      const mockUser: User = {
        id: 1,
        username: email.split('@')[0],
        email: email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`,
        // Mock purchased products (would be fetched from a server in reality)
        purchasedProducts: [1, 2, 3],
      };

      setUser(mockUser);
      setIsLoggedIn(true);

      toast({
        title: t('auth.welcome'),
        description: t('auth.login_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.login_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Mock registration - in a real app this would call a backend API
      if (password.length < 3) {
        throw new Error('Password too short');
      }

      // Mock successful registration
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 2,
        username: name,
        email: email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        purchasedProducts: [],
      };

      setUser(mockUser);
      setIsLoggedIn(true);

      toast({
        title: t('auth.welcome'),
        description: t('auth.signup_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.signup_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');

    toast({
      title: t('auth.goodbye'),
      description: t('auth.logout_success'),
    });
  };

  const loginWithProvider = async (provider: string) => {
    try {
      // Mock social login - in a real app this would use the provider's SDK
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const username = `User_${provider}${Math.floor(Math.random() * 100)}`;
      const email = `user_${provider.toLowerCase()}@example.com`;

      // Mock user data from provider
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 1000, // Different ID range for social logins
        username: username,
        email: email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`,
        purchasedProducts: [],
      };

      // Special handling for different providers
      if (provider === 'google') {
        mockUser.photoURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
      } else if (provider === 'facebook') {
        mockUser.photoURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&style=circle`;
      }

      setUser(mockUser);
      setIsLoggedIn(true);

      toast({
        title: t('auth.welcome'),
        description: t('auth.login_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.social_login_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const hasUserPurchasedProduct = (productId: number): boolean => {
    if (!isLoggedIn || !user) return false;
    return user.purchasedProducts.includes(productId);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signUp,
        logout,
        loginWithProvider,
        hasUserPurchasedProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth } from './AuthContext.utils';
