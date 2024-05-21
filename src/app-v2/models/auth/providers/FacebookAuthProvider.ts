import {
  AuthProvider,
  FacebookAuthProvider as PlainFacebookAuthProvider,
  OAuthCredential,
  UserCredential,
} from 'firebase/auth';

import {InvalidAuthParamsError} from '../errors/InvalidAuthParamsError';
import {OAuthTokenData, OAuthTokenTypes} from '../types';
import {IAuthProvider, UserParams} from './IAuthProvider';

export class FacebookAuthProvider implements IAuthProvider {
  private readonly provider: PlainFacebookAuthProvider;

  constructor() {
    this.provider = new PlainFacebookAuthProvider();
    this.provider.addScope('email');
    this.provider.addScope('public_profile');
    this.provider.setCustomParameters({display: 'popup'});
  }

  getProvider(): AuthProvider {
    return this.provider;
  }

  getCredentials(userCredentials: UserCredential): OAuthCredential {
    return PlainFacebookAuthProvider.credentialFromResult(userCredentials) as OAuthCredential;
  }

  async getToken({credentials}: UserParams): Promise<OAuthTokenData> {
    if (!credentials) {
      throw new InvalidAuthParamsError();
    }
    return {
      type: OAuthTokenTypes.Facebook,
      token: credentials.accessToken!,
    };
  }
}
