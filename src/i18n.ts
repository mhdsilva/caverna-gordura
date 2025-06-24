import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslation from './locales/pt/translation.json';
import enTranslation from './locales/en/translation.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: enTranslation
      },
      pt: {
        translation: ptTranslation
      }
    }
  });

export default i18next; 