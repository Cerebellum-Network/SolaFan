export type TransactionResult = {
  hash: string;
  timestamp?: number;
};

export type AuctionBid = {
  id: string;
  txHash?: string;
  price: number;
  timestamp?: string;
  buyer: string;
  status?: AuctionBidStatuses;
};

export enum AuctionBidStatuses {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
