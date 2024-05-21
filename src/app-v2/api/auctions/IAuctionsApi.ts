import {Auction} from './types';

export interface IAuctionsApi {
  getOpenedAuctionForNftAndSeller(nftId: string, sellerWalletAddress: string): Promise<Auction | null>;
}
