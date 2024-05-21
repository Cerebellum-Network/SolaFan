import {
  AuthProvider,
  GoogleAuthProvider as PlainGoogleAuthProvider,
  OAuthCredential,
  UserCredential,
} from 'firebase/auth';

import {InvalidAuthParamsError} from '../errors/InvalidAuthParamsError';
import {OAuthTokenData, OAuthTokenTypes} from '../types';
import {IAuthProvider, UserParams} from './IAuthProvider';

export class GoogleAuthProvider implements IAuthProvider {
  private readonly provider: PlainGoogleAuthProvider;

  constructor() {
    this.provider = new PlainGoogleAuthProvider();
    this.provider.addScope('email');
    this.provider.addScope('profile');
  }

  getProvider(): AuthProvider {
    return this.provider;
  }

  getCredentials(userCredentials: UserCredential): OAuthCredential {
    return PlainGoogleAuthProvider.credentialFromResult(userCredentials) as OAuthCredential;
  }

  async getToken({credentials}: UserParams): Promise<OAuthTokenData> {
    if (!credentials) {
      throw new InvalidAuthParamsError();
    }
    return {
      type: OAuthTokenTypes.Google,
      token: credentials.idToken!,
    };
  }
}
