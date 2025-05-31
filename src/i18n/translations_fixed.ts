import { initReactI18next } from 'react-i18next';

// Define types for translations in different languages
export type TranslationValue = {
  ru: string;
  en: string;
  ge: string;
} | {
  [key: string]: TranslationValue | {
    ru: string;
    en: string;
    ge: string;
  };
};

type NestedTranslations = {
  [key: string]: {
    ru: string;
    en: string;
    ge: string;
  };
};

export type Translations = {
  [key: string]: TranslationValue;
};

// Add all translations here
export const translations: Translations = {
  // Existing translations...
  'recently_viewed': {
    label: {
      ru: 'Недавно просмотренные',
      en: 'Recently Viewed',
      ge: 'ბოლოს ნანახი',
    },
    you_looked: {
      ru: 'Вы заглядывались 👀',
      en: 'You were looking 👀',
      ge: 'შენ ნანახი გაქვს 👀',
    },
    you_might_like: {
      ru: 'Возможно, вы искали это?',
      en: 'You might be looking for this?',
      ge: 'შეიძლება ეძებდი ამას?',
    },
    dont_lose_it: {
      ru: 'Не потеряй то, что понравилось',
      en: 'Don\'t lose what you liked',
      ge: 'არ დაკარგო რაც მოგეწონა',
    },
    view_all: {
      ru: 'Смотреть все',
      en: 'View all',
      ge: 'ყველას ნახვა',
    },
    empty_state: {
      ru: 'Вы еще ничего не смотрели!',
      en: 'You have not viewed anything yet!',
      ge: 'ჯერ არაფერი გაქვთ ნანახი!',
    },
    view_shop: {
      ru: 'Посмотреть',
      en: 'View',
      ge: 'ნახვა',
    }
  },
  // ... rest of the translations
};

export default translations;
