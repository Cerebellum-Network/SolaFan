export enum PendingTransactionType {
  SellTransaction = 'SellTransaction',
  BuyTransaction = 'BuyTransaction',
  NewAuctionTransaction = 'NewAuctionTransaction',
  PlaceBidTransaction = 'PlaceBidTransaction',
  TransferTransaction = 'transferTransaction',
}

export type PendingTransaction = {
  nftId: string;
  collectionAddress: string;
  type: PendingTransactionType;
  price: number;
  timestamp: number;
  userWalletAddress: string;
};
