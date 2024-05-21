import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {LOCALIZATION_MODULE_NAME} from './constants';
import {LocalizationStorageType} from './types';

export const selectCurrentLocale = (state: LocalizationStorageType) => {
  if (!(LOCALIZATION_MODULE_NAME in state)) {
    throw new NoSuchModuleError(LOCALIZATION_MODULE_NAME);
  }
  return state[LOCALIZATION_MODULE_NAME]!;
};
