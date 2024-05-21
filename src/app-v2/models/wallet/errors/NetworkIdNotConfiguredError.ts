export class NetworkIdNotConfiguredError extends Error {
  constructor() {
    super();
    this.name = 'NetworkIdNotConfiguredError';
    this.message = 'Wallet Network Id is not specified';
  }
}
