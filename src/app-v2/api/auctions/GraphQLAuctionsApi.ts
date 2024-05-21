import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {GET_AUCTION_FOR_NFT_AND_SELLER} from './auctions.query';
import {IAuctionsApi} from './IAuctionsApi';
import {isAuctionRawData} from './type-guards';
import {Auction, AuctionRawData} from './types';

export class GraphQLAuctionsApi implements IAuctionsApi {
  constructor(private readonly client: IGraphQLClient) {}

  async getOpenedAuctionForNftAndSeller(nftId: string, sellerWalletAddress: string): Promise<Auction | null> {
    const auctionData = await this.client.makeQuery<AuctionRawData[], {nftId: string; sellerWalletAddress: string}>(
      GET_AUCTION_FOR_NFT_AND_SELLER,
      {
        nftId,
        sellerWalletAddress,
      },
      'auctions',
      isAuctionRawData,
    );
    if (!auctionData) {
      return null;
    }
    return {
      nftId,
      ...this.mapRawDataToAuction(auctionData[0]),
    };
  }

  private mapRawDataToAuction(data: AuctionRawData): Omit<Auction, 'nftId'> {
    return {
      price: data.price,
      sellerWalletAddress: data.seller,
      bids: data.creator_auction_bids.map((bid) => ({
        price: bid.price,
        buyerWalletAddress: bid.buyer,
        timestamp: bid.timestamp,
      })),
    };
  }
}
