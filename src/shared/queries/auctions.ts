import {gql} from '@apollo/client';

import {CREATOR_NFT_BASE_PROPS} from './creator-nft-fragments';

const AUCTION_BID = gql`
  fragment Bid on CreatorAuctionBid {
    id
    buyer
    price
    timestamp
    txHash
  }
`;

export const GET_NFTS_AUCTIONS = gql`
  ${CREATOR_NFT_BASE_PROPS}
  ${AUCTION_BID}
  query GetNftsAuctionsGetNftsAuctions($ids: [ID]!) {
    creatorNfts(where: {id: $ids}) {
      ...CreatorNftBaseProps
      creator_auctions {
        id
        is_settled
        seller
        buyer
        price
        ends_at
        is_settled
        creator_auction_bids {
          ...Bid
        }
      }
    }
  }
`;
