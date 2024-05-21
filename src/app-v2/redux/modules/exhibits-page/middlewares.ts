import {AnyAction, MiddlewareAPI} from 'redux';

import {IExhibitsApi} from '../../../api/exhibits/IExhibitsApi';
import {ExhibitsDocument} from '../exhibits/actions';
import {
  ExhibitsFiltersDocument,
  ExhibitsSeoDocument,
  FetchExhibitsCommand,
  FetchExhibitsFinishedEvent,
  FetchExhibitsSeoCommand,
  FetchExhibitsSeoFinishedEvent,
  FetchExhibitsSeoStartedEvent,
  FetchExhibitsStartedEvent,
} from './actions';
import {ExhibitsDocument as ExhibitsDocumentPage} from './actions';
import {selectExhibitionsFilter} from './selectors';

export const loadExhibitsMiddleware =
  (exhibitsApi: IExhibitsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchExhibitsCommand.type) {
        try {
          dispatch(FetchExhibitsStartedEvent.create());
          const filter = selectExhibitionsFilter(getState());
          const exhibits = await exhibitsApi.getAllExhibits('en', filter);
          dispatch(ExhibitsDocument.create(exhibits));
          dispatch(ExhibitsDocumentPage.create(exhibits));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(FetchExhibitsFinishedEvent.create());
        }
      }
    };
  };

export const loadExhibitsWithFiltersMiddleware =
  (exhibitsApi: IExhibitsApi) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === ExhibitsFiltersDocument.type) {
        try {
          dispatch(FetchExhibitsStartedEvent.create());
          const exhibits = await exhibitsApi.getAllExhibits('en', action.payload);
          dispatch(ExhibitsDocument.create(exhibits));
          dispatch(ExhibitsDocumentPage.create(exhibits));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(FetchExhibitsFinishedEvent.create());
        }
      }
    };
  };

export const loadExhibitsSeoMiddleware =
  (exhibitsApi: IExhibitsApi) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchExhibitsSeoCommand.type) {
        try {
          dispatch(FetchExhibitsSeoStartedEvent.create());
          const seo = await exhibitsApi.getExhibitsSeo(1, 'en');
          dispatch(ExhibitsSeoDocument.create(seo));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(FetchExhibitsSeoFinishedEvent.create());
        }
      }
    };
  };
