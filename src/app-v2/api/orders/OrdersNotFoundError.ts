export class OrdersNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'OrdersNotFoundError';
    this.message = `Cannot get NFT Orders`;
  }
}
