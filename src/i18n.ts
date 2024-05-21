import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {DEFAULT_LANGUAGE} from './config/common';
import {LOCAL_STORAGE_USER_LOCALE} from './const/storage-keys';
import enTranslations from './locales/en/translation.json';
import ptTranslations from './locales/pt/translation.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(LOCAL_STORAGE_USER_LOCALE) || DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    transSupportBasicHtmlNodes: true,
  },
});

export default i18n;
