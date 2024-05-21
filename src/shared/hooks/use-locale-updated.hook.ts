import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useEffect, useRef} from 'react';

export type LocaleUpdatedCallback = (value: string, prevValue: string) => void;

export const useLocaleUpdated = (callback: LocaleUpdatedCallback) => {
  const {locale} = useLocalization();

  const ref = useRef<string>('');

  useEffect(() => {
    if (ref.current && ref.current !== locale) {
      callback(locale, ref.current);
    }

    ref.current = locale;
  }, [locale, callback]);
};
