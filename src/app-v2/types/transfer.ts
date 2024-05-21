export type NftTransfer = {
  id: number;
  amount: string;
  created: string;
  buyer: string;
  creator: string;
  price: string;
  priceUsd: number;
  royaltyFee: string;
};

export type TransfersWithParams = {
  collectionAddress: number;
  nftId: number;
  transfers: NftTransfer[];
};
