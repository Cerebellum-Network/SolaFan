import {
  ExhibitionTeaserInterface,
  FullCreatorInterface,
  FullExhibitInterface,
  LocalizationWithSlug,
  NftAssetInterface,
  NftType,
  UploadFile,
  UploadFileInterface,
} from '@cere/services-types';
import {ReactNode} from 'react';

export type Numberish = string | number;

export enum EventTimelineStatus {
  NOT_STARTED = 'not_started',
  STARTED = 'started',
  FINISHED = 'finished',
}

export type Teaser = {
  title: string;
  description: string;
  content?: UploadFile;
  poster?: UploadFile;
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

export type Nfts = {
  relType: string;
  cmsNft: {
    cardDescription: string | undefined;
    cardImage: UploadFile;
    description: string;
    id: string;
    title: string;
    freeportNft: {
      nftId: string;
      orders: {
        amount: number;
        orderId: number;
        price: string;
      }[];
    };
  };
};

export interface CmsExhibit {
  id: string;
  startsAt?: string;
  endsAt?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  allowFreeAccess?: boolean;
  image: UploadFileInterface;
  teaser?: ExhibitionTeaserInterface;
  creator: FullCreatorInterface;
  locale?: string;
  liveTeaser?: ExhibitionTeaserInterface;
  videoPreview: UploadFileInterface;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoImage?: UploadFile;
  localizations?: LocalizationWithSlug[];
  live_theme?: {
    background?: UploadFileInterface;
  };
  assets: NftAssetInterface[];
  attendees: number;
  approvedAttendees: number;
  eventType: EventTypeEnum;
  eventHiddenLocation?: string;
  eventPublicLocation?: string;
  streamUrl?: string;
  nfts: {id: string; cmsNft: {id: number}}[];
}

export type ExhibitInterface = FullExhibitInterface & {
  attendees: number;
  approvedAttendees: number;
  eventType: EventTypeEnum;
  nfts: {id: string; relType?: NftType}[];
  eventHiddenLocation?: string;
  eventPublicLocation?: string;
  streamUrl?: string;
};

export enum SliderTypeEnum {
  VIDEO = 'video/mp4',
  IMAGE = 'image/jpeg',
}

export enum EventTypeEnum {
  IN_PERSON = 'in_person',
  LIVE_STREAM = 'live_stream',
  CONTENT_DROP = 'content_drop',
}

export const EventTypeName: Record<EventTypeEnum, string> = {
  [EventTypeEnum.IN_PERSON]: 'In-Person',
  [EventTypeEnum.LIVE_STREAM]: 'Live Stream',
  [EventTypeEnum.CONTENT_DROP]: 'Content Drop',
};

export type ExhibitSliderContent = {
  eventImageUrl: string | null;
  eventBackgroundUrl: string | null;
  player: NonNullable<ReactNode> | null;
  playerPreviewUrl: string | null;
  nftPreviewUrl: string | null;
  type: SliderTypeEnum;
  hasAccess: boolean;
};
