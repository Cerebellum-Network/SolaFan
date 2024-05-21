export class InsufficientBalanceError extends Error {
  constructor(userBalance: number, requiredBalance: number) {
    super();
    this.name = 'InsufficientBalanceError';
    this.message = `Insufficient balance. Wallet balance is ${userBalance} but ${requiredBalance} is required`;
  }
}
