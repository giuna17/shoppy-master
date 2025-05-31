const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The new structure for recently_viewed
const newRecentlyViewed = `  'recently_viewed': {
    label: {
      ru: 'Недавно просмотренные',
      en: 'Recently Viewed',
      ge: 'ბოლოს ნანახი',
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
    },
  }`;

// Remove all old instances
content = content.replace(/'recently_viewed':\s*\{[^}]*\}/gs, '');
content = content.replace(/'recently_viewed\.empty_state':\s*\{[^}]*\}/g, '');
content = content.replace(/'recently_viewed\.view_shop':\s*\{[^}]*\}/g, '');

// Add the new structure at the first occurrence of 'recently_viewed'
const firstOccurrence = content.indexOf("'recently_viewed'");
if (firstOccurrence !== -1) {
  content = content.substring(0, firstOccurrence) + 
             newRecentlyViewed + 
             content.substring(firstOccurrence);
}

// Remove any duplicate empty lines
content = content.replace(/\n{3,}/g, '\n\n');

// Write the fixed content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Translations file has been updated successfully!');
