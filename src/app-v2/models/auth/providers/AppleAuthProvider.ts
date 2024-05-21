import {AuthProvider, getIdToken, OAuthCredential, OAuthProvider, UserCredential} from 'firebase/auth';

import {InvalidAuthParamsError} from '../errors/InvalidAuthParamsError';
import {OAuthTokenData, OAuthTokenTypes} from '../types';
import {IAuthProvider, UserParams} from './IAuthProvider';

export class AppleAuthProvider implements IAuthProvider {
  private readonly provider: OAuthProvider;

  constructor() {
    this.provider = new OAuthProvider('apple.com');
    this.provider.addScope('email');
    this.provider.addScope('name');
  }

  getProvider(): AuthProvider {
    return this.provider;
  }

  getCredentials(userCredentials: UserCredential): OAuthCredential {
    return OAuthProvider.credentialFromResult(userCredentials) as OAuthCredential;
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
