import {CmsCreatorWithExhibitions} from './cms-creator';

export type CreatorWallet = {
  wallet: string;
  quantity: number;
  id: string;
};

export type CreatorWalletWithAuthor = CreatorWallet & {
  cms_creator: CmsCreatorWithExhibitions;
};
