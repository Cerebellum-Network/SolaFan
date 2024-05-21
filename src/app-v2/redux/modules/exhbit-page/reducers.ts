import {ExhibitCardInterface} from '@cere/services-types/dist/types';
import {AnyAction, combineReducers} from 'redux';

import {CmsExhibit} from '../../../types/exhibit';
import {EventDocument, FetchEventFinishedEvent, FetchEventStartedEvent, MoreExhibitsDocument} from './actions';

export const eventReducer = (state: CmsExhibit | null = null, action: AnyAction) => {
  switch (action.type) {
    case EventDocument.type:
      return action.payload as CmsExhibit;
    default:
      return state;
  }
};

export const eventLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchEventStartedEvent.type:
      return true;
    case FetchEventFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

export const exhibitsReducer = (state: CmsExhibit[] = [], action: AnyAction): ExhibitCardInterface[] => {
  switch (action.type) {
    case MoreExhibitsDocument.type:
      return action.payload as CmsExhibit[];
    default:
      return state;
  }
};

export const exhibitModuleReducer = combineReducers({
  event: eventReducer,
  eventLoading: eventLoadingReducer,
  exhibits: exhibitsReducer,
});
