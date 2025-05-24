// This file re-exports everything from the new structure
// to maintain backward compatibility

// Add auth context to avoid circular dependencies

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/i18n/translations';

// Пример контекста языка, можно доработать под ваши нужды
const LanguageContext = createContext({
  language: 'ru',
  setLanguage: (lang: string) => {},
  t: (key: string, params?: Record<string, any>) => key,
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext };
