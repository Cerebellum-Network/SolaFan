import {gql} from '@apollo/client';

import {NFT_FRAGMENT} from './nfts';

export const GET_WALLET_NFTS = gql`
  ${NFT_FRAGMENT}
  query Nfts($wallet: String, $locale: String) {
    creatorWalletNfts(where: {wallet: $wallet, nft_id: {cmsNfts_null: false, cmsNfts: {locale: $locale}}}) {
      id
      wallet
      quantity
      nft_id {
        id
        nft_id
        cmsNfts {
          ...nftFragment
        }
      }
    }
  }
`;

export const GET_WALLETS_NFTS = gql`
  ${NFT_FRAGMENT}
  query GetWalletsNfts($wallet: [String]) {
    freeportWallets(where: {wallet_in: $wallet, nfts: {cmsNfts_null: false}}) {
      wallet
      nfts {
        nftId
        freeport_collection {
          address
        }
        cmsNfts {
          ...nftFragment
        }
      }
    }
  }
`;

export const GET_WALLETS_CREATOR_NFTS = gql`
  query GetWalletsNfts($wallet: [String]) {
    creatorWalletNfts(
      sort: "updated_at:desc"
      where: {wallet_in: $wallet, quantity_gt: 0, nft_id: {cmsNfts_null: false}}
    ) {
      id
      wallet
      quantity
      nft_id {
        id
        nft_id
      }
    }
  }
`;
