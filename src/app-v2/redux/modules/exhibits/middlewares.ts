import {AnyAction, MiddlewareAPI} from 'redux';

import {IExhibitApi} from '../../../api/exhibit/IExhibitApi';
import {FetchExhibitsFinishedEvent, FetchExhibitsStartedEvent} from '../exhibits-page/actions';
import {selectCurrentLocale} from '../localization/selectors';
import {ExhibitsDocument, LoadExhibitsArrayByIdsCommand} from './actions';
import {selectExhibits} from './selectors';

export const loadArrayExhibitsByIdsMiddleware =
  (exhibitApi: IExhibitApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction): Promise<void> => {
    next(action);
    if (action.type === LoadExhibitsArrayByIdsCommand.type) {
      const events = selectExhibits(getState()) || {};
      const exhibitsSlugs: string[] = action.payload;
      const locale = selectCurrentLocale(getState());
      dispatch(FetchExhibitsStartedEvent.create());
      for (const slug of exhibitsSlugs) {
        const event = await exhibitApi.getEvent(slug, false, locale);
        if (event) {
          events[slug] = event;
        }
      }
      dispatch(ExhibitsDocument.create(Object.values(events)));
      dispatch(FetchExhibitsFinishedEvent.create());
    }
  };
