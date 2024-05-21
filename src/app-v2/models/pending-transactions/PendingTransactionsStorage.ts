import {PendingTransaction, PendingTransactionType} from './types';

const PENDING_TRANSACTIONS_KEY = 'user-pending-transactions';

export class PendingTransactionsStorage {
  setPendingTransaction(pendingTransaction: PendingTransaction): void {
    const storedTransactions = this.getStoredTransactions();
    storedTransactions[this.getKey(pendingTransaction.nftId, pendingTransaction.collectionAddress)] =
      pendingTransaction;
    localStorage.setItem(PENDING_TRANSACTIONS_KEY, JSON.stringify(storedTransactions));
  }

  getPendingTransactionByNftIdAndCollection(nftId: string, collectionAddress: string): PendingTransaction | null {
    const storedTransactions = this.getStoredTransactions();
    return storedTransactions[this.getKey(nftId, collectionAddress)] ?? null;
  }

  getPendingTransactionsByType(type: PendingTransactionType): PendingTransaction[] {
    const storedTransactions = this.getStoredTransactions();
    return Object.values(storedTransactions).filter((transaction) => transaction.type === type);
  }

  removePendingTransactionByNftIdAndCollection(nftId: string, collectionAddress: string): void {
    const storedTransactions = this.getStoredTransactions();
    delete storedTransactions[this.getKey(nftId, collectionAddress)];
    localStorage.setItem(PENDING_TRANSACTIONS_KEY, JSON.stringify(storedTransactions));
  }

  getStoredTransactions(): {[key: string]: PendingTransaction} {
    const storedTransactionsString = localStorage.getItem(PENDING_TRANSACTIONS_KEY);
    return storedTransactionsString ? JSON.parse(storedTransactionsString) : {};
  }

  private getKey(nftId: string, collectionAddress: string): string {
    return `${nftId}:${collectionAddress}`;
  }
}
