export class InvalidAuthParamsError extends Error {
  constructor() {
    super();
    this.name = 'InvalidAuthParamsError';
    this.message = 'Missing required auth params';
  }
}
