export class CreatorsFetchError extends Error {
  constructor() {
    super();
    this.name = 'CreatorsFetchError';
    this.message = 'Cannot fetch creators list. Please, rty again later';
  }
}
