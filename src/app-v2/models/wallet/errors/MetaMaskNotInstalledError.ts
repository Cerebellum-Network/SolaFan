export class MetaMaskNotInstalledError extends Error {
  constructor() {
    super();
    this.name = 'MetaMaskNotInstalledError';
    this.message = 'MetaMask wallet is not installed';
  }
}
