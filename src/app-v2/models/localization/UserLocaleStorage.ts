import {NoUserLocaleError} from './NoUserLocaleError';

const USER_LOCALE_FIELD = 'user-locale';

export class UserLocaleStorage {
  setUserLocale(locale: string): void {
    localStorage.setItem(USER_LOCALE_FIELD, locale);
  }

  getUserLocale(): string {
    const locale = localStorage.getItem(USER_LOCALE_FIELD);
    if (!locale) {
      throw new NoUserLocaleError();
    }
    return locale;
  }
}
