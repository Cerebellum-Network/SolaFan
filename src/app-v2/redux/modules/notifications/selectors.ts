import {TransactionalNotification} from 'app-v2/api/notifications/types';

import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {NOTIFICATIONS_MODULE_NAME} from './constants';
import {NotificationsStore} from './types';

export const selectNotificationsStore = (store: NotificationsStore) => {
  if (!(NOTIFICATIONS_MODULE_NAME in store)) {
    throw new NoSuchModuleError(NOTIFICATIONS_MODULE_NAME);
  }
  return store[NOTIFICATIONS_MODULE_NAME];
};

export const selectNotifications = (store: NotificationsStore): TransactionalNotification[] =>
  selectNotificationsStore(store).notifications;
export const selectNotificationsLoading = (store: NotificationsStore): boolean =>
  selectNotificationsStore(store).loading;
export const selectNotificationsError = (store: NotificationsStore) => selectNotificationsStore(store).error;
export const selectNotificationsCount = (store: NotificationsStore) => selectNotificationsStore(store).total;
