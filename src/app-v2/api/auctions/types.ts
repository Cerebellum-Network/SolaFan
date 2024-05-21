export type AuctionBid = {
  price: number;
  buyerWalletAddress: string;
  timestamp: string;
};

export type Auction = {
  nftId: string;
  sellerWalletAddress: string;
  price: number;
  bids: AuctionBid[];
};

export type AuctionRawData = {
  seller: string;
  price: number;
  creator_auction_bids: Array<{
    buyer: string;
    price: number;
    timestamp: string;
  }>;
};
