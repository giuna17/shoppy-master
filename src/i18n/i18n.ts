import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

// Define the structure of our translation values
interface TranslationValue {
  ru: string;
  en: string;
  ge: string;
}

// Helper function to transform our translations structure
const transformTranslations = (translations: Record<string, TranslationValue | any>) => {
  const result = {
    ru: {} as Record<string, string>,
    en: {} as Record<string, string>,
    ge: {} as Record<string, string>
  };
  
  Object.entries(translations).forEach(([key, value]) => {
    if (value && typeof value === 'object' && 'ru' in value && 'en' in value && 'ge' in value) {
      // This is a translation object with ru, en, ge properties
      const translation = value as TranslationValue;
      result.ru[key] = translation.ru;
      result.en[key] = translation.en;
      result.ge[key] = translation.ge;
    } else {
      // Handle non-translatable values (shouldn't happen in our case)
      const stringValue = String(value);
      result.ru[key] = stringValue;
      result.en[key] = stringValue;
      result.ge[key] = stringValue;
    }
  });
  
  return result;
};

const transformedTranslations = transformTranslations(translations);

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: transformedTranslations.ru
    },
    en: {
      translation: transformedTranslations.en
    },
    ge: {
      translation: transformedTranslations.ge
    }
  },
  lng: 'ge',
  fallbackLng: 'ge',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
