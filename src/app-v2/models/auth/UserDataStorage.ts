import {CURRENT_USER_TOKEN_FIELD} from '../../constants/common';
import {NoUserDataError} from './errors/NoUserDataError';
import {OAuthTokenTypes, UserData} from './types';

const EMAIL_FIELD = 'current-user-email';
const PUBLIC_KEY_FIELD = 'current-user-public-key';
const OAUTH_TYPE_FIELD = 'current-user-oauth-type';
const NFT_QUERY = 'current-user-nft-query';

export class UserDataStorage {
  setUserEmail(email: string): void {
    localStorage.setItem(EMAIL_FIELD, email);
  }

  setUserPublicKey(publicKey: string): void {
    localStorage.setItem(PUBLIC_KEY_FIELD, publicKey);
  }

  setUserToken(token: string): void {
    localStorage.setItem(CURRENT_USER_TOKEN_FIELD, token);
  }

  setUserOauthType(type: OAuthTokenTypes): void {
    localStorage.setItem(OAUTH_TYPE_FIELD, type);
  }

  setNftQuery(query: string): void {
    localStorage.setItem(NFT_QUERY, query);
  }

  setUserData(email: string, publicKey: string, token?: string) {
    this.setUserEmail(email);
    this.setUserPublicKey(publicKey);
    if (token) {
      this.setUserToken(token);
    }
  }

  getUserEmail(): string {
    const email = localStorage.getItem(EMAIL_FIELD);
    if (!email) {
      throw new NoUserDataError();
    }
    return email;
  }

  getUserPublicKey(): string {
    const publicKey = localStorage.getItem(PUBLIC_KEY_FIELD);
    if (!publicKey) {
      throw new NoUserDataError();
    }
    return publicKey;
  }

  getUserToken(): string | null {
    return localStorage.getItem(CURRENT_USER_TOKEN_FIELD);
  }

  getUserOauthType(): OAuthTokenTypes | null {
    const type = localStorage.getItem(OAUTH_TYPE_FIELD);
    if (!type) {
      return null;
    }
    return type as OAuthTokenTypes;
  }

  getUserData(): UserData {
    const email = this.getUserEmail();
    const token = this.getUserToken() ?? undefined;
    const publicKey = this.getUserPublicKey();
    return {email, token, publicKey};
  }

  getNftQuery(): string | null {
    return localStorage.getItem(NFT_QUERY);
  }

  clearNftQuery(): void {
    localStorage.removeItem(NFT_QUERY);
  }

  clearUserData(): void {
    localStorage.clear();
  }
}
