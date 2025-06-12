import fs from 'fs';
import path from 'path';

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
let translations: any;
try {
  // We need to wrap the object in parentheses to make it a valid expression
  translations = eval(`(${translationsMatch[1]})`);
} catch (error) {
  console.error('Error parsing translations:', error);
  process.exit(1);
}

// Track seen keys to remove duplicates
const seenKeys = new Set<string>();
const cleanedTranslations: Record<string, any> = {};

// Helper function to process translations recursively
function processTranslations(obj: any, currentPath: string = '') {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  // If it's a translation object (has ru, en, ge properties), keep it
  if ('ru' in obj && 'en' in obj && 'ge' in obj) {
    if (!seenKeys.has(currentPath)) {
      seenKeys.add(currentPath);
      return obj;
    }
    return undefined;
  }
  
  // Otherwise, process each property
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    const processed = processTranslations(value, newPath);
    if (processed !== undefined) {
      result[key] = processed;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

// Process the translations
const cleaned = processTranslations(translations);

// Generate the new file content
const newContent = `// This file is auto-generated. Do not edit manually.
// Run 'yarn clean:translations' to update.

type TranslationValue = {
  ru: string;
  en: string;
  ge: string;
} | string[] | string;

interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
}

type Translations = NestedTranslations;

const translations: Translations = ${JSON.stringify(cleaned, null, 2).replace(/"([^"]+)":/g, "'$1':")};

export default translations;`;

// Write the cleaned translations back to the file
fs.writeFileSync(translationsPath, newContent, 'utf-8');
console.log('Successfully cleaned translations file!');
