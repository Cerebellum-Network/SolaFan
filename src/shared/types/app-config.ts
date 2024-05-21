import {CmsAppConfig} from '@cere/services-types';

export type AppConfig = CmsAppConfig;

export const defaultAppConfig: AppConfig = {
  appTitle: '',
  logoFull: {url: '', alternativeText: '', caption: ''},
  logoShort: {url: '', alternativeText: '', caption: ''},
  facebookUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  discordUrl: '',
  faqUrl: '',
  privacyPolicyUrl: '',
  termsOfServicesUrl: '',
  cereWalletTitle: '',
  signUpCta: '',
  isFiatPaymentDisabled: false,
  primaryMainColor: '',
  secondaryMainColor: '',
  secondaryDarkColor: '',
  buttonContainedPrimaryFirstColor: '',
  buttonContainedPrimarySecondColor: '',
  buttonContainedSecondaryColor: '',
  infoMainColor: '',
  backgroundPaperColor: '',
  backgroundDefaultColor: '',
  grey100Color: '',
  grey700Color: '',
};
