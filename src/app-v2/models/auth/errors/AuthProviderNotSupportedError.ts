export class AuthProviderNotSupportedError extends Error {
  constructor(type: string) {
    super();
    this.name = 'AuthProviderNotSupportedError';
    this.message = `Auth provider of type ${type} is not supported`;
  }
}
