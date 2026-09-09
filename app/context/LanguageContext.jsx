'use client';
import { createContext, useContext, useState } from 'react';
import en from '../locales/english.json';
import es from '../locales/spanish.json';

const translations = {
  English: en,
  Spanish: es,
};

const LanguageContext = createContext(undefined);

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  const t = (key) => {
    const currentTranslations = translations[language] || translations.English;
    const value = currentTranslations[key];
    return typeof value === 'string' ? value : key;
  };

  const tArray = (key) => {
    const currentTranslations = translations[language] || translations.English;
    const value = currentTranslations[key];
    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('Component is outside of LanguageContextProvider');
  }
  return context;
};
