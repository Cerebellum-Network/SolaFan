import {createSelector} from 'reselect';

import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {LOADER_MODULE_NAME} from './constants';
import {LoaderStore} from './types';

const selectLoaderData = (store: LoaderStore) => {
  if (!store[LOADER_MODULE_NAME]) {
    throw new NoSuchModuleError(LOADER_MODULE_NAME);
  }
  return store[LOADER_MODULE_NAME];
};
export const selectLoaderState = createSelector(selectLoaderData, (loader) => loader.state);
