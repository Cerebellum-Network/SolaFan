import {AnyAction, MiddlewareAPI} from 'redux';

import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {
  CreatorsDocument,
  CreatorsFetchErrorEvent,
  CreatorsFetchingFinishedEvent,
  CreatorsFetchingStartedEvent,
  FetchCreatorsCommand,
} from './actions/page';

export const loadCreatorsMiddleware =
  (creatorsApi: ICreatorsApi) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction): Promise<void> => {
    next(action);
    if (action.type === FetchCreatorsCommand.type) {
      try {
        dispatch(CreatorsFetchingStartedEvent.create());
        const creators = await creatorsApi.getAllCreators('en');
        dispatch(CreatorsDocument.create(creators));
      } catch (error) {
        dispatch(CreatorsFetchErrorEvent.create(error.message));
      } finally {
        dispatch(CreatorsFetchingFinishedEvent.create());
      }
    }
  };
