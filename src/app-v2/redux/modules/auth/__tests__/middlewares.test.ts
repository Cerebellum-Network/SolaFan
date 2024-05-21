import jwt from 'jsonwebtoken';

import {IAuthApi} from '../../../../api/auth/IAuthApi';
import {IAuthService} from '../../../../models/auth/IAuthService';
import {SupportedAuthProviders} from '../../../../models/auth/types';
import {UserDataStorage} from '../../../../models/auth/UserDataStorage';
import {WalletConnectionService} from '../../../../models/wallet/WalletConnectionService';
import {InitAppCommand} from '../../../base/actions';
import {mockMiddleware} from '../../../base/store.mock';
import {RedirectCommand} from '../../navigation/actions';
import {RestoreWalletsConnectionCommand} from '../../wallets';
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
} from '../actions';
import {
  afterSignInMiddleware,
  initUserDataRestorationMiddleware,
  logOutMiddleware,
  resendOTPCodeMiddleware,
  restoreUserDataMiddleware,
  signInByEmailMiddleware,
  signInBySocialMiddleware,
  verifyEmailOTPMiddleware,
  verifyOTPMiddleware,
  verifySocialOTPMiddleware,
} from '../middlewares';

jest.mock('../../../../../config/common', () => ({
  FIREBASE_API_KEY: () => 'test',
  FIREBASE_AUTH_DOMAIN: () => 'test',
  FIREBASE_PROJECT_ID: () => 'test',
  FIREBASE_APP_ID: () => 'test',
  IDENTITY_API_URL: () => '',
  tenantId: () => '',
  APP_ID: () => '',
  APPLICATION: () => 'davinci',
  NETWORK_ID: '123',
  HTTP_PROVIDER_URL: '123',
  TOKEN_DECIMALS_POW: 18,
}));

const id = '12345';
const mockToken = jwt.sign({id}, 'super-secret-secret');

