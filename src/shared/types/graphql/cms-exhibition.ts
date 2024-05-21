import {CmsExhibitAsset, PaymentStatusEnum} from '@cere/services-types';
import {UploadFile} from '@cere/services-types';

import {Numberish} from '../numberish';
import {Optional} from '../optional';
import {CmsCreator} from './cms-creator';
import {CmsExhibitionNftRelType} from './cms-exhibition-nft-rel-type';
import {CmsNft, CmsNftReady} from './cms-nft';

export type CmsExhibitionNft = {
  id: Numberish;
  cmsNft: CmsNft;
  relType: CmsExhibitionNftRelType;
  availableFrom: string;
  availableTo: string;
  videoMarkers: Array<{
    markerStartTime: string;
    markerEndTime: string;
  }>;
};

export type CmsExhibitionNftReady = Omit<CmsExhibitionNft, 'cmsNft'> & {
  cmsNft: CmsNftReady;
};

export const isCmsExhibitionNftReady = (val: CmsExhibitionNft): val is CmsExhibitionNftReady =>
  val.cmsNft?.freeportNft != null;

export type CmsExhibitionNftAuctioned = Omit<CmsExhibitionNft, 'relType'> & {
  relType: CmsExhibitionNftRelType.AUCTIONED;
};

export type CmsExhibitionNftLimited = Omit<CmsExhibitionNft, 'relType'> & {
  relType: CmsExhibitionNftRelType.LIMITED;
};

export type CmsExhibitionNftAccess = Omit<CmsExhibitionNft, 'relType'> & {
  relType: CmsExhibitionNftRelType.ACCESS;
};

export type CmsExhibitionNftExclusive = CmsExhibitionNftAuctioned | CmsExhibitionNftLimited;

export type CmsExhibitionNftWithUserPaymentInfo = CmsExhibitionNft & {
  paymentStatus: PaymentStatusEnum;
};

export type CmsExhibitionTeaser = {
  title: string;
  description: string;
  content: UploadFile;
  poster?: UploadFile;
};

export interface CmsExhibitionBase {
  id: number;
  startsAt: string;
  endsAt: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: UploadFile;
  assets: Array<CmsExhibitAsset>;
  artistQuoteVisual?: {
    url: string;
  };
  artistQuote?: string;
  teaser?: CmsExhibitionTeaser;
  liveTeaser?: CmsExhibitionTeaser;
  videoPreview: UploadFile;
  allowFreeAccess?: boolean;
  nftVisualExhibit?: boolean;
  NFT_visual_exhibitupload?: UploadFile;
  ticketModalTitle?: string;
  ticketModalBody?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoImage?: UploadFile;
  isComingSoon?: boolean;
  locale: string;
  localizations: Array<{locale: string; slug: string; id: string}>;
}

export interface CmsExhibition extends CmsExhibitionBase {
  creator: CmsCreator;
  nfts: CmsExhibitionNft[];
}

export type CmsExhibitionIdSlugOnly = Pick<CmsExhibition, 'id' | 'slug'>;

type ExhibitionNft = Omit<CmsExhibitionNft, 'cmsNft'> & {
  cmsNft: Optional<CmsNft, 'published_at'>;
};

export type CmsExhibitionCmsNftRelTypeOnly = Pick<ExhibitionNft, 'cmsNft' | 'relType'>;

export type CmsExhibitionWithTheme = Omit<CmsExhibition, 'creator'> & {
  creator: Omit<CmsCreator, 'cmsExhibitions'>;
  live_theme?: {
    background: UploadFile;
  };
};
