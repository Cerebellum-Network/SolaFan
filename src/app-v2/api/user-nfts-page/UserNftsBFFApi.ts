import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {IUserNftsApi} from './IUserNftsApi';
import {UserWalletNft, UserWalletNftResult} from './types';
import {USER_WALLETS_NFTS} from './userNfts.query';
import {UserNftsFetchError} from './UserNftsFetchError';

export const createUserNftsApi = (apolloClient: IGraphQLClient): IUserNftsApi => {
  async function getNfts(queryParam: string[], locale: string): Promise<UserWalletNftResult[]> {
    try {
      const walletNfts = await apolloClient.makeQuery<UserWalletNft[], {userWallets: string[]; locale: string}>(
        USER_WALLETS_NFTS,
        {userWallets: queryParam, locale},
        'walletNfts',
        () => true,
      );
      return transformUserWalletsNfts(walletNfts ?? []);
    } catch (error) {
      console.error(error);
      throw new UserNftsFetchError();
    }
  }

  function transformUserWalletsNfts(walletNfts: UserWalletNft[]): UserWalletNftResult[] {
    const nfts: UserWalletNftResult[] = [];
    walletNfts.forEach((wNft) => {
      wNft.nfts.forEach((nft) => {
        const cmsNft = nft.cmsNfts[0];
        nfts.push({
          id: cmsNft.id.toString(),
          image: cmsNft.cardImage.url,
          title: cmsNft.title,
          userWalletAddress: wNft.wallet,
          qty: 1,
        });
      });
    });
    return nfts;
  }

  return {
    getNfts,
  };
};
