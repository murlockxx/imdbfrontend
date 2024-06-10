// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import HttpBackend from 'i18next-http-backend';

// i18n
//   .use(HttpBackend) // loads translations using http
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     backend: {
//       loadPath: '/locales/{{lng}}/translation.json' // path to load the translations from
//     },
//     lng: 'en', // default language
//     fallbackLng: 'en', // use English if translation is not available
//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    lng: localStorage.getItem('language') || 'en', // Use stored language or default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
