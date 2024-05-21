import {CmsAppConfig} from '@cere/services-types';
import {AnyAction, combineReducers} from 'redux';

import {
  AppConfigDocument,
  LoadAppConfigFailedEvent,
  LoadAppConfigIsLoadingEvent,
  LoadAppConfigSuccessEvent,
} from './actions';

const defaultAppConfig: CmsAppConfig = {
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

const appConfig = (state: CmsAppConfig = defaultAppConfig, action: AnyAction): CmsAppConfig => {
  if (action.type === AppConfigDocument.type) {
    return action.payload;
  }
  return state || defaultAppConfig;
};

const appConfigIsLoading = (state: boolean, action: ReturnType<typeof LoadAppConfigIsLoadingEvent.create>): boolean => {
  if (action.type === LoadAppConfigIsLoadingEvent.type) {
    return action.payload;
  }
  return state || false;
};

const appConfigLoadingError = (
  state: string | null,
  action: ReturnType<typeof LoadAppConfigFailedEvent.create>,
): string | null => {
  if (action.type === LoadAppConfigIsLoadingEvent.type) {
    return action.payload;
  }
  return state || null;
};

const appConfigLoadedSuccessFully = (
  state: boolean = false,
  action: ReturnType<typeof LoadAppConfigSuccessEvent.create>,
): boolean => {
  return action.type === LoadAppConfigIsLoadingEvent.type ? true : state;
};

export const appConfigReducer = combineReducers({
  config: appConfig,
  error: appConfigLoadingError,
  loading: appConfigIsLoading,
  success: appConfigLoadedSuccessFully,
});
