import {IAuthApi} from '../../../api/auth/IAuthApi';
import {IWalletsApi} from '../../../api/wallet/IWalletsApi';
import {IAuthService} from '../../../models/auth/IAuthService';
import {UserDataStorage} from '../../../models/auth/UserDataStorage';
import {WalletConnectionService} from '../../../models/wallet/WalletConnectionService';
import {StoreModule} from '../../base/types';
import {AUTH_MODULE_NAME} from './constants';
import {
  afterSignInMiddleware,
  connectCereWalletMiddleware,
  initUserDataRestorationMiddleware,
  logOutMiddleware,
  resendOTPCodeMiddleware,
  restoreUserDataMiddleware,
  signInByEmailMiddleware,
  signInBySocialMiddleware,
  verifyEmailOTPMiddleware,
  verifyOTPMiddleware,
  verifySocialOTPMiddleware,
} from './middlewares';
import {authReducer} from './reducers';

export const createAuthModule = (
  walletsApi: IWalletsApi,
  authApi: IAuthApi,
  authService: IAuthService,
  userDataStorage: UserDataStorage,
  walletConnectionService: WalletConnectionService,
): StoreModule => ({
  title: AUTH_MODULE_NAME,
  moduleReducer: authReducer,
  middlewares: [
    initUserDataRestorationMiddleware,
    afterSignInMiddleware,
    restoreUserDataMiddleware(userDataStorage),
    verifyOTPMiddleware(userDataStorage),
    signInByEmailMiddleware(authService, userDataStorage),
    verifyEmailOTPMiddleware(authApi, userDataStorage),
    resendOTPCodeMiddleware(authApi, userDataStorage),
    signInBySocialMiddleware(authService, userDataStorage),
    verifySocialOTPMiddleware(authApi, userDataStorage),
    logOutMiddleware(walletConnectionService, userDataStorage),
    connectCereWalletMiddleware(walletsApi, walletConnectionService, userDataStorage, authApi),
  ],
});
