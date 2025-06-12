import fs from 'fs';
import path from 'path';

type TranslationObject = {
  ru: string;
  en: string;
  ge: string;
};

type TranslationValue = 
  | TranslationObject
  | string[]
  | string
  | { [key: string]: TranslationValue };

interface NestedTranslations {
  [key: string]: TranslationValue;
}

// Read the translations file
const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');
const content = fs.readFileSync(translationsPath, 'utf-8');

// Extract the translations object
const translationsMatch = content.match(/const translations: Translations = (\{[\s\S]*?\});/);
if (!translationsMatch) {
  console.error('Could not find translations object in the file');
  process.exit(1);
}

// Parse the translations object
let translations: NestedTranslations;
try {
  // We need to wrap the object in parentheses to make it a valid expression
  translations = eval(`(${translationsMatch[1]})`);
} catch (error) {
  console.error('Error parsing translations:', error);
  process.exit(1);
}

// Rest of the file remains the same...

// Function to flatten the nested translations object
function flattenTranslations(obj: NestedTranslations, prefix = ''): Record<string, TranslationValue> {
  return Object.keys(obj).reduce<Record<string, TranslationValue>>((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // If it's a translation object, keep it as is
      if ('ru' in value && 'en' in value && 'ge' in value) {
        acc[fullKey] = value as TranslationObject;
      } else {
        // Otherwise, recursively flatten it
        Object.assign(acc, flattenTranslations(value as NestedTranslations, fullKey));
      }
    } else {
      acc[fullKey] = value;
    }
    
    return acc;
  }, {});
}

// Export for testing
export { flattenTranslations, TranslationValue, NestedTranslations, TranslationObject };
