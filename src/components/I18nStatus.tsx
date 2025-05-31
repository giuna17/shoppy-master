import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import React from 'react';

const I18nStatus = () => {
  const { t, i18n } = useTranslation('faq');
  const [status, setStatus] = useState({
    language: i18n.language,
    languages: i18n.languages,
    isInitialized: i18n.isInitialized,
    hasLoadedNamespace: i18n.hasLoadedNamespace
      ? i18n.hasLoadedNamespace('faq')
      : false,
    faqTitle: t('title', 'Заголовок не загружен'),
    faqQuestions: t('questions', 'Вопросы не загружены', {
      returnObjects: true,
    }),
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus({
        language: i18n.language,
        languages: i18n.languages,
        isInitialized: i18n.isInitialized,
        hasLoadedNamespace: i18n.hasLoadedNamespace
          ? i18n.hasLoadedNamespace('faq')
          : false,
        faqTitle: t('title', 'Заголовок не загружен'),
        faqQuestions: t('questions', 'Вопросы не загружены', {
          returnObjects: true,
        }),
      });
    };

    i18n.on('languageChanged', updateStatus);
    i18n.on('initialized', updateStatus);

    return () => {
      i18n.off('languageChanged', updateStatus);
      i18n.off('initialized', updateStatus);
    };
  }, [i18n, t]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      <h3>i18n Status</h3>
      <div>Language: {status.language}</div>
      <div>Available languages: {status.languages?.join(', ')}</div>
      <div>Initialized: {status.isInitialized ? 'Yes' : 'No'}</div>
      <div>
        FAQ Namespace Loaded: {status.hasLoadedNamespace ? 'Yes' : 'No'}
      </div>
      <div>FAQ Title: {status.faqTitle}</div>
      <div>
        FAQ Questions Loaded:{' '}
        {Array.isArray(status.faqQuestions) ? status.faqQuestions.length : 'No'}
      </div>

      <button
        onClick={() => i18n.changeLanguage('ru')}
        style={{ marginRight: '5px', marginTop: '5px' }}
      >
        RU
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        style={{ marginRight: '5px', marginTop: '5px' }}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage('ge')}
        style={{ marginTop: '5px' }}
      >
        GE
      </button>
    </div>
  );
};

export default I18nStatus;
