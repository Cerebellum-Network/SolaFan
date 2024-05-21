export class TransfersNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'TransfersNotFoundError';
    this.message = `Cannot get NFT Transfers`;
  }
}
