import {OAuthCredential} from 'firebase/auth';

export enum SupportedAuthProviders {
  Google = 'google.com',
  Facebook = 'facebook.com',
  Apple = 'apple.com',
  Twitter = 'twitter.com',
}

export enum OAuthTokenTypes {
  Google = 'OAUTH_GOOGLE',
  Facebook = 'OAUTH_FACEBOOK',
  Firebase = 'FIREBASE',
}

export type OAuthTokenData = {
  type: OAuthTokenTypes;
  token: string;
};

export type SocialAuthResult = {
  credential: OAuthCredential;
  oauth: OAuthTokenData;
  user: {email: string; token: string};
};

export type UserData = {
  email: string;
  publicKey: string;
  token?: string;
  id?: string;
};

export type SocialUserData = UserData & {oauthType: OAuthTokenTypes};
