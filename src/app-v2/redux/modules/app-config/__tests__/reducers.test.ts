import {AppConfigDocument} from '../actions';
import {appConfigReducer} from '../reducers';

describe('app config reducers', () => {
  describe('appConfigReducer', () => {
    it('returns default state is there is no data', () => {
      expect(appConfigReducer(undefined, {type: 'x'}).config).toEqual({
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
      });
    });

    it('stores app config', () => {
      expect(appConfigReducer(undefined, AppConfigDocument.create('config' as any)).config).toEqual('config');
    });

    it('returns stored config', () => {
      expect(appConfigReducer({config: 'config'} as any, {type: 'x'}).config).toEqual('config');
    });
  });
});
