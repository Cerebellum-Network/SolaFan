export class InvalidAuctionDataError extends Error {
  constructor() {
    super();
    this.name = 'InvalidAuctionDataError';
    this.message = 'Invalid auction data';
  }
}
