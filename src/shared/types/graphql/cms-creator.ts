import {UploadFile} from '@cere/services-types';

import {Numberish} from '../numberish';
import {CmsExhibition} from './cms-exhibition';
import {CmsExhibitionNftRelType} from './cms-exhibition-nft-rel-type';
import {CmsNft} from './cms-nft';

export type CmsCreatorExhibition = {
  id: Numberish;
  nfts: ComponentCmsExhibitionNft[];
  slug: string;
  startsAt: string;
  endsAt: string;
  allowFreeAccess?: boolean;
};

export type CmsCreator = {
  id: Numberish;
  name: string;
  about: string;
  instagramFollowerNumber: string;
  facebookFollowerNumber: string;
  twitterFollowerNumber: string;
  youtubeFollowerNumber: string;
  tiktokFollowerNumber: string;
  avatar: UploadFile;
  desktopBackgroundImage: UploadFile;
  tabletBackgroundImage: UploadFile;
  mobileBackgroundImage: UploadFile;
  discordLink?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoImage?: UploadFile;
  locale: string;
  localizations: Array<{
    id: Numberish;
    locale: string;
  }>;
};

export type ComponentCmsExhibitionNft = {
  id: Numberish;
  relType: CmsExhibitionNftRelType;
  cmsNft: Pick<CmsNft, 'id'>;
};

export type CmsCreatorWithExhibitions = CmsCreator & {
  exhibits: CmsExhibition[];
};
