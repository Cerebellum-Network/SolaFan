export class ExhibitsByCreatorFetchError extends Error {
  constructor() {
    super();
    this.name = 'ExhibitsByCreatorFetchError';
    this.message = 'Cannot fetch exhibits list. Please, rty again later';
  }
}
