import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');
const outputPath = path.join(__dirname, '../src/i18n/translations.clean.ts');

// Read the file
const content = fs.readFileSync(translationsPath, 'utf8');

// Extract the translations object
const startMarker = 'const translations: Translations = {';
const endMarker = '};';
const startIndex = content.indexOf(startMarker) + startMarker.length;
const endIndex = content.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find translations object in the file');
  process.exit(1);
}

const translationsContent = content.substring(startIndex, endIndex).trim();

// Split into lines and process
const lines = translationsContent.split('\n');
const seen = new Set();
const uniqueLines = [];
let currentKey = '';
let currentValue = [];
let inObject = 0;

for (const line of lines) {
  const trimmed = line.trim();
  
  // Skip empty lines and comments
  if (!trimmed || trimmed.startsWith('//')) {
    if (currentKey) {
      currentValue.push(line);
    } else {
      uniqueLines.push(line);
    }
    continue;
  }
  
  // Check if this is a key-value pair
  const keyMatch = trimmed.match(/^([a-zA-Z0-9_.']+):/);
  
  if (keyMatch) {
    const key = keyMatch[1];
    
    // If we were building a value, save it
    if (currentKey && !seen.has(currentKey)) {
      uniqueLines.push(...currentValue);
      seen.add(currentKey);
    }
    
    // Start a new key-value pair
    currentKey = key;
    currentValue = [line];
    inObject = 0;
  } else {
    // Part of a multi-line value
    if (trimmed.includes('{')) inObject++;
    if (trimmed.includes('}')) inObject--;
    
    if (currentKey) {
      currentValue.push(line);
      
      // If we've closed an object and returned to root level, finalize the current key
      if (inObject === 0 && trimmed.includes('},')) {
        if (!seen.has(currentKey)) {
          uniqueLines.push(...currentValue);
          seen.add(currentKey);
        }
        currentKey = '';
        currentValue = [];
      }
    } else {
      uniqueLines.push(line);
    }
  }
}

// Add the last key-value pair if it exists
if (currentKey && !seen.has(currentKey)) {
  uniqueLines.push(...currentValue);
}

// Reconstruct the file
const newContent = `${content.substring(0, startIndex)}
${uniqueLines.join('\n')}
${endMarker}${content.substring(endIndex + endMarker.length)}`;

// Write to the output file
fs.writeFileSync(outputPath, newContent, 'utf8');
console.log(`Cleaned translations have been written to: ${outputPath}`);
console.log('Please review the changes and rename the file to translations.ts if everything looks good.');
console.log('A backup of the original file has been saved as translations.backup.ts');
