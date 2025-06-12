import fs from 'fs';
import path from 'path';

type TranslationValue = 
  | { ru: string; en: string; ge: string }
  | string[]
  | string;

interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
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

// Function to flatten the nested translations object
function flattenTranslations(obj: NestedTranslations, prefix = ''): Record<string, TranslationValue> {
  return Object.keys(obj).reduce<Record<string, TranslationValue>>((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // If it's a nested object and has the language properties, keep it as is
      if ('ru' in value && 'en' in value && 'ge' in value) {
        acc[fullKey] = value;
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

// Flatten the translations
const flatTranslations = flattenTranslations(translations);

// Group translations by their key (without the last part)
const groupedTranslations: Record<string, Array<{key: string, value: TranslationValue}>> = {};

Object.entries(flatTranslations).forEach(([key, value]) => {
  const keyParts = key.split('.');
  const baseKey = keyParts.slice(0, -1).join('.');
  const lastPart = keyParts[keyParts.length - 1];
  
  if (!groupedTranslations[baseKey]) {
    groupedTranslations[baseKey] = [];
  }
  
  groupedTranslations[baseKey].push({
    key: lastPart,
    value
  });
});

// Find duplicates
const duplicates = Object.entries(groupedTranslations)
  .filter(([_, values]) => values.length > 1);

console.log(`Found ${duplicates.length} duplicate translation groups`);

// Create a new translations object without duplicates
const newTranslations: NestedTranslations = {};

// Helper function to set a nested value
function setNestedValue(obj: NestedTranslations, key: string, value: TranslationValue) {
  const keys = key.split('.');
  const lastKey = keys.pop()!;
  
  let current = obj;
  for (const k of keys) {
    if (!current[k]) {
      current[k] = {} as NestedTranslations;
    } else if (typeof current[k] !== 'object' || current[k] === null) {
      // If it's not an object, create a new object and move the existing value to a property
      const existingValue = current[k];
      current[k] = {} as NestedTranslations;
      (current[k] as NestedTranslations)['_value'] = existingValue as TranslationValue;
    }
    current = current[k] as NestedTranslations;
  }
  
  current[lastKey] = value;
}

// Add all non-duplicate translations to the new object
Object.entries(flatTranslations).forEach(([key, value]) => {
  const baseKey = key.split('.').slice(0, -1).join('.');
  
  // Only add if it's not part of a duplicate group or if it's the first occurrence
  if (!duplicates.some(([dupKey]) => dupKey === baseKey) || !groupedTranslations[baseKey]) {
    setNestedValue(newTranslations, key, value);
  } else {
    // For duplicates, only add the first occurrence
    const firstOccurrence = groupedTranslations[baseKey][0];
    if (key === `${baseKey}.${firstOccurrence.key}`) {
      console.log(`Keeping first occurrence of duplicate group: ${baseKey} (${firstOccurrence.key})`);
      setNestedValue(newTranslations, key, value);
    } else {
      console.log(`Removing duplicate: ${key}`);
    }
  }
});

// Generate the new file content
const newContent = `// Define types for translations
type TranslationValue = 
  | { ru: string; en: string; ge: string }
  | string[]
  | string;

interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
}

export type Translations = NestedTranslations;

// All translations go here
const translations: Translations = ${JSON.stringify(newTranslations, null, 2).replace(/"([^"]+)":/g, "$1:")};

// Export the translations
export default translations;`;

// Write the cleaned translations to a new file
const outputPath = path.join(__dirname, '../src/i18n/translations.clean.ts');
fs.writeFileSync(outputPath, newContent, 'utf-8');

console.log(`\nCleaned translations have been written to: ${outputPath}`);
console.log('Please review the changes and rename the file to translations.ts if everything looks good.');
console.log('A backup of the original file has been saved as translations.backup.ts');
