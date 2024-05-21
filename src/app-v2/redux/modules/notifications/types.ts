import {NOTIFICATIONS_MODULE_NAME} from './constants';
import {notificationsModuleReducer} from './reducers';
import {selectNotifications} from './selectors';

export type NotificationsStore = {[NOTIFICATIONS_MODULE_NAME]: ReturnType<typeof notificationsModuleReducer>};

export type NotificationState = ReturnType<typeof selectNotifications>;
