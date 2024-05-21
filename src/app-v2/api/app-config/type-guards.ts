import {CmsAppConfig} from '@cere/services-types';

export const isCmsAppConfig = (data: any): data is CmsAppConfig =>
  typeof data?.appTitle === 'string' &&
  typeof data?.instagramUrl === 'string' &&
  typeof data?.facebookUrl === 'string' &&
  typeof data?.faqUrl === 'string' &&
  typeof data?.discordUrl === 'string' &&
  typeof data?.twitterUrl === 'string' &&
  typeof data?.privacyPolicyUrl === 'string' &&
  typeof data?.termsOfServicesUrl === 'string' &&
  typeof data?.cereWalletTitle === 'string' &&
  typeof data?.primaryMainColor === 'string' &&
  typeof data?.secondaryMainColor === 'string' &&
  typeof data?.secondaryDarkColor === 'string' &&
  typeof data?.buttonContainedPrimaryFirstColor === 'string' &&
  typeof data?.buttonContainedPrimarySecondColor === 'string' &&
  typeof data?.buttonContainedSecondaryColor === 'string' &&
  typeof data?.infoMainColor === 'string' &&
  typeof data?.backgroundPaperColor === 'string' &&
  typeof data?.backgroundDefaultColor === 'string' &&
  typeof data?.grey100Color === 'string' &&
  typeof data?.grey700Color === 'string' &&
  typeof data?.logoFull?.url === 'string' &&
  typeof data?.logoFull?.alternativeText === 'string' &&
  typeof data?.logoShort?.url === 'string' &&
  typeof data?.logoShort?.alternativeText === 'string';
