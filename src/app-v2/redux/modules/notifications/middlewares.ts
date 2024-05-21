import {
  NOTIFICATIONS_API_DEFAULT_LIMIT,
  NOTIFICATIONS_API_DEFAULT_PAGE,
} from 'app-v2/api/notifications/notifications-api';
import {INotificationsApi} from 'app-v2/api/notifications/types';
import {AnyAction, MiddlewareAPI} from 'redux';

import {UserDataDocument} from '../auth/actions';
import {AuthStore} from '../auth/types';
import {
  FetchNotificationsCommand,
  FetchNotificationsFailed,
  FetchNotificationsFinished,
  FetchNotificationsNextPageCommand,
  MarkAllAsReadCommand,
  MarkAsReadCommand,
  MarkAsUnreadCommand,
  NewNotificationsCount,
  NotificationsCount,
  NotificationsDocument,
  NotificationsPageNumber,
} from './actions';

const getUserId = ({auth}: AuthStore): string => {
  const {id} = auth?.userData;
  if (!id) throw Error('User not authenticated');
  return id;
};

export const fetchInitialNotifications =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    // We need to wait until the user is authenticated and id token extracted before fetching notifications
    if (action.type === UserDataDocument.type && !!action.payload?.id) {
      dispatch(NotificationsPageNumber.create(NOTIFICATIONS_API_DEFAULT_PAGE));
      dispatch(FetchNotificationsCommand.create());
    }
  };

export const fetchNotifications =
  (notificationsApi: INotificationsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchNotificationsCommand.type) {
        try {
          const userId = getUserId(getState());
          const {data, total} = await notificationsApi.getNotifications(userId);
          dispatch(NotificationsDocument.create(data));
          dispatch(NotificationsCount.create(total));

          const newNotificationsCount = await notificationsApi.getNewNotificationsCount(userId);
          dispatch(NewNotificationsCount.create(newNotificationsCount));
        } catch (error) {
          console.error(error);
          dispatch(FetchNotificationsFailed.create());
        } finally {
          dispatch(FetchNotificationsFinished.create());
        }
      }
    };
  };

export const fetchNextPage =
  (notificationsApi: INotificationsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === FetchNotificationsNextPageCommand.type) {
        try {
          const state = getState();
          const userId = getUserId(state);
          const {page, notifications} = state.notifications;
          const nextPage = page + 1;

          const {data, total} = await notificationsApi.getNotifications(userId, {
            page: nextPage,
            limit: NOTIFICATIONS_API_DEFAULT_LIMIT,
          });

          const dedupedNotifications = notificationsApi.dedupeNotifications(notifications, data);

          dispatch(NotificationsPageNumber.create(nextPage));
          dispatch(NotificationsDocument.create(dedupedNotifications));
          dispatch(NotificationsCount.create(total));
        } catch (error) {
          console.error(error);
          dispatch(FetchNotificationsFailed.create());
        } finally {
          dispatch(FetchNotificationsFinished.create());
        }
      }
    };
  };

export const markAsRead =
  (notificationsApi: INotificationsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === MarkAsReadCommand.type) {
        try {
          const userId = getUserId(getState());
          await notificationsApi.markAsRead(userId, action.payload);
          dispatch(MarkAsReadCommand.create(action.payload));
          dispatch(FetchNotificationsCommand.create());
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

export const markAllAsRead =
  (notificationsApi: INotificationsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === MarkAllAsReadCommand.type) {
        try {
          const userId = getUserId(getState());
          await notificationsApi.markAllAsRead(userId);
          dispatch(FetchNotificationsCommand.create());
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

export const markAsUnread =
  (notificationsApi: INotificationsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) => {
    return async (action: AnyAction): Promise<void> => {
      next(action);
      if (action.type === MarkAsUnreadCommand.type) {
        try {
          const userId = getUserId(getState());
          await notificationsApi.markAsUnread(userId, action.payload);
          dispatch(FetchNotificationsCommand.create());
        } catch (error) {
          console.error(error);
        }
      }
    };
  };
