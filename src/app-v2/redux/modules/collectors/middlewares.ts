import {AnyAction, MiddlewareAPI} from 'redux';

import {CollectorApi} from '../../../api/collector/CollectorApi';
import {selectCurrentLocale} from '../localization/selectors';
import {FetchProfileCommand, FetchProfileFinished, FetchProfileStarted, ProfileDocument} from './actions';

export const fetchProfile =
  (profileApi: CollectorApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchProfileCommand.type) {
        try {
          const locale = selectCurrentLocale(getState());
          dispatch(FetchProfileStarted.create(action.payload));
          const profile = await profileApi.getCollectedNftsExhibitionsCreators(locale, action.payload);
          dispatch(ProfileDocument.create(profile, action.payload));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(FetchProfileFinished.create(action.payload));
        }
      }
    };
  };
