import {ExhibitCardInterface} from '@cere/services-types/dist/types';
import {AnyAction, MiddlewareAPI} from 'redux';

import {IExhibitApi} from '../../../api/exhibit/IExhibitApi';
import {ExhibitDocument, ExhibitsDocument} from '../exhibits/actions';
import {selectCurrentLocale} from '../localization/selectors';
import {
  EventDocument,
  FetchEventCommand,
  FetchEventError,
  FetchEventFinishedEvent,
  FetchEventStartedEvent,
  FetchMoreExhibitsCommand,
  FetchMoreExhibitsError,
  FetchMoreExhibitsFinishedEvent,
  FetchMoreExhibitsStartedEvent,
  MoreExhibitsDocument,
} from './actions';

export const loadEventMiddleware =
  (exhibitApi: IExhibitApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction): Promise<void> => {
    next(action);
    if (action.type === FetchEventCommand.type) {
      const {isPreviewMode, slug} = action.payload;
      const locale = selectCurrentLocale(getState());
      try {
        dispatch(FetchEventStartedEvent.create());
        const event = await exhibitApi.getEvent(slug, isPreviewMode, locale);
        dispatch(EventDocument.create(event));
        dispatch(ExhibitDocument.create(event as ExhibitCardInterface));
      } catch (error) {
        dispatch(FetchEventError.create(error.message));
      } finally {
        dispatch(FetchEventFinishedEvent.create());
      }
    }
  };

export const loadMoreExhibitsMiddleware =
  (exhibitApi: IExhibitApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction): Promise<void> => {
    next(action);
    if (action.type === FetchMoreExhibitsCommand.type) {
      const {creatorId} = action.payload;
      const locale = selectCurrentLocale(getState());
      try {
        dispatch(FetchMoreExhibitsStartedEvent.create());
        const moreExhibits = await exhibitApi.getCreatorExhibits(creatorId, locale);
        dispatch(MoreExhibitsDocument.create(moreExhibits));
        dispatch(ExhibitsDocument.create(moreExhibits));
      } catch (error) {
        dispatch(FetchMoreExhibitsError.create(error));
      } finally {
        dispatch(FetchMoreExhibitsFinishedEvent.create());
      }
    }
  };
