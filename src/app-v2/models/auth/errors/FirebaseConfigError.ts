export class FirebaseConfigError extends Error {
  constructor() {
    super();
    this.name = 'FirebaseConfigError';
    this.message = 'Firebase configuration error. Check your firebase config.';
  }
}
