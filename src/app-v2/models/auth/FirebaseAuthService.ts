import {Auth} from '@firebase/auth';
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, UserCredential} from 'firebase/auth';

import {IAuthApi} from '../../api/auth/IAuthApi';
import {FirebaseConfigError} from './errors/FirebaseConfigError';
import {IAuthService} from './IAuthService';
import {AuthProvidersFactory} from './providers/AuthProvidersFactory';
import {SocialUserData, SupportedAuthProviders} from './types';
import {UserDataStorage} from './UserDataStorage';

type FirebaseAuthParams = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

const isAuthParams = (params: any): params is FirebaseAuthParams => {
  return (
    params &&
    params.apiKey &&
    typeof params.apiKey === 'string' &&
    params.authDomain &&
    typeof params.authDomain === 'string' &&
    params.projectId &&
    typeof params.projectId === 'string' &&
    params.appId &&
    typeof params.appId === 'string'
  );
};

export class FirebaseAuthService implements IAuthService {
  private readonly firebaseAuth: Auth;

  constructor(
    private readonly authApi: IAuthApi,
    private readonly authProvidersFactory: AuthProvidersFactory,
    private readonly userDataStorage: UserDataStorage,
    authParams: FirebaseAuthParams,
  ) {
    if (!authParams || !isAuthParams(authParams)) {
      throw new FirebaseConfigError();
    }
    const firebaseApp = initializeApp(authParams);
    this.firebaseAuth = getAuth(firebaseApp);
    (window as any).auth = this.firebaseAuth;
  }

  async signInWithSocial(providerType: SupportedAuthProviders): Promise<SocialUserData> {
    const authProvider = this.authProvidersFactory.createProvider(providerType);
    const signInResult = await signInWithPopup(this.firebaseAuth, authProvider.getProvider());
    const authCredentials = authProvider.getCredentials(signInResult);
    const email = this.getEmailFromSocialCredential(signInResult);
    const oauth = await authProvider.getToken({
      userData: this.firebaseAuth.currentUser ?? undefined,
      credentials: authCredentials,
    });
    const {publicKey, token} = await this.authApi.getWallet({email, type: oauth.type, token: oauth.token});
    return {
      oauthType: oauth.type,
      email,
      token,
      publicKey,
    };
  }

  async signInByEmail(email: string, locale?: string): Promise<void> {
    await this.authApi.signInByEmail(email, locale);
  }

  signInOrAttachEmail(email: string, locale: string): Promise<void> {
    if (this.userDataStorage.getUserToken()) {
      return this.authApi.attachEmail(email);
    }
    return this.signInByEmail(email, locale);
  }

  private getEmailFromSocialCredential(credential: UserCredential): string {
    return (credential.user.email ||
      credential.user.providerData.find((providerData) => providerData.email)?.email) as string;
  }
}
