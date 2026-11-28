import React, { createContext, useContext, useState, useEffect } from 'react';
import koTranslations from '../locales/ko.json';
import viTranslations from '../locales/vi.json';

const TRANSLATIONS = {
  ko: koTranslations,
  vi: viTranslations,
};

const LanguageContext = createContext({
  language: 'ko',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key, fallback) => fallback || key,
  isKorean: true,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('superez_language');
      return saved === 'vi' ? 'vi' : 'ko';
    } catch {
      return 'ko';
    }
  });

  const setLanguage = (newLang) => {
    const validLang = newLang === 'vi' ? 'vi' : 'ko';
    setLanguageState(validLang);
    try {
      localStorage.setItem('superez_language', validLang);
    } catch (e) {
      console.warn('LocalStorage not accessible', e);
    }
    document.documentElement.lang = validLang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'vi' : 'ko');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Translate a nested key, e.g. t('home.hero.title')
   */
  const t = (keyPath, fallback) => {
    if (!keyPath) return fallback || '';
    const dict = TRANSLATIONS[language] || TRANSLATIONS.ko;
    const parts = keyPath.split('.');
    let cur = dict;

    for (const part of parts) {
      if (cur && typeof cur === 'object' && part in cur) {
        cur = cur[part];
      } else {
        return fallback || keyPath;
      }
    }

    return typeof cur === 'string' ? cur : fallback || keyPath;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isKorean: language === 'ko',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
