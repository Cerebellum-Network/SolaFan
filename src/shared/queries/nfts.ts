import {gql} from '@apollo/client';

import {ARTIST_PROFILE_FRAGMENT} from './artists';
import {UPLOAD_FILE_FRAGMENT} from './fragments';

export const NFT_FRAGMENT = gql`
  ${UPLOAD_FILE_FRAGMENT}
  ${ARTIST_PROFILE_FRAGMENT}
  fragment nftFragment on CmsV2Nft {
    id
    title
    freeportNft {
      id
      nftId
      supply
      freeport_collection {
        address
      }
      orders {
        orderId
        amount
        balance
        price
        royaltyFee
        creator {
          wallet
        }
      }
      auctions {
        auctionId
        amount
        bids {
          bid
          bidder {
            wallet
          }
        }
      }
      minter {
        wallet
      }
    }
    cmsCreator {
      ...ArtistProfile
    }
    isComingSoon
    title
    description
    cardDescription
    assets {
      content {
        ...Media
      }
    }
    cardImage {
      ...Media
    }
    seoTitle
    seoDescription
    seoCanonical
    seoImage {
      ...Media
    }
    locale
    localizations {
      locale
      id
    }
  }
`;

export const GET_NFT = gql`
  ${NFT_FRAGMENT}
  query CmsNft($id: ID!) {
    cmsV2Nft(id: $id) {
      ...nftFragment
    }
  }
`;

export const GET_NFT_SEO_DATA = gql`
  query NftSeoData($id: ID!) {
    cmsV2Nft(id: $id) {
      title
      description
      seoTitle
      seoDescription
      seoCanonical
      seoImage {
        url
      }
      assets {
        content {
          url
        }
      }
    }
  }
`;
