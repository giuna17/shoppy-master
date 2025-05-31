import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'src', 'i18n', 'translations.ts');
let content = readFileSync(filePath, 'utf8');

// List of duplicate keys to remove (keeping the first occurrence)
const duplicatesToRemove = [
  { key: 'cart.discount_10', count: 2 },
  { key: 'cart.discount_5', count: 2 },
  { key: 'product.back_to_shop', count: 2 }
];

// First, make a backup of the original file
const backupPath = filePath + '.bak';
writeFileSync(backupPath, content, 'utf8');
console.log(`Backup created at: ${backupPath}`);

// Process each duplicate key
for (const { key, count } of duplicatesToRemove) {
  console.log(`\nProcessing duplicate key: '${key}'`);
  
  // Find all occurrences of this key
  const keyRegex = new RegExp(`(\s*)('${key.replace(/\./g, '\\.')}'):\\s*\\{[^}]*\\}`, 'g');
  const matches = [];
  let match;
  
  while ((match = keyRegex.exec(content)) !== null) {
    matches.push({
      text: match[0],
      start: match.index,
      end: keyRegex.lastIndex
    });
  }
  
  if (matches.length > 1) {
    console.log(`Found ${matches.length} occurrences, will keep the first one`);
    
    // Keep the first occurrence, remove the rest
    for (let i = 1; i < matches.length; i++) {
      const m = matches[i];
      console.log(`Removing duplicate at line ${content.substring(0, m.start).split('\n').length}`);
      
      // Remove the duplicate entry and any trailing comma
      content = content.substring(0, m.start) + 
                content.substring(m.end).replace(/^\s*,?\s*/, '');
      
      // Adjust the regex lastIndex since we've modified the content
      keyRegex.lastIndex = m.start;
    }
  } else {
    console.log(`Warning: Expected ${count} occurrences but found ${matches.length} for key '${key}'`);
  }
}

// Clean up any double commas or empty lines
content = content.replace(/,\s*,/g, ',');
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

// Write the cleaned content back to the file
writeFileSync(filePath, content, 'utf8');
console.log('\nSuccessfully removed duplicate translations.');
console.log('Original file backed up at:', backupPath);

export {};
