export class SubscribeError extends Error {
  constructor() {
    super();
    this.name = 'SubscribeError';
    this.message = 'Cannot subscribe. Please, try again later';
  }
}
