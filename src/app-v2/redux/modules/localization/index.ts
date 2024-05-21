import {LocalizationService} from '../../../models/localization/LocalizationService';
import {StoreModule} from '../../base/types';
import {LOCALIZATION_MODULE_NAME} from './constants';
import {loadUserLocaleMiddleware, setUserLocaleMiddleware, startUserLocaleLoadingMiddleware} from './middlewares';
import {userLocaleReducer} from './reducers';

export const createLocalizationModule = (localizationService: LocalizationService): StoreModule => ({
  title: LOCALIZATION_MODULE_NAME,
  moduleReducer: userLocaleReducer,
  middlewares: [
    startUserLocaleLoadingMiddleware,
    loadUserLocaleMiddleware(localizationService),
    setUserLocaleMiddleware(localizationService),
  ],
});
