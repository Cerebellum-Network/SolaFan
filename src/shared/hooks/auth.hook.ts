import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {getUserData, getUserSocialData, selectUserData} from 'app-v2/redux/modules/auth/selectors';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {isSupportedWalletType} from '../../app-v2/models/wallet/types';
import {ClearUserDataCommand, UserDataDocument} from '../../app-v2/redux/modules/auth/actions';
import {resetSocialData, setSocialData} from '../../app-v2/redux/modules/auth/social-data';
import {SelectWalletTypeCommand} from '../../app-v2/redux/modules/wallets';
import {LOCAL_STORAGE_KEY_TOKEN, LOCAL_STORAGE_SELECTED_WALLET} from '../../const/storage-keys';
import {dispatchError} from '../lib/error-handler';
import {unwrap} from '../lib/unwrap';
import analyticService, {AnalyticEventsEnum} from '../services/analytic.service';
import {
  CLOSED_BY_USER_ERROR,
  confirmSocialEmail,
  fetchWallet,
  getPrivatePublicKeysByEmail,
  getPrivatePublicKeysBySocial,
  getSocialTokenAndTypeByProvider,
  IKeys,
  isUnverifiedEmail,
  signInOrAttachEmail,
  signInWithSocial,
  SocialNetworks,
} from '../services/auth.service';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {useIdentifyAnalyticsWithUtmParams} from './use-identify-analytics-with-utm-params';

interface UseAuthResult {
  handleEmailSignUp: (userEmail: string) => Promise<unknown>;
  handleSocialSignIn: (
    social: SocialNetworks,
    successCallback: Function,
    showOtpCallback: Function,
  ) => Promise<string | void>;
  setAuthData: (userEmail: string, publicKey: string, token: string) => void;
  clearAuthData: () => void;
  verifyOtp: (email: string, otp: string) => Promise<IKeys>;
}

type UserData = Parameters<typeof UserDataDocument.create>[0];
type SocialUserData = Parameters<typeof setSocialData>[0];

export const useAuth = (): UseAuthResult => {
  const {t, locale} = useLocalization();
  const dispatch = useDispatch();
  const userData: UserData = useSelector(getUserData);
  const socialUserData = useSelector(getUserSocialData);

  const setSelectedWallet = useCallback(
    (wallet: unknown) => {
      if (isSupportedWalletType(wallet)) {
        dispatch(SelectWalletTypeCommand.create(wallet));
      }
    },
    [dispatch],
  );

  const setUserData = useCallback((data: UserData) => dispatch(UserDataDocument.create(data)), [dispatch]);

  const clearUserData = useCallback(() => {
    return dispatch(ClearUserDataCommand.create());
  }, [dispatch]);

  const setSocialUserData = useCallback((data: SocialUserData) => dispatch(setSocialData(data)), [dispatch]);
  const resetSocialUserData = useCallback(() => dispatch(resetSocialData()), [dispatch]);

  const identifyAnalyticsWithUtm = useIdentifyAnalyticsWithUtmParams(userData?.token);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPrivateKey');
    localStorage.removeItem('userPublicKey');
    localStorage.removeItem('selectedWallet');
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    localStorage.removeItem('isSellExplainerNotificationOpen');

    // walletConnectDisconnect();
    clearUserData();
    localStorage.setItem('isSellExplainerNotificationOpen', '');
  }, [clearUserData]);

  const setAuthData = useCallback(
    (userEmail: string, publicKey: string, token: string) => {
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userPublicKey', String(publicKey).toLowerCase());
      localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_SELECTED_WALLET, NonCustodyWalletTypeEnum.TORUS);
      localStorage.setItem('isSellExplainerNotificationOpen', 'true');
      analyticService.track(AnalyticEventsEnum.USER_AUTHENTICATED, {email: userEmail});

      setUserData({
        email: userEmail,
        publicKey: unwrap(localStorage.getItem('userPublicKey')),
        token: localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) ?? undefined,
      });

      setSelectedWallet(localStorage.getItem(LOCAL_STORAGE_SELECTED_WALLET));
    },
    [setUserData, setSelectedWallet],
  );

  const handleEmailSignUp = useCallback(
    (userEmail: string) => {
      const createResult = signInOrAttachEmail(userEmail, locale);
      identifyAnalyticsWithUtm(userEmail);
      return createResult;
    },
    [identifyAnalyticsWithUtm, locale],
  );

  const handleSocialSignIn = useCallback(
    async (social: SocialNetworks, successCallback: Function, showOtpCallback: Function): Promise<string | void> => {
      try {
        const {user, credential} = await signInWithSocial(social);

        try {
          const {publicKey, token} = await getPrivatePublicKeysBySocial(credential);
          setAuthData(user.userEmail, publicKey, token);
          identifyAnalyticsWithUtm(user.userEmail);
          successCallback(user.userEmail);
        } catch (e) {
          if (isUnverifiedEmail(JSON.parse(e.message).status)) {
            const {type, token} = await getSocialTokenAndTypeByProvider(credential);

            const socialData = {
              type,
              token: token ?? null,
              email: user.userEmail,
            };
            setSocialUserData(socialData);
            showOtpCallback(socialData);
          } else {
            throw new Error(e);
          }
        }
      } catch (err) {
        if (!err.message.includes(CLOSED_BY_USER_ERROR)) {
          dispatchError(t('Something went wrong'));
        }
        throw err;
      }
    },
    [identifyAnalyticsWithUtm, setAuthData, setSocialUserData, t],
  );

  const verifyOtp = useCallback(
    async (email: string, otp: string): Promise<IKeys> => {
      let keys: IKeys;

      if (socialUserData.type && socialUserData.token) {
        await confirmSocialEmail(socialUserData.type, socialUserData.token, otp);
        keys = await fetchWallet({
          type: socialUserData.type,
          token: socialUserData.token,
        });
        // do not keep user social data after the verification
        resetSocialUserData();
      } else {
        keys = await getPrivatePublicKeysByEmail(email, otp);
      }

      return keys;
    },
    [resetSocialUserData, socialUserData.token, socialUserData.type],
  );

  return {
    handleEmailSignUp,
    handleSocialSignIn,
    setAuthData,
    clearAuthData,
    verifyOtp,
  };
};

export const useAuthorized = () => {
  const history = useHistory();
  const {locale} = useLocalization();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (!userData?.userEmail || !userData?.userPublicKey) {
      history.replace(`/${locale}/home/auth`);
    }
  }, [userData, history, locale]);
};
