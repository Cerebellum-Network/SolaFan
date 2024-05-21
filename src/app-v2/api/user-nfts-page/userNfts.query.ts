import {gql} from '@apollo/client';

import {NFT_FRAGMENT} from '../../../shared/queries/nfts';

export const GET_WALLET_NFTS = gql`
  query GetWalletsNfts($wallet: [String]) {
    freeportWallets(where: {wallet_in: $wallet, nfts: {cmsNfts_null: false}}) {
      wallet
      nfts {
        nftId
        freeport_collection {
          address
        }
        cmsNfts {
          cardDescription
          cardImage {
            url
            alternativeText
          }
          description
          title
          id
          freeportNft {
            nftId
            cmsNfts {
              title
              cardImage {
                url
                alternativeText
              }
              description
              cardDescription
            }
          }
        }
      }
    }
  }
`;

export const USER_WALLETS_NFTS = gql`
  ${NFT_FRAGMENT}
  query userWalletsNfts($userWallets: [String!], $locale: String) {
    walletNfts: freeportWallets(
      where: {wallet_in: $userWallets, nfts: {cmsNfts_null: false, cmsNfts: {locale: $locale}}}
    ) {
      wallet
      nfts {
        nftId
        cmsNfts {
          ...nftFragment
        }
        freeport_collection {
          address
        }
      }
    }
  }
`;
