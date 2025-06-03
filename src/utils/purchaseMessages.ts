import { useTranslation } from 'react-i18next';
import translations from '../i18n/translations';

const getPurchaseMessages = (): string[] => {
  // Fallback to English messages if translations are not available
  const messages = translations['purchase_messages'] as string[] || [
    '🎯 Quest completed: [Purchase successful].',
    '🔓 Unlocked: New equipment item.',
    '🗃️ Added to inventory. Use wisely.'
  ];
  return messages;
};

export const getRandomPurchaseMessage = (): string => {
  const messages = getPurchaseMessages();
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const showPurchaseNotification = () => {
  const message = getRandomPurchaseMessage();
  // We'll use the toast function from sonner
  return message;
};
