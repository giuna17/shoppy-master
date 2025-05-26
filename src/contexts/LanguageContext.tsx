// This file re-exports everything from the new structure
// to maintain backward compatibility

// Add auth context to avoid circular dependencies

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/i18n/translations.1';

// Пример контекста языка, можно доработать под ваши нужды
interface LanguageContextType {
  language: string;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  currentLanguage: 'ru',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Key for localStorage
const LANGUAGE_STORAGE_KEY = 'shoppy_language';

// Get initial language from localStorage or use 'ru' as default
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage || 'ru';
  }
  return 'ru';
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<string>(getInitialLanguage);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const t = (key: string, params?: Record<string, any>) => {
    const entry = translations[key];
    if (!entry) return key;
    let text = entry[language] || entry['ru'] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  // Expose currentLanguage as an alias for language for better semantics
  const currentLanguage = language;

  return (
    <LanguageContext.Provider
      value={{ language, currentLanguage, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext };
