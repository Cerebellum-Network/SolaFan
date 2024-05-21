import {WalletStatus} from '@cere/embed-wallet';
import {CheckUserHasNftEnum} from '@cere/services-types';
import PerfMate from 'perfmate';
import {AnyAction, MiddlewareAPI} from 'redux';

import analyticService, {AnalyticEventsEnum} from '../../../../shared/services/analytic.service';
import {isNotEmptyString} from '../../../../shared/types/string';
import {IAuthApi} from '../../../api/auth/IAuthApi';
import {IWalletsApi} from '../../../api/wallet/IWalletsApi';
import {IAuthService} from '../../../models/auth/IAuthService';
import {UserDataStorage} from '../../../models/auth/UserDataStorage';
import {NavigationStorage} from '../../../models/navigation/NavigationStorage';
import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletConnectionService} from '../../../models/wallet/WalletConnectionService';
import {UsersNftCardInterface} from '../../../types/nft';
import {isRecord} from '../../../utils/types/is-record';
import {isPositiveNumber} from '../../../utils/types/numbers';
import {InitAppCommand} from '../../base/actions';
import {selectAppConfig} from '../app-config/selectors';
import {HideLoaderCommand, ShowLoaderCommand} from '../loader/actions';
import {selectLoaderState} from '../loader/selectors';
import {selectCurrentLocale} from '../localization/selectors';
import {RedirectCommand} from '../navigation/actions';
import {LoadNftsArrayByIdsCommand, NftsDocument} from '../nfts/actions';
import {selectNfts} from '../nfts/selectors';
import {PurchaseNFTForFiatCommand} from '../purchase/actions';
import {
  ConnectCereWallet,
  ConnectedWalletsTypesDocument,
  ResetWalletState,
  RestoreWalletsConnectionCommand,
  SelectWalletTypeCommand,
  WalletConnectedEvent,
} from '../wallets';
import {
  ClearUserDataCommand,
  ResendOTPCommand,
  ResendOTPFailedEvent,
  RestoreUserDataCommand,
  SignInWithEmailCommand,
  SignInWithSocialCommand,
  SignOutCommand,
  UserDataDocument,
  UserDataRestorationFailedEvent,
  UserDataRestoredEvent,
  UserSignedInWithEmailEvent,
  UserSignedInWithSocialEvent,
  UserSignInFailedEvent,
  VerifyEmailOTPCommand,
  VerifyOtpCommand,
  VerifyOTPSuccessEvent,
  VerifySocialOTPCommand,
} from './actions';

export const initUserDataRestorationMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === InitAppCommand.type) {
      dispatch(RestoreUserDataCommand.create());
    }
  };

export const restoreUserDataMiddleware =
  (userDataStorage: UserDataStorage) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === RestoreUserDataCommand.type) {
      try {
        const userData = userDataStorage.getUserData();
        dispatch(UserDataDocument.create(userData));
        dispatch(UserDataRestoredEvent.create());
      } catch (e) {
        dispatch(UserDataRestorationFailedEvent.create(e.message));
        dispatch(ClearUserDataCommand.create());
      }
    }
  };

export const signInByEmailMiddleware =
  (authService: IAuthService, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === SignInWithEmailCommand.type) {
      try {
        const email = action.payload;
        const locale = selectCurrentLocale(getState());
        if (window?.location?.search) {
          userDataStorage.setNftQuery(window.location.search);
        }
        await authService.signInOrAttachEmail(email, locale);
        userDataStorage.setUserEmail(email);
        dispatch(UserSignedInWithEmailEvent.create(email));
        dispatch(RedirectCommand.create(`/${locale}/home/auth/verify`, {email}));
      } catch (e) {
        dispatch(UserSignInFailedEvent.create(e.message));
        dispatch(ClearUserDataCommand.create());
      }
    }
  };

export const verifyOTPMiddleware =
  (userDataStorage: UserDataStorage) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === VerifyOtpCommand.type) {
      const code = action.payload;
      const oauthType = userDataStorage.getUserOauthType();
      if (oauthType) {
        dispatch(VerifySocialOTPCommand.create(code));
        return;
      }
      dispatch(VerifyEmailOTPCommand.create(code));
    }
  };

