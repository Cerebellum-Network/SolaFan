import {AnyAction, MiddlewareAPI} from 'redux';

import {IAppConfigApi} from '../../../api/app-config/IAppConfigApi';
import {InitAppCommand} from '../../base/actions';
import {selectCurrentLocale} from '../localization/selectors';
import {
  AppConfigDocument,
  LoadAppConfigCommand,
  LoadAppConfigFailedEvent,
  LoadAppConfigIsLoadingEvent,
  LoadAppConfigSuccessEvent,
} from './actions';

export const startAppConfigLoadingMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === InitAppCommand.type) {
      dispatch(LoadAppConfigCommand.create());
    }
  };

export const loadAppConfigMiddleware =
  (configApi: IAppConfigApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadAppConfigCommand.type) {
      try {
        const locale = selectCurrentLocale(getState());
        const config = await configApi.getAppConfig(locale);
        dispatch(AppConfigDocument.create(config));
        dispatch(LoadAppConfigSuccessEvent.create());
        dispatch(LoadAppConfigFailedEvent.create(null));
      } catch (e) {
        dispatch(LoadAppConfigFailedEvent.create(e.message));
      } finally {
        dispatch(LoadAppConfigIsLoadingEvent.create(false));
      }
    }
  };
