import {CmsAppConfig} from '@cere/services-types';
import {Store} from 'redux';
import {createSelector} from 'reselect';

import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {APP_CONFIG_MODULE_NAME} from './constants';

const root = (state: ReturnType<Store['getState']>) => {
  if (!state[APP_CONFIG_MODULE_NAME]) {
    throw new NoSuchModuleError(APP_CONFIG_MODULE_NAME);
  }
  return state[APP_CONFIG_MODULE_NAME];
};

export const selectAppConfig: (state: any) => CmsAppConfig = createSelector(root, (state) => state.config);
export const selectAppConfigIsLoading: (state: any) => boolean = createSelector(root, (state) => state.loading);
export const selectAppConfigLoadingError: (state: any) => string | null = createSelector(root, (state) => state.error);
export const selectAppConfigLoadedSuccessFully: (state: any) => boolean = createSelector(
  root,
  (state) => state.success,
);
