import {CmsNftAsset, UploadFile} from '@cere/services-types';

import {CmsCreator, CreatorNft} from '../../../shared/types/graphql';
import {Numberish} from '../../../shared/types/numberish';

export type CmsNft = {
  id: Numberish;
  freeportNft?: CreatorNft;
  title: string;
  description: string;
  cardDescription?: string;
  cardImage: UploadFile;
  assets: Array<CmsNftAsset>;
  cmsCreator: CmsCreator;
  isComingSoon?: boolean;
  published_at: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoImage?: UploadFile;
  locale?: string;
  localizations?: Array<{
    locale: string;
    id: Numberish;
  }>;
};
export type UserWalletNft = {
  wallet: string;
  nfts: {nftId: string; cmsNfts: CmsNft[]; freeport_collection: {address: string}}[];
};

export type UserWalletNftResult = {
  id: string;
  image: string;
  title: string;
  userWalletAddress: string;
  qty: number;
};

export enum NonCustodyWalletTypeEnum {
  TORUS = 'TORUS',
  METAMASK = 'METAMASK',
  WALLET_CONNECT = 'WALLET_CONNECT',
}

export type NonCustodyWallet = {
  id: number;
  type: NonCustodyWalletTypeEnum;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
};
