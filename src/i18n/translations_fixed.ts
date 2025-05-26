// This is a fixed version of translations.ts with duplicate keys resolved

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const translations = {
  // First instance of product.details (keeping this one as is)
  'product.details': {
    ru: 'Детали',
    en: 'Details',
    ge: 'დეტალები',
  },
  
  // ... other translations ...
  
  // Second instance of product.details (renamed to product.details_section)
  'product.details_section': {
    ru: 'Детали',
    en: 'Details',
    ge: 'დეტალები',
  },
  
  // Rest of the translations file...
};

const resources = {
  ru: { translation: translations },
  en: { translation: translations },
  ge: { translation: translations },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
