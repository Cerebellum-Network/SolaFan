import {TransactionResult} from './types';

export interface IAuctionSCApi {
  startAuction(
    nftAddress: string,
    startingPrice: number,
    amount: number,
    duration: number,
    collectionAddress: string,
  ): Promise<void>;
  placeBid(auctionId: string, price: number): Promise<TransactionResult>;
  settleAuction(auctionId: string): Promise<void>;
}
