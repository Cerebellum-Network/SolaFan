import {UploadFile} from '@cere/services-types';

export type CmsExhibit = {
  id: string;
  freeport_eventId: string;
  startsAt: string;
  endsAt: string;
  artist: CmsCreator;
};

export type CmsCreator = {
  address: string;
  avatar: UploadFile;
  name: string;
  about: string;
  instagramFollowerNumber: string;
  facebookFollowerNumber: string;
  twitterFollowerNumber: string;
  youtubeFollowerNumber: string;
  tiktokFollowerNumber: string;
  backgroundImage: UploadFile;
};

export enum PublicationState {
  LIVE = 'LIVE',
  PREVIEW = 'PREVIEW',
}

export const getBulletPoints = (items: string): string[] => {
  const s = items.trim();
  return s ? s.split(/\r?\n\r?\n/) : [];
};
