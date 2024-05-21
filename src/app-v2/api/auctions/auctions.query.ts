import {gql} from '@apollo/client';

export const GET_AUCTION_FOR_NFT_AND_SELLER = gql`
  query getAuctionForNftAndSeller($nftId: String!, $sellerWalletAddress: String!) {
    auctions: creatorAuctions(
      where: {is_settled: false, seller: $sellerWalletAddress, nft_id: {cmsNfts: {id: $nftId}}}
    ) {
      seller
      price
      creator_auction_bids(sort: "timestamp:desc") {
        buyer
        price
        timestamp
      }
    }
  }
`;
