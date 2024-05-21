import {ExhibitCardInterface, ExhibitionStatus} from '@cere/services-types';
import {AnyAction, combineReducers} from 'redux';

import {CmsHome} from '../../../utils/type-guards/exhibits';
import {
  ExhibitsDocument,
  ExhibitsFiltersDocument,
  ExhibitsSeoDocument,
  FetchExhibitsFinishedEvent,
  FetchExhibitsSeoFinishedEvent,
  FetchExhibitsSeoStartedEvent,
  FetchExhibitsStartedEvent,
} from './actions';

export const exhibitsPageReducer = (state: ExhibitCardInterface[] = [], action: AnyAction): any => {
  switch (action.type) {
    case ExhibitsDocument.type:
      return action.payload;
    default:
      return state || [];
  }
};

export const exhibitsPageLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchExhibitsStartedEvent.type:
      return true;
    case FetchExhibitsFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

export const exhibitsPageSeoReducer = (state: CmsHome[] = [], action: AnyAction): CmsHome[] => {
  switch (action.type) {
    case ExhibitsSeoDocument.type:
      return action.payload;
    default:
      return state;
  }
};

export const exhibitsPageSeoLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchExhibitsSeoStartedEvent.type:
      return true;
    case FetchExhibitsSeoFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

export const exhibitsPageFilterReducer = (
  state: ExhibitionStatus = ExhibitionStatus.STARTED,
  action: AnyAction,
): ExhibitionStatus | string => {
  switch (action.type) {
    case ExhibitsFiltersDocument.type:
      return action.payload;
    default:
      return state;
  }
};

export const exhibitsPageModuleReducer = combineReducers({
  exhibits: exhibitsPageReducer,
  exhibitsLoading: exhibitsPageLoadingReducer,
  exhibitsSeo: exhibitsPageSeoReducer,
  exhibitsSeoLoading: exhibitsPageSeoLoadingReducer,
  exhibitsFilter: exhibitsPageFilterReducer,
});
