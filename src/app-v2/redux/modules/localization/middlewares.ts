import {AnyAction, MiddlewareAPI} from 'redux';

import {LocalizationService} from '../../../models/localization/LocalizationService';
import {InitAppCommand} from '../../base/actions';
import {
  LoadUserLocaleCommand,
  LoadUserLocaleFailedEvent,
  LoadUserLocaleSuccessEvent,
  SelectUserLocaleCommand,
  SelectUserLocaleFailedEvent,
  UserLocaleDocument,
} from './actions';

export const startUserLocaleLoadingMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === InitAppCommand.type) {
      dispatch(LoadUserLocaleCommand.create());
    }
  };

export const loadUserLocaleMiddleware =
  (localizationService: LocalizationService) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === LoadUserLocaleCommand.type) {
      try {
        const locale = localizationService.getUserLocale();
        dispatch(LoadUserLocaleSuccessEvent.create());
        dispatch(UserLocaleDocument.create(locale));
      } catch (e) {
        dispatch(LoadUserLocaleFailedEvent.create(e.message));
      }
    }
  };

export const setUserLocaleMiddleware =
  (localizationService: LocalizationService) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === SelectUserLocaleCommand.type) {
      try {
        const locale = action.payload;
        localizationService.setUserLocale(locale);
        dispatch(UserLocaleDocument.create(locale));
      } catch (e) {
        dispatch(SelectUserLocaleFailedEvent.create(e.message));
      }
    }
  };
