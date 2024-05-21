import {StoreModule} from '../../base/types';
import {ADD_TO_CALENDAR} from './constants';
import {addToCalendarMiddleware} from './middlewares';

export const createAddToCalendarModule = (): StoreModule => ({
  title: ADD_TO_CALENDAR,
  middlewares: [addToCalendarMiddleware],
});
