// Отключаем предупреждения React Router о будущих изменениях
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('React Router:')) return;
  originalConsoleWarn(...args);
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
