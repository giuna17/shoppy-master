import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import translations from '@/i18n/translations';

interface LanguageContextType {
  language: string;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => Promise<void>;
  };
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ge',
  currentLanguage: 'ge',
  setLanguage: () => {},
  t: (key: string) => key,
  i18n: {
    language: 'ge',
    changeLanguage: async () => {}
  }
});

// Key for localStorage
const LANGUAGE_STORAGE_KEY = 'shoppy_language';

// Get initial language from localStorage or use 'ge' as default
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage || 'ge';
  }
  return 'ge';
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<string>(getInitialLanguage);
  const { i18n } = useTranslation();

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
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        t,
        i18n: {
          language,
          changeLanguage: async (lng: string) => {
            setLanguage(lng);
            await i18n.changeLanguage(lng);
          },
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext };
