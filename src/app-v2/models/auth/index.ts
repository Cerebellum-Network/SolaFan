import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID} from '../../../config/common';
import {authApi} from '../../api/auth';
import {FirebaseAuthService} from './FirebaseAuthService';
import {AuthProvidersFactory} from './providers/AuthProvidersFactory';
import {UserDataStorage} from './UserDataStorage';

const authProvidersFactory = new AuthProvidersFactory();
export const userDataStorage = new UserDataStorage();
export const authService = new FirebaseAuthService(authApi, authProvidersFactory, userDataStorage, {
  apiKey: FIREBASE_API_KEY() ?? '',
  authDomain: FIREBASE_AUTH_DOMAIN() ?? '',
  projectId: FIREBASE_PROJECT_ID() ?? '',
  appId: FIREBASE_APP_ID() ?? '',
});
