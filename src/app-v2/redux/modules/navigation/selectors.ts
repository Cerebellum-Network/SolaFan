import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {NAVIGATION_MODULE_NAME} from './contants';
import {NavigationStoreType} from './types';

export const selectHistoryObject = (state: NavigationStoreType) => {
  if (!(NAVIGATION_MODULE_NAME in state)) {
    throw new NoSuchModuleError(NAVIGATION_MODULE_NAME);
  }
  return state[NAVIGATION_MODULE_NAME];
};
