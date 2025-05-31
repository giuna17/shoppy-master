import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'src', 'i18n', 'translations.ts');
const content = readFileSync(filePath, 'utf8');

// Find all translation keys and their positions
const keyRegex = /(\s*)('(?:[^'\\]|\\.)*'):\s*\{/g;
const keys = [];

let match;
while ((match = keyRegex.exec(content)) !== null) {
  const key = match[2];
  const startPos = match.index + match[1].length;
  const endPos = keyRegex.lastIndex;
  
  keys.push({
    key,
    start: startPos,
    end: endPos,
    line: content.substring(0, startPos).split('\n').length
  });
}

// Find duplicates
const keyCounts = {};
const duplicates = [];

keys.forEach(item => {
  if (!keyCounts[item.key]) {
    keyCounts[item.key] = [];
  }
  keyCounts[item.key].push(item);
  
  if (keyCounts[item.key].length > 1) {
    duplicates.push(item);
  }
});

// Filter only keys that have duplicates
const duplicateKeys = Object.entries(keyCounts)
  .filter(([_, items]) => items.length > 1)
  .map(([key, items]) => ({
    key,
    count: items.length,
    locations: items.map(item => ({
      line: item.line,
      start: item.start,
      end: item.end
    }))
  }));

console.log('Found duplicate keys:');
console.log(JSON.stringify(duplicateKeys, null, 2));

// Find the actual content of the first few duplicates to help with fixing
if (duplicateKeys.length > 0) {
  console.log('\nExample duplicate content:');
  const example = duplicateKeys[0];
  const start = example.locations[0].start - 30;
  const end = example.locations[0].end + 30;
  console.log(`Content around first duplicate (${example.key}):`);
  console.log(content.substring(Math.max(0, start), Math.min(content.length, end)));
}

export {};
