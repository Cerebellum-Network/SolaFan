export class WrongAuthResponseFormatError extends Error {
  constructor() {
    super();
    this.name = 'WrongAuthResponseFormatError';
    this.message = 'Auth API response format is not supported';
  }
}
