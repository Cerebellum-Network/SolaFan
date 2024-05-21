export class NoUserDataError extends Error {
  constructor() {
    super();
    this.name = 'NoUserDataError';
    this.message = 'User data is not set or not full';
  }
}
