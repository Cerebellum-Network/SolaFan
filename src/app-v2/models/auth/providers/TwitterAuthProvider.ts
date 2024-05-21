import {
  AuthProvider,
  getIdToken,
  OAuthCredential,
  TwitterAuthProvider as PlainTwitterAuthProvider,
  UserCredential,
} from 'firebase/auth';

import {InvalidAuthParamsError} from '../errors/InvalidAuthParamsError';
import {OAuthTokenData, OAuthTokenTypes} from '../types';
import {IAuthProvider, UserParams} from './IAuthProvider';

export class TwitterAuthProvider implements IAuthProvider {
  private readonly provider: PlainTwitterAuthProvider;

  constructor() {
    this.provider = new PlainTwitterAuthProvider();
  }

  getProvider(): AuthProvider {
    return this.provider;
  }

  getCredentials(userCredentials: UserCredential): OAuthCredential {
    return PlainTwitterAuthProvider.credentialFromResult(userCredentials) as OAuthCredential;
  }

  async getToken({userData}: UserParams): Promise<OAuthTokenData> {
    if (!userData) {
      throw new InvalidAuthParamsError();
    }
    const token = await getIdToken(userData);
    return {
      type: OAuthTokenTypes.Firebase,
      token,
    };
  }
}
