export class WrongIdTokenFormatError extends Error {
  constructor(data: any) {
    super();
    this.name = 'WrongIdTokenFormatError';
    this.message = `Wrong Id token format. Expected string but received ${JSON.stringify(data)}`;
  }
}
