import {AuthProvider, OAuthCredential, User, UserCredential} from 'firebase/auth';

import {OAuthTokenData} from '../types';

export type UserParams = {
  userData?: User;
  credentials?: OAuthCredential;
};

export interface IAuthProvider {
  getProvider(): AuthProvider;
  getCredentials(userCredentials: UserCredential): OAuthCredential;
  getToken(userParams: UserParams): Promise<OAuthTokenData>;
}
