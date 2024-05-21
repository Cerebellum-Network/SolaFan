import {gql} from '@apollo/client';

export const GET_NFT_OFFERS = gql`
  query getNftOffers($cmsNftIncrementId: String, $start: Int, $limit: Int, $restrictedWallets: [String]) {
    creatorAuctions(
      sort: "created_at:desc"
      where: {is_settled: false, seller_nin: $restrictedWallets, nft_id: {cmsNfts: {id: $cmsNftIncrementId}}}
    ) {
      price
      seller
      published_at
      nft_id {
        creator_wallet_nfts {
          wallet
          quantity
        }
      }
    }
    creatorMakeOffers(
      limit: $limit
      start: $start
      sort: "price:asc"
      where: {price_gt: 0, seller_nin: $restrictedWallets, creator_nft: {cmsNfts: {id: $cmsNftIncrementId}}}
    ) {
      id
      seller
      price
      published_at
      creator_nft {
        creator_wallet_nfts {
          wallet
          quantity
        }
      }
    }
  }
`;

export const GET_NFT_OWNER_OFFER = gql`
  query Orders($orderId: String!, $userWalletAddress: String!, $nftAddress: String!, $nftCollectionAddress: String!) {
    freeportOrders(
      where: {
        orderId: $orderId
        processed: false
        cancelled: false
        creator: {wallet: $userWalletAddress}
        nft: {nftId: $nftAddress, freeport_collection: {address: $nftCollectionAddress}}
      }
    ) {
      orderId
      processed
      amount
      balance
      price
      royaltyFee
      created_at
      creator {
        wallet
      }
    }
  }
`;

export const GET_NFT_PRIMARY_OFFER = gql`
  query getNftPrimaryOffer($creatorId: String, $nftId: String, $wallet: String, $locale: String) {
    creatorAuctions(
      sort: "created_at:desc"
      where: {
        is_settled: false
        seller: $wallet
        nft_id: {cmsNfts: {id: $nftId, cmsCreator: $creatorId, locale: $locale}}
      }
    ) {
      price
      seller
      published_at
      nft_id {
        creator_wallet_nfts {
          wallet
          quantity
        }
      }
    }
    creatorMakeOffers(
      sort: "published_at:desc"
      where: {
        price_gt: 0
        seller: $wallet
        creator_nft: {cmsNfts: {id: $nftId, cmsCreator: $creatorId, locale: $locale}}
      }
    ) {
      id
      seller
      price
      published_at
      creator_nft {
        nft_id
        cmsNfts {
          id
          cmsCreator {
            id
            name
          }
        }
        creator_wallet_nfts {
          wallet
          quantity
        }
      }
    }
  }
`;

export const GET_NFT_TOTAL_OFFERED_QTY_BY_CMS_ID = gql`
  query getNftTotalOfferedQty($nftId: String) {
    creatorMakeOffers(where: {price_gt: 0, creator_nft: {cmsNfts: {id: $nftId}}}) {
      seller
    }
    creatorWalletNfts(where: {nft_id: {cmsNfts: {id: $nftId}}}) {
      wallet
      quantity
    }
  }
`;

export const GET_NFT_TOTAL_OFFERED_QTY_BY_ID = gql`
  query getNftTotalOfferedQty($nftId: String) {
    creatorMakeOffers(where: {price_gt: 0, creator_nft: {nft_id: $nftId}}) {
      seller
    }
    creatorWalletNfts(where: {nft_id: {nft_id: $nftId}}) {
      wallet
      quantity
    }
  }
`;
