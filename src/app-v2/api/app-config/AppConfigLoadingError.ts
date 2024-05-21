export class AppConfigLoadingError extends Error {
  constructor() {
    super();
    this.name = 'AppConfigLoadingError';
    this.message = 'Error while loading application config';
  }
}
