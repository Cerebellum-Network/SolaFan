import {CmsNftAsset, UploadFile} from '@cere/services-types';

import {Numberish} from '../numberish';
import {Optional} from '../optional';
import {RequiredSome} from '../required-some';
import {CmsCreator} from './cms-creator';
import {CreatorNft, CreatorNftWithWallets} from './creator-nft';

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

export type CmsNftReady = RequiredSome<CmsNft, 'freeportNft'>;

export type CmsNftWithWallets = Omit<Optional<CmsNft, 'published_at'>, 'freeportNft'> & {
  freeportNft?: CreatorNftWithWallets;
};
