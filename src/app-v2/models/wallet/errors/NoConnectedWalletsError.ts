export class NoConnectedWalletsError extends Error {
  constructor() {
    super();
    this.name = 'NoConnectedWalletsError';
    this.message = 'No connected wallets are found';
  }
}
