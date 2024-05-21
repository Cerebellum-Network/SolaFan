import {LocaleNotSupportedError} from './LocaleNotSupportedError';
import {UserLocaleStorage} from './UserLocaleStorage';

export class LocalizationService {
  constructor(
    private readonly userLocaleStorage: UserLocaleStorage,
    private readonly defaultLocale: string,
    private readonly supportedLocales: string[],
  ) {}

  getUserLocale(): string {
    const locale = this.getAppLocaleFromUrl();
    if (!locale) {
      try {
        return this.userLocaleStorage.getUserLocale();
      } catch (e) {
        console.error(e.message);
        return this.defaultLocale;
      }
    }
    return locale;
  }

  setUserLocale(locale: string) {
    if (!this.supportedLocales.includes(locale)) {
      throw new LocaleNotSupportedError();
    }
    this.userLocaleStorage.setUserLocale(locale);
  }

  private getAppLocaleFromUrl(): string | null {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    const pathLocale = pathArray[0];

    if (!pathLocale || !this.supportedLocales.includes(pathLocale)) {
      return null;
    }

    return pathLocale;
  }
}
