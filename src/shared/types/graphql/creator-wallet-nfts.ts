import {CmsNft} from './cms-nft';

export type CreatorWalletNft = {
  id: string;
  wallet: string;
  quantity: number;
  nft_id: {
    id: string;
    nft_id: string;
    cmsNft: CmsNft;
  };
};

export type CreatorWalletNftQueryResult = {
  id: string;
  wallet: string;
  quantity: number;
  nft_id: {
    id: string;
    nft_id: string;
    cmsNfts: CmsNft[];
  };
};

export type FreeportWalletNftsQueryResult = {
  wallet: string;
  nfts: [
    {
      cmsNfts: [CmsNft];
    },
  ];
};
