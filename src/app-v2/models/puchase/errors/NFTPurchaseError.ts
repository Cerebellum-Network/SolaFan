export class NFTPurchaseError extends Error {
  constructor() {
    super();
    this.name = 'NFTPurchaseError';
    this.message = 'Error while purchasing the NFT';
  }
}
