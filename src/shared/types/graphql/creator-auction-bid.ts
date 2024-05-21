export type CreatorAuctionBid = {
  // FIXME: Model should be changed based on the CMS new model
  id: string;
  txHash?: string;
  price: number;
  timestamp: string;
  buyer: string;
};

export enum BID_STATUSES {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export type CreatorAuctionBidWithStatus = CreatorAuctionBid & {
  bidStatus: BID_STATUSES;
};
