import {createSelector} from 'reselect';

import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {AUTH_MODULE_NAME} from './constants';
import {AuthState, AuthStore} from './types';

const getRoot = (store: AuthStore): AuthState => store[AUTH_MODULE_NAME];

export const selectUserData = (store: AuthStore): AuthState['userData'] => {
  if (!(AUTH_MODULE_NAME in store)) {
    throw new NoSuchModuleError(AUTH_MODULE_NAME);
  }
  return store[AUTH_MODULE_NAME].userData;
};

export const selectUserEmail = (store: AuthStore) => {
  if (!(AUTH_MODULE_NAME in store)) {
    throw new NoSuchModuleError(AUTH_MODULE_NAME);
  }
  return selectUserData(store)?.email;
};

export const selectUserPublicKey = (store: AuthStore) => {
  if (!(AUTH_MODULE_NAME in store)) {
    throw new NoSuchModuleError(AUTH_MODULE_NAME);
  }
  return selectUserData(store)?.publicKey;
};

export const selectAuthState = (store: AuthStore) => {
  if (!(AUTH_MODULE_NAME in store)) {
    throw new NoSuchModuleError(AUTH_MODULE_NAME);
  }
  return {
    authError: store[AUTH_MODULE_NAME].authError,
    authPending: store[AUTH_MODULE_NAME].authPending,
  };
};

export const getUserData = createSelector(getRoot, (state) => state.userData);
export const getUserEmail: (state: any) => string = createSelector(getUserData, (userData) => userData?.email);

export const getUserSocialData = createSelector(getRoot, (state) => state.socialData);