describe('auth middlewares', () => {
  let walletConnectionService: WalletConnectionService;
  let userDataStorage: UserDataStorage;
  let authService: IAuthService;
  let authApi: IAuthApi;

  beforeEach(() => {
    walletConnectionService = {
      disconnectWalletByType: jest.fn(),
    } as any;
    userDataStorage = {
      setUserData: jest.fn(),
      getUserData: jest.fn(),
      getUserEmail: jest.fn(),
      setUserEmail: jest.fn(),
      setUserOauthType: jest.fn(),
      getUserOauthType: jest.fn(),
      getUserToken: jest.fn(),
      clearUserData: jest.fn(),
    } as any;
    authApi = {
      sendOTPCodeByEmail: jest.fn(),
      validateEmailOTP: jest.fn(),
      sendOTPCodeBySocial: jest.fn(),
      confirmSocialEmail: jest.fn(),
    } as any;
    authService = {
      signInOrAttachEmail: jest.fn(),
      signInWithSocial: jest.fn(),
    };
  });

  describe('initUserDataRestorationMiddleware', () => {
    it('dispatches restore user data command', () => {
      const {invoke, next, store} = mockMiddleware(initUserDataRestorationMiddleware);
      invoke(InitAppCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledWith(RestoreUserDataCommand.create());
    });
  });

  describe('restoreUserDataMiddleware', () => {
    it('restores user data and logs him in', () => {
      (userDataStorage.getUserData as jest.Mock).mockImplementationOnce(() => 'data');
      const {invoke, next, store} = mockMiddleware(restoreUserDataMiddleware(userDataStorage));
      invoke(RestoreUserDataCommand.create());
      expect(next).toBeCalled();
      expect(userDataStorage.getUserData).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([UserDataDocument.create('data' as any)]);
      expect(call2).toEqual([UserDataRestoredEvent.create()]);
    });

    it('dispatches an error event and clears data in case of error', () => {
      (userDataStorage.getUserData as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(restoreUserDataMiddleware(userDataStorage));
      invoke(RestoreUserDataCommand.create());
      expect(next).toBeCalled();
      expect(userDataStorage.getUserData).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([UserDataRestorationFailedEvent.create('message')]);
      expect(call2).toEqual([ClearUserDataCommand.create()]);
    });
  });

  describe('sign in with email flow', () => {
    describe('signInByEmailMiddleware', () => {
      it('signs in a user by email', async () => {
        const {invoke, next, store} = mockMiddleware(signInByEmailMiddleware(authService, userDataStorage));
        store.getState.mockImplementation(() => ({locale: 'en'}));
        await invoke(SignInWithEmailCommand.create('email'));
        expect(next).toBeCalled();
        expect(authService.signInOrAttachEmail).toBeCalledWith('email', 'en');
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignedInWithEmailEvent.create('email')]);
        expect(call2).toEqual([RedirectCommand.create('/en/home/auth/verify', {email: 'email'})]);
      });

      it('dispatches an error event in case if authService.signInOrAttachEmail failed', async () => {
        (authService.signInOrAttachEmail as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(signInByEmailMiddleware(authService, userDataStorage));
        store.getState.mockImplementation(() => ({locale: 'en'}));
        await invoke(SignInWithEmailCommand.create('email'));
        expect(next).toBeCalled();
        expect(authService.signInOrAttachEmail).toBeCalledWith('email', 'en');
        expect(authApi.sendOTPCodeByEmail).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });
    });

    describe('verifyEmailOTPMiddleware', () => {
      it('verifies email OTP and saves user data', async () => {
        (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
        (authApi.validateEmailOTP as jest.Mock).mockImplementationOnce(() => ({
          publicKey: 'key',
          token: mockToken,
        }));
        const {invoke, next, store} = mockMiddleware(verifyEmailOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifyEmailOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserEmail).toBeCalled();
        expect(authApi.validateEmailOTP).toBeCalledWith('email', 'code');
        expect(userDataStorage.setUserData).toBeCalledWith('email', 'key', mockToken);
        expect(store.dispatch).toBeCalledTimes(3);
        const [call1, call2, call3] = store.dispatch.mock.calls;
        expect(call1).toEqual([VerifyOTPSuccessEvent.create({email: 'email', publicKey: 'key', token: mockToken})]);
        expect(call2).toEqual([UserDataDocument.create({email: 'email', publicKey: 'key', token: mockToken})]);
        expect(call3).toEqual([RedirectCommand.create('/en/home')]);
      });

      it('dispatches an error event in case if there is no email saved', async () => {
        (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(verifyEmailOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifyEmailOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserEmail).toBeCalled();
        expect(authApi.validateEmailOTP).not.toBeCalled();
        expect(userDataStorage.setUserData).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });

      it('dispatches an error event in case if authApi.validateEmailOTP failed', async () => {
        (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
        (authApi.validateEmailOTP as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(verifyEmailOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifyEmailOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserEmail).toBeCalled();
        expect(authApi.validateEmailOTP).toBeCalledWith('email', 'code');
        expect(userDataStorage.setUserData).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });
    });
  });

  describe('social sign in flow', () => {
    describe('signInBySocialMiddleware', () => {
      it('sign a user in with selected auth provider', async () => {
        (authService.signInWithSocial as jest.Mock).mockImplementationOnce(() => ({
          oauthType: 'oauthType',
          email: 'email',
          publicKey: 'key',
          token: mockToken,
        }));
        const {invoke, next, store} = mockMiddleware(signInBySocialMiddleware(authService, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(SignInWithSocialCommand.create(SupportedAuthProviders.Google));
        expect(next).toBeCalled();
        expect(authService.signInWithSocial).toBeCalledWith(SupportedAuthProviders.Google);
        expect(userDataStorage.setUserOauthType).toBeCalledWith('oauthType');
        expect(userDataStorage.setUserData).toBeCalledWith('email', 'key', mockToken);
        expect(store.dispatch).toBeCalledTimes(3);
        const [call1, call2, call3] = store.dispatch.mock.calls;
        expect(call1).toEqual([
          UserSignedInWithSocialEvent.create({email: 'email', publicKey: 'key', id, token: mockToken}),
        ]);
        expect(call2).toEqual([UserDataDocument.create({email: 'email', publicKey: 'key', token: mockToken})]);
        expect(call3).toEqual([RedirectCommand.create('/en/home')]);
      });

      it('dispatches an error event in case if authService.signInWithSocial failed', async () => {
        (authService.signInWithSocial as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(signInBySocialMiddleware(authService, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(SignInWithSocialCommand.create(SupportedAuthProviders.Google));
        expect(next).toBeCalled();
        expect(authService.signInWithSocial).toBeCalledWith(SupportedAuthProviders.Google);
        expect(userDataStorage.setUserOauthType).not.toBeCalled();
        expect(userDataStorage.setUserData).not.toBeCalled();
        expect(authApi.sendOTPCodeBySocial).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });
    });

    describe('verifySocialOTPMiddleware', () => {
      it('verifies social OTP and saves user data', async () => {
        (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'authType');
        (userDataStorage.getUserData as jest.Mock).mockImplementationOnce(() => ({
          email: 'email',
          publicKey: 'key',
          token: mockToken,
        }));
        const {invoke, next, store} = mockMiddleware(verifySocialOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifySocialOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserOauthType).toBeCalled();
        expect(userDataStorage.getUserData).toBeCalled();
        expect(authApi.confirmSocialEmail).toBeCalledWith('authType', mockToken, 'code');
        expect(store.dispatch).toBeCalledTimes(3);
        const [call1, call2, call3] = store.dispatch.mock.calls;
        expect(call1).toEqual([VerifyOTPSuccessEvent.create({email: 'email', publicKey: 'key', token: mockToken})]);
        expect(call2).toEqual([UserDataDocument.create({email: 'email', publicKey: 'key', token: mockToken})]);
        expect(call3).toEqual([RedirectCommand.create('/en/home')]);
      });

      it('dispatches an error event in case if no authType saved', async () => {
        (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(verifySocialOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifySocialOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserOauthType).toBeCalled();
        expect(userDataStorage.getUserData).not.toBeCalled();
        expect(authApi.confirmSocialEmail).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });

      it('dispatches an error event in case if no user data saved', async () => {
        (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'authType');
        (userDataStorage.getUserData as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(verifySocialOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifySocialOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserOauthType).toBeCalled();
        expect(userDataStorage.getUserData).toBeCalled();
        expect(authApi.confirmSocialEmail).not.toBeCalled();
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });

      it('dispatches an error event in case if authApi.confirmSocialEmail failed', async () => {
        (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'authType');
        (userDataStorage.getUserData as jest.Mock).mockImplementationOnce(() => ({
          email: 'email',
          publicKey: 'key',
          token: mockToken,
        }));
        (authApi.confirmSocialEmail as jest.Mock).mockImplementationOnce(() => {
          throw new Error('message');
        });
        const {invoke, next, store} = mockMiddleware(verifySocialOTPMiddleware(authApi, userDataStorage));
        store.getState.mockImplementation(() => ({
          locale: 'en',
        }));
        await invoke(VerifySocialOTPCommand.create('code'));
        expect(next).toBeCalled();
        expect(userDataStorage.getUserOauthType).toBeCalled();
        expect(userDataStorage.getUserData).toBeCalled();
        expect(authApi.confirmSocialEmail).toBeCalledWith('authType', mockToken, 'code');
        expect(store.dispatch).toBeCalledTimes(2);
        const [call1, call2] = store.dispatch.mock.calls;
        expect(call1).toEqual([UserSignInFailedEvent.create('message')]);
        expect(call2).toEqual([ClearUserDataCommand.create()]);
      });
    });
  });

  describe('verifyOTPMiddleware', () => {
    it('dispatches an event to verify email otp', () => {
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => null);
      const {invoke, next, store} = mockMiddleware(verifyOTPMiddleware(userDataStorage));
      invoke(VerifyOtpCommand.create('code'));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(VerifyEmailOTPCommand.create('code'));
    });
    it('dispatches an event to social email otp', () => {
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'type');
      const {invoke, next, store} = mockMiddleware(verifyOTPMiddleware(userDataStorage));
      invoke(VerifyOtpCommand.create('code'));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(VerifySocialOTPCommand.create('code'));
    });
  });

  describe('resendOTPCodeMiddleware', () => {
    it('sends a request to resent email OTP code', async () => {
      (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => null);
      (userDataStorage.getUserToken as jest.Mock).mockImplementationOnce(() => null);
      const {invoke, next} = mockMiddleware(resendOTPCodeMiddleware(authApi, userDataStorage));
      await invoke(ResendOTPCommand.create());
      expect(next).toBeCalled();
      expect(authApi.sendOTPCodeByEmail).toBeCalledWith('email');
    });

    it('dispatches an error if authApi.sendOTPCodeByEmail failed', async () => {
      (authApi.sendOTPCodeByEmail as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => null);
      (userDataStorage.getUserToken as jest.Mock).mockImplementationOnce(() => null);
      const {invoke, next, store} = mockMiddleware(resendOTPCodeMiddleware(authApi, userDataStorage));
      await invoke(ResendOTPCommand.create());
      expect(next).toBeCalled();
      expect(authApi.sendOTPCodeByEmail).toBeCalledWith('email');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(ResendOTPFailedEvent.create('message'));
    });

    it('sends a request to resent social OTP code', async () => {
      (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'type');
      (userDataStorage.getUserToken as jest.Mock).mockImplementationOnce(() => mockToken);
      const {invoke, next} = mockMiddleware(resendOTPCodeMiddleware(authApi, userDataStorage));
      await invoke(ResendOTPCommand.create());
      expect(next).toBeCalled();
      expect(authApi.sendOTPCodeBySocial).toBeCalledWith('type', mockToken);
    });

    it('dispatches an error if authApi.sendOTPCodeBySocial failed', async () => {
      (authApi.sendOTPCodeBySocial as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      (userDataStorage.getUserEmail as jest.Mock).mockImplementationOnce(() => 'email');
      (userDataStorage.getUserOauthType as jest.Mock).mockImplementationOnce(() => 'type');
      (userDataStorage.getUserToken as jest.Mock).mockImplementationOnce(() => mockToken);
      const {invoke, next, store} = mockMiddleware(resendOTPCodeMiddleware(authApi, userDataStorage));
      await invoke(ResendOTPCommand.create());
      expect(next).toBeCalled();
      expect(authApi.sendOTPCodeBySocial).toBeCalledWith('type', mockToken);
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(ResendOTPFailedEvent.create('message'));
    });
  });

  describe('logOutMiddleware', () => {
    it.skip('clears user data', () => {
      const {invoke, next, store} = mockMiddleware(logOutMiddleware(walletConnectionService, userDataStorage));
      invoke(SignOutCommand.create());
      expect(next).toBeCalled();
      expect(userDataStorage.clearUserData).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(UserDataDocument.create(null));
    });
  });

  describe('afterSignInMiddleware', () => {
    it('restores wallets connection after a user signed in', () => {
      const {invoke, next, store} = mockMiddleware(afterSignInMiddleware);
      invoke(VerifyOTPSuccessEvent.create({} as any));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(2);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, RestoreUserDataCommand.create());
      expect(store.dispatch).toHaveBeenNthCalledWith(2, RestoreWalletsConnectionCommand.create());
    });
  });
});