export const resendOTPCodeMiddleware =
  (authApi: IAuthApi, userDataStorage: UserDataStorage) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === ResendOTPCommand.type) {
      const oauthType = userDataStorage.getUserOauthType();
      const token = userDataStorage.getUserToken();
      try {
        if (oauthType && token) {
          await authApi.sendOTPCodeBySocial(oauthType, token);
          return;
        }
        const email = userDataStorage.getUserEmail();
        await authApi.sendOTPCodeByEmail(email);
      } catch (e) {
        dispatch(ResendOTPFailedEvent.create(e.message));
      }
    }
  };

export const verifyEmailOTPMiddleware =
  (authApi: IAuthApi, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === VerifyEmailOTPCommand.type) {
      const locale = selectCurrentLocale(getState());
      try {
        const otpCode = action.payload;
        const email = userDataStorage.getUserEmail();
        const {publicKey, token} = await authApi.validateEmailOTP(email, otpCode);
        const normalizedPublicKey = publicKey?.toLowerCase();
        userDataStorage.setUserData(email, normalizedPublicKey, token);
        dispatch(VerifyOTPSuccessEvent.create({email, publicKey: normalizedPublicKey, token}));
        dispatch(UserDataDocument.create({email, publicKey, token}));
        const previousUrl = NavigationStorage.getPreviousUrl();
        dispatch(RedirectCommand.create(previousUrl || `/${locale}/home`));
        NavigationStorage.removePreviousUrl();
      } catch (e) {
        dispatch(UserSignInFailedEvent.create(e.message));
        dispatch(ClearUserDataCommand.create());
      }
    }
  };

export const signInBySocialMiddleware =
  (authService: IAuthService, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === SignInWithSocialCommand.type) {
      const locale = selectCurrentLocale(getState());
      try {
        const provider = action.payload;
        const {oauthType, ...userData} = await authService.signInWithSocial(provider);
        userDataStorage.setUserOauthType(oauthType);
        userDataStorage.setUserData(userData.email, userData.publicKey, userData.token);
        dispatch(UserSignedInWithSocialEvent.create(userData));
        dispatch(UserDataDocument.create(userData));
        const previousUrl = NavigationStorage.getPreviousUrl();
        dispatch(RedirectCommand.create(previousUrl || `/${locale}/home`));
        NavigationStorage.removePreviousUrl();
      } catch (e) {
        dispatch(UserSignInFailedEvent.create(e.message));
        dispatch(ClearUserDataCommand.create());
      }
    }
  };

export const verifySocialOTPMiddleware =
  (authApi: IAuthApi, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === VerifySocialOTPCommand.type) {
      const locale = selectCurrentLocale(getState());
      try {
        const otpCode = action.payload;
        const authType = userDataStorage.getUserOauthType();
        const {email, publicKey, token} = userDataStorage.getUserData();
        await authApi.confirmSocialEmail(authType!, token!, otpCode);
        dispatch(VerifyOTPSuccessEvent.create({email, publicKey, token}));
        dispatch(UserDataDocument.create({email, publicKey, token}));
        const previousUrl = NavigationStorage.getPreviousUrl();
        dispatch(RedirectCommand.create(previousUrl || `/${locale}/home`));
        NavigationStorage.removePreviousUrl();
      } catch (e) {
        dispatch(UserSignInFailedEvent.create(e.message));
        dispatch(ClearUserDataCommand.create());
      }
    }
  };

export const logOutMiddleware =
  (walletConnectionService: WalletConnectionService, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === SignOutCommand.type) {
      try {
        const connectedWallets = walletConnectionService.getAllConnectedWalletsTypes();
        for (const type of connectedWallets) {
          await walletConnectionService.disconnectWalletByType(type);
        }
      } catch (e) {
        console.error(e.message);
      }
      const nfts = selectNfts(getState());
      dispatch(
        NftsDocument.create(
          (Object.values(nfts).filter((nft) => nft != null) as UsersNftCardInterface[]).map((nft) => ({
            ...nft,
            purchaseStatus: CheckUserHasNftEnum.USER_DOES_NOT_HAVE_NFT,
          })),
        ),
      );
      dispatch(ResetWalletState.create());
      userDataStorage.clearUserData();
      dispatch(UserDataDocument.create(null));
    }
  };

