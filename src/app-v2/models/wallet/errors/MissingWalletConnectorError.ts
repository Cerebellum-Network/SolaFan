export class MissingWalletConnectorError extends Error {
  constructor(type: string) {
    super();
    this.name = 'MissingWalletConnectorError';
    this.message = `Cannot find a configured connector for the wallet of type: ${type}`;
  }
}
