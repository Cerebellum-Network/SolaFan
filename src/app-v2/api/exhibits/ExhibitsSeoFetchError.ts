export class ExhibitsSeoFetchError extends Error {
  constructor() {
    super();
    this.name = 'ExhibitsSeoFetchError';
    this.message = 'Cannot fetch exhibits seo data. Please, try again later';
  }
}
