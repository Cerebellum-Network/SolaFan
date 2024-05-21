export class LocaleNotSupportedError extends Error {
  constructor() {
    super();
    this.name = 'LocaleNotSupportedError';
    this.message = 'Locale is not supported';
  }
}
