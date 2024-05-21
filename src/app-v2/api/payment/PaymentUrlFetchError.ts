export class PaymentUrlFetchError extends Error {
  constructor() {
    super();
    this.name = 'PaymentUrlFetchError';
    this.message = 'Error fetching Payment URL from API';
  }
}
