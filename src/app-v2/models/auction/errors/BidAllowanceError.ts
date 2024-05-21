export class BidAllowanceError extends Error {
  constructor() {
    super();
    this.name = 'BidAllowanceError';
    this.message = 'Bid price exceeds allowed balance';
  }
}
