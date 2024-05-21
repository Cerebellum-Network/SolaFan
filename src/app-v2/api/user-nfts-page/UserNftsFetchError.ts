export class UserNftsFetchError extends Error {
  constructor() {
    super();
    this.name = 'UserNftsFetchError';
    this.message = 'Cannot fetch nfts fro the wallet. Please, try again later';
  }
}
