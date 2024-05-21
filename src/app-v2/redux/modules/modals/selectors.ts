import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {MODALS_MODULE_NAME} from './constants';
import {ModalsStore} from './types';

export const selectCurrentModalAndProps = (state: ModalsStore) => {
  if (!(MODALS_MODULE_NAME in state)) {
    throw new NoSuchModuleError(MODALS_MODULE_NAME);
  }
  return state[MODALS_MODULE_NAME];
};