export const afterSignInMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === VerifyOTPSuccessEvent.type) {
      dispatch(RestoreUserDataCommand.create());
      dispatch(RestoreWalletsConnectionCommand.create());
    }
  };

const isNftData = (val: unknown): val is {nftId: string; orderId: string; qty: number} =>
  isRecord(val) && isPositiveNumber(val.qty) && isNotEmptyString(val.nftId) && isNotEmptyString(val.orderId);

export const connectCereWalletMiddleware =
  (
    walletsApi: IWalletsApi,
    walletConnectionService: WalletConnectionService,
    userDataStorage: UserDataStorage,
    authApi: IAuthApi,
  ) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === ConnectCereWallet.type) {
      const appConfig = selectAppConfig(getState());
      const {walletType, email: existedEmail, ...nftData} = action.payload;
      try {
        dispatch(ShowLoaderCommand.create('Connecting Cere Wallet...'));
        const perf = new PerfMate();
        perf.log('auth profile: before walletConnectionService.connectWalletByType');
        const cereWallet = await walletConnectionService.connectWalletByType(walletType, {
          appConfig,
          email: existedEmail,
        });
        perf.log('auth profile: after walletConnectionService.connectWalletByType');
        walletConnectionService.subscribe(
          SupportedWalletType.CEREWALLET,
          'status-update',
          (status: WalletStatus, prevStatus: WalletStatus) => {
            if (prevStatus === 'connected' && status === 'ready') {
              userDataStorage.clearUserData();
              dispatch(UserDataDocument.create(null));
            }
          },
        );
        dispatch(ShowLoaderCommand.create('Authorization...'));
        perf.log('auth profile: before walletConnectionService.signRaw');
        const cereSignature = await walletConnectionService.signRaw(cereWallet);
        perf.log('auth profile: after walletConnectionService.signRaw');

        perf.log('auth profile: before walletConnectionService.isNewUser(walletType)');
        const isNewUser = (await walletConnectionService.isNewUser(walletType)) || false;
        perf.log('auth profile: after walletConnectionService.isNewUser(walletType)');

        dispatch(ShowLoaderCommand.create('Fetching wallets...'));
        perf.log('auth profile: before authApi.fetchWallet({cereWallet, cereSignature})');
        const {publicKey, token} = await authApi.fetchWallet({cereWallet, cereSignature});
        perf.log('auth profile: after authApi.fetchWallet({cereWallet, cereSignature})');
        const email = userDataStorage.getUserEmail();

        const normalizedPublicKey = publicKey?.toLowerCase();
        userDataStorage.setUserData(email, normalizedPublicKey, token);
        dispatch(UserDataDocument.create({email, publicKey, token}));

        walletsApi.saveConnectedWallet(walletType, cereWallet).catch(console.warn);
        const connectedWalletsTypes = walletConnectionService.getAllConnectedWalletsTypes();
        dispatch(WalletConnectedEvent.create(walletType));
        dispatch(ConnectedWalletsTypesDocument.create(connectedWalletsTypes));
        dispatch(SelectWalletTypeCommand.create(walletType));
        if (isNewUser) {
          perf.log('auth profile: before authApi.attachEmail(email)');
          await authApi.attachEmail(email);
          perf.log('auth profile: after authApi.attachEmail(email)');
        }
        if (isNftData(nftData)) {
          dispatch(ShowLoaderCommand.create('Redirecting to Payment Page...'));
          const {nftId, orderId, qty} = nftData;
          analyticService.gtmTrack(AnalyticEventsEnum.SIGN_IN_BUY_COLLECTIBLE, {publicKey, email});
          perf.log(`auth profile: before PurchaseNFTForFiatCommand.create(nftId, orderId, qty)`);
          dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, qty));
          perf.end();
        }
      } catch (e) {
        const preloaderVisible = selectLoaderState(getState());
        if (e === 'User has closed the login modal' && preloaderVisible.visible) {
          dispatch(HideLoaderCommand.create());
          console.error(e);
        }
      } finally {
        dispatch(HideLoaderCommand.create());
        dispatch(LoadNftsArrayByIdsCommand.create([]));
      }
    }
  };
