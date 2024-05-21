export class NftsByCreatorFetchError extends Error {
  constructor() {
    super();
    this.name = 'NftsByCreatorFetchError';
    this.message = 'Cannot fetch nfts list. Please, rty again later';
  }
}
