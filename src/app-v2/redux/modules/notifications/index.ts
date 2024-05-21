import {INotificationsApi} from 'app-v2/api/notifications/types';

import {NOTIFICATIONS_MODULE_NAME} from './constants';
import {
  fetchInitialNotifications,
  fetchNextPage,
  fetchNotifications,
  markAllAsRead,
  markAsRead,
  markAsUnread,
} from './middlewares';
import {notificationsModuleReducer} from './reducers';

export const createNotificationsModule = (notificationsApi: INotificationsApi) => ({
  title: NOTIFICATIONS_MODULE_NAME,
  moduleReducer: notificationsModuleReducer,
  middlewares: [
    fetchInitialNotifications,
    fetchNotifications(notificationsApi),
    fetchNextPage(notificationsApi),
    markAsRead(notificationsApi),
    markAsUnread(notificationsApi),
    markAllAsRead(notificationsApi),
  ],
});
