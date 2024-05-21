import {TFunction, useTranslation, UseTranslationResponse} from 'react-i18next';

export const useLocalization = (
  locale?: string,
): {
  t: TFunction<'translation', undefined>;
  updateLocale: Promise<TFunction>;
  locale: string;
  i18n: UseTranslationResponse<any>['i18n'];
} => {
  const {t, i18n} = useTranslation();
  const updateLocale = i18n.changeLanguage(locale);

  return {
    locale: i18n.language,
    updateLocale,
    t,
    i18n,
  };
};
