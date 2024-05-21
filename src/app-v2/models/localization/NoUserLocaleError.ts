export class NoUserLocaleError extends Error {
  constructor() {
    super();
    this.name = 'NoUserLocaleError';
    this.message = 'No saved user locale found';
  }
}
