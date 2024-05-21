export class NetworkNotSupportedError extends Error {
  constructor(networkId: number) {
    super();
    this.message = `Your wallet is not configured to work within ${networkId}.`;
    this.name = 'NetworkNotSupportedError';
  }
}
