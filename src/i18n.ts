import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './static/locales/en/translation.json';
import fiTranslation from './static/locales/fi/translation.json';

export const defaultNS = 'translation';

export const resources = {
  en: { translation: enTranslation },
  fi: { translation: fiTranslation },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fi',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation'],
    defaultNS,
    resources,
  });

export default i18n;
