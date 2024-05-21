import {AnyAction, MiddlewareAPI} from 'redux';

import {IUserNftsApi} from '../../../api/user-nfts-page/IUserNftsApi';
import {selectCurrentLocale} from '../localization/selectors';
import {LoadNftsArrayByIdsCommand} from '../nfts/actions';
import {FetchUserNftsCommand, FetchUserNftsFinishedEvent, UserNftsDocument} from './actions';

export const loadUserNfts =
  (userNftsApi: IUserNftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchUserNftsCommand.type) {
        try {
          const queryParam = action.payload;
          const locale = selectCurrentLocale(getState());
          const nfts = await userNftsApi.getNfts(queryParam, locale);
          dispatch(UserNftsDocument.create(nfts)); // FIXME should be one nfts store
          dispatch(LoadNftsArrayByIdsCommand.create([]));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(FetchUserNftsFinishedEvent.create());
        }
      }
    };
  };
