import {Auth} from '@firebase/auth';
import {
  FacebookAuthProvider,
  getIdToken as getFirebaseIdToken,
  GoogleAuthProvider,
  OAuthCredential,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';

import {APP_ID, FIREBASE_API_KEY, IDENTITY_API_URL} from '../../config/common';
import {LOCAL_STORAGE_KEY_TOKEN} from '../../const/storage-keys';
import {get, post} from '../lib/request';
import analyticService, {AnalyticEventsEnum} from './analytic.service';

const firebaseErrorMessage = 'Firebase is not configured!';

export const CLOSED_BY_USER_ERROR = 'auth/popup-closed-by-user';

export interface SocialResult {
  credential: OAuthCredential;
  user: {userEmail: string};
}

export type SocialNetworks = 'google.com' | 'facebook.com' | 'apple.com' | 'twitter.com';

let auth: Auth | null = null;
if (FIREBASE_API_KEY()) {
  // const firebaseConfig = {
  //   apiKey: FIREBASE_API_KEY(),
  //   authDomain: FIREBASE_AUTH_DOMAIN(),
  //   projectId: FIREBASE_PROJECT_ID(),
  //   appId: FIREBASE_APP_ID(),
  // };
  // if (!enableAppV2()) {
  //   const app = initializeApp(firebaseConfig);
  //   auth = getAuth(app);
  // }
  auth = (window as any).auth;
}

const getGoogleProvider = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');

  return googleProvider;
};
const getFacebookProvider = () => {
  const fbProvider = new FacebookAuthProvider();
  fbProvider.addScope('email');
  fbProvider.addScope('public_profile');
  fbProvider.setCustomParameters({display: 'popup'});

  return fbProvider;
};
const getAppleProvider = () => {
  const appleProvider = new OAuthProvider('apple.com');

  appleProvider.addScope('email');
  appleProvider.addScope('name');

  return appleProvider;
};

const getTwitterProvider = () => new TwitterAuthProvider();

const authProviders: {[key in SocialNetworks]: any} = {
  'google.com': {
    provider: GoogleAuthProvider,
    providerInstance: getGoogleProvider(),
  },
  'facebook.com': {
    provider: FacebookAuthProvider,
    providerInstance: getFacebookProvider(),
  },
  'apple.com': {
    provider: OAuthProvider,
    providerInstance: getAppleProvider(),
  },
  'twitter.com': {
    provider: TwitterAuthProvider,
    providerInstance: getTwitterProvider(),
  },
};

export const getEmailFromSocialCredential = (credential: UserCredential): string =>
  (credential.user.email || credential.user.providerData.find((providerData) => providerData.email)?.email) as string;

export const signInWithSocial = (social: SocialNetworks): Promise<SocialResult> => {
  const {providerInstance, provider} = authProviders[social];

  if (!auth) {
    throw new Error(firebaseErrorMessage);
  }

  return signInWithPopup(auth, providerInstance)
    .then((result: UserCredential) => {
      const credential = provider.credentialFromResult(result) as OAuthCredential;

      const userEmail = getEmailFromSocialCredential(result);
      return {user: {userEmail}, credential};
    })
    .catch((error) => {
      console.error(error);
      throw new Error(`Sign in error: ${error.message}`);
    });
};

export interface IKeys {
  publicKey: string;
  token: string;
  locale: string;
}

export interface UpdateUserLocaleResult {
  userId: number;
  locale: string;
}

interface FetchWalletParams {
  type: string;
  token?: string;
  email?: string;
  password?: string;
  externalUserId?: string;
}

export const fetchWallet = async (authMethod: FetchWalletParams): Promise<IKeys> => {
  const json = (await post(
    `/identity/fetch-wallet`,
    {
      appId: APP_ID(),
      authMethod,
    },
    {base: IDENTITY_API_URL()},
  )) as Record<string, IKeys>;

  return json.data;
};

export const getPrivatePublicKeysByEmail = async (email: string, otpCode: string): Promise<IKeys> => {
  return fetchWallet({
    type: 'EMAIL',
    password: otpCode,
    email,
  });
};

