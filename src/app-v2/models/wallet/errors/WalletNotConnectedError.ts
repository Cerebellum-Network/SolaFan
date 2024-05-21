export class WalletNotConnectedError extends Error {
  constructor(type: string) {
    super();
    this.name = 'WalletNotConnectedError';
    this.message = `Cannot find connected wallet of type ${type}`;
  }
}
