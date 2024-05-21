import {UploadFileFormatsInterface} from '@cere/services-types';

type MultimediaContentType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'audio/mpeg'
  | 'audio/wav'
  | 'audio/ogg'
  | 'video/mp4'
  | 'video/quicktime'
  | 'video/x-msvideo';

export type FreeportNftAsset = {
  name: string;
  description: string;
  preview: string;
  asset: string;
  contentType: MultimediaContentType;
};

export type EventContentAsset = {
  name: string | null;
  preview: string | null;
  previewFormats?: UploadFileFormatsInterface;
  background: string | null;
  playerAsset: string | null;
  playerPreviewUrl: string | null;
  contentType: MultimediaContentType;
  hasAccess: boolean;
};

export type SliderContent = {
  name: string;
  asset: FreeportNftAsset;
  hasAccess: boolean;
  currentIndex: number;
  collectionAddress?: string;
  nftId?: string;
};