export const getUserInfoByToken = async (userToken: string): Promise<IKeys> => {
  const json = (await get(`/identity/me`, {
    base: IDENTITY_API_URL(),
    headers: {Authorization: `Bearer ${userToken}`},
  })) as Record<string, IKeys>;

  return json.data;
};

export const getOrCreateByExternalAuthToken = async (
  code: string,
  redirectUri: string,
): Promise<IKeys & {email: string}> => {
  const response = (await post(
    `/identity/authenticate-by-code`,
    {appId: APP_ID(), code, redirectUri},
    {base: IDENTITY_API_URL()},
  )) as {
    code: string;
    data: {
      email: string;
      publicKey: string;
      token: string;
      locale: string;
    };
  };

  return response.data;
};

export const resendOtpCodeByEmail = async (email: string): Promise<{code: string} | void> => {
  return post(`/identity/reset-otp-code`, {appId: APP_ID(), email}, {base: IDENTITY_API_URL()}) as Promise<{
    code: string;
  }>;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);
};

export const attachEmail = async (email: string) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '';
  await post(
    `/identity/attach-email`,
    {appId: APP_ID(), email},
    {
      base: IDENTITY_API_URL(),
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );
};

export const signInOrAttachEmail = async (email: string, locale: string): Promise<void> => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '';
  if (accessToken) {
    return attachEmail(email);
  }

  return signInByEmail(email, locale);
};

export const signInByEmail = async (email: string, locale: string): Promise<void> => {
  await post(`/identity/auth`, {appId: APP_ID(), email, locale}, {base: IDENTITY_API_URL()});
};

export const getSocialTokenAndTypeByProvider = async (credential: OAuthCredential) => {
  if (credential.providerId === 'facebook.com') {
    return {
      type: 'OAUTH_FACEBOOK',
      token: credential.accessToken,
    };
  }

  if (credential.providerId === 'google.com') {
    return {
      type: 'OAUTH_GOOGLE',
      token: credential.idToken,
    };
  }

  if (!auth) {
    throw new Error(firebaseErrorMessage);
  }

  const firebaseToken = await getFirebaseIdToken(auth.currentUser as User);

  return {
    type: 'FIREBASE',
    token: firebaseToken,
  };
};

export const getPrivatePublicKeysBySocial = async (credential: OAuthCredential): Promise<IKeys> => {
  const {type, token} = await getSocialTokenAndTypeByProvider(credential);

  const wallet = fetchWallet({
    type,
    token,
  });

  analyticService.track(AnalyticEventsEnum.USER_AUTHENTICATED_WEB, {
    uid: auth?.currentUser?.uid || null,
    providerId: auth?.currentUser?.providerId || null,
    email: auth?.currentUser?.email || null,
  });

  return wallet;
};

export const getPrivatePublicKeysBySocialReactNativeToken = (firebaseToken: string): Promise<IKeys> => {
  const wallet = fetchWallet({
    type: 'FIREBASE',
    token: firebaseToken,
  });

  analyticService.track(AnalyticEventsEnum.USER_AUTHENTICATED_RN, {
    uid: null, // TODO: pass from RN layer
    providerId: null, // TODO: pass from RN layer
    email: null, // TODO: pass from RN layer
  });

  return wallet;
};

export const resendSocialOTP = async (type: string, token: string) => {
  return post(`/identity/reset-social-code`, {type, token}, {base: IDENTITY_API_URL()}) as Promise<{
    code: string;
  }>;
};

export const confirmSocialEmail = async (type: string, token: string, password: string) => {
  return post(`/identity/confirm-social-method`, {type, token, password}, {base: IDENTITY_API_URL()}) as Promise<{
    code: string;
  }>;
};

export const isUnverifiedEmail = (status: number) => status === 403;

export const getIdToken = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '';

  return get(`/identity/id-token`, {
    type: 'text',
    base: IDENTITY_API_URL(),
    headers: {Authorization: `Bearer ${accessToken}`},
  });
};

export const updateUserLocale = async (userToken: string, locale: string): Promise<UpdateUserLocaleResult> => {
  const json = (await post(
    `/identity/update-locale`,
    {locale},
    {
      base: IDENTITY_API_URL(),
      headers: {Authorization: `Bearer ${userToken}`},
    },
  )) as Record<string, UpdateUserLocaleResult>;

  return json.data;
};
