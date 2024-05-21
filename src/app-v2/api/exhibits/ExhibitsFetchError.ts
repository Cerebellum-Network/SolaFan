export class ExhibitsFetchError extends Error {
  constructor() {
    super();
    this.name = 'ExhibitsFetchError';
    this.message = 'Cannot fetch exhibits list. Please, try again later';
  }
}
