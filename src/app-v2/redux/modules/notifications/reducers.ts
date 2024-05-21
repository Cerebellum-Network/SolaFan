import {NOTIFICATIONS_API_DEFAULT_PAGE} from 'app-v2/api/notifications/notifications-api';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {AnyAction, combineReducers} from 'redux';

import {
  FetchNotificationsFailed,
  FetchNotificationsFinished,
  FetchNotificationsStarted,
  NewNotificationsCount,
  NotificationsCount,
  NotificationsDocument,
  NotificationsPageNumber,
} from './actions';

export const notificationsReducer = (
  state: TransactionalNotification[] = [],
  action: AnyAction,
): TransactionalNotification[] => {
  switch (action.type) {
    case NotificationsDocument.type:
      return action.payload;
    default:
      return state;
  }
};

export const notificationsPageReducer = (state: number = NOTIFICATIONS_API_DEFAULT_PAGE, action: AnyAction): number => {
  if (action.type === NotificationsPageNumber.type) {
    return action.payload;
  }
  return state;
};

export const notificationsLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchNotificationsStarted.type:
      return true;
    case FetchNotificationsFinished.type:
      return false;
    default:
      return state;
  }
};

export const notificationsErrorReducer = (state: any = null, action: AnyAction): any => {
  if (action.type === FetchNotificationsFailed.type) {
    return action.payload;
  }
  return state;
};

export const notificationCountReducer = (state: number = 0, action: AnyAction): number => {
  if (action.type === NotificationsCount.type) {
    return action.payload;
  }
  return state;
};

export const newNotificationsCountReducer = (state: number = 0, action: AnyAction): number => {
  if (action.type === NewNotificationsCount.type) {
    return action.payload;
  }
  return state;
};

export const notificationsModuleReducer = combineReducers({
  notifications: notificationsReducer,
  total: notificationCountReducer,
  loading: notificationsLoadingReducer,
  error: notificationsErrorReducer,
  newNotificationsCount: newNotificationsCountReducer,
  page: notificationsPageReducer,
});
