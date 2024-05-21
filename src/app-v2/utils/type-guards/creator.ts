import {FullCreatorInterface} from '@cere/services-types';

import {isRecord} from '../../../shared/types/is-record';

export const isCreator = (data: unknown): data is FullCreatorInterface =>
  isRecord(data) &&
  typeof data.id === 'string' &&
  typeof data.name === 'string' &&
  typeof data.about === 'string' &&
  typeof data.instagramFollowerNumber === 'string' &&
  typeof data.facebookFollowerNumber === 'string' &&
  typeof data.youtubeFollowerNumber === 'string' &&
  typeof data.tiktokFollowerNumber === 'string' &&
  isRecord(data.avatar) &&
  typeof data.avatar?.url === 'string' &&
  isRecord(data.desktopBackgroundImage) &&
  typeof data.desktopBackgroundImage?.url === 'string' &&
  isRecord(data.tabletBackgroundImage) &&
  typeof data.tabletBackgroundImage?.url === 'string' &&
  isRecord(data.mobileBackgroundImage) &&
  typeof data.mobileBackgroundImage?.url === 'string';
