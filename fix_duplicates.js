import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'src', 'i18n', 'translations.ts');
let content = readFileSync(filePath, 'utf8');

// Find the first complete 'recently_viewed' section with all its translations
const recentlyViewedSection = /'recently_viewed':\s*\{[^}]*\}(?:\s*,\s*'recently_viewed\.[a-z_]+':\s*\{[^}]*\})*/g;
const matches = [...content.matchAll(recentlyViewedSection)].map(match => ({
  text: match[0],
  start: match.index,
  end: match.index + match[0].length
}));

if (matches.length > 0) {
  console.log(`Found ${matches.length} 'recently_viewed' sections`);
  
  // Keep the first instance
  const firstInstance = matches[0];
  let newContent = content.substring(0, firstInstance.end);
  
  // Remove all other instances
  for (let i = 1; i < matches.length; i++) {
    const match = matches[i];
    newContent += content.substring(matches[i-1].end, match.start);
    console.log(`Removed duplicate at position ${match.start}-${match.end}`);
  }
  
  // Add the rest of the content
  newContent += content.substring(matches[matches.length - 1].end);
  
  // Clean up any double commas or empty lines
  newContent = newContent.replace(/,\s*,/g, ',');
  newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Write the cleaned content back to the file
  writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully removed duplicate translations.');
} else {
  console.log('No duplicate translations found or error occurred.');
}
