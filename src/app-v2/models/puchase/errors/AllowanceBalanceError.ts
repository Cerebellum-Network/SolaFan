export class AllowanceBalanceError extends Error {
  constructor() {
    super();
    this.name = 'AllowanceBalanceError';
    this.message = 'NFT price exceeds allowed balance';
  }
}
