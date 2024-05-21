export class NftNotFoundError extends Error {
  constructor(searchField: string, fieldValue: string) {
    super();
    this.name = 'NftNotFoundError';
    this.message = `Cannot find an NFT by field ${searchField} and value ${fieldValue}`;
  }
}
