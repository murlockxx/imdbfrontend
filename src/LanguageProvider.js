import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Get the first two characters of the browser language code.
  const browserLanguage = navigator.language.substring(0, 2);

  // Use the browser's language or fallback to 'en' if not previously set in localStorage.
  const [language, setLanguage] = useState(localStorage.getItem('language') || browserLanguage || 'en');

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
