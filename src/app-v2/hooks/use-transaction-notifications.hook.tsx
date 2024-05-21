import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {
  FetchNotificationsNextPageCommand,
  MarkAllAsReadCommand,
  MarkAsReadCommand,
  MarkAsUnreadCommand,
} from 'app-v2/redux/modules/notifications/actions';
import {selectNotificationsStore} from 'app-v2/redux/modules/notifications/selectors';
import {Numberish} from 'app-v2/types/exhibit';
import {useDispatch, useSelector} from 'react-redux';

const getNotificationsList = (list: TransactionalNotification[]): TransactionalNotification[] => list.slice(0, 8);

export const useTransactionNotifications = () => {
  const dispatch = useDispatch();
  const {notifications, total, loading: isLoading, newNotificationsCount} = useSelector(selectNotificationsStore);

  const markAsRead = (id: Numberish) => dispatch(MarkAsReadCommand.create(id));
  const markAllAsRead = () => dispatch(MarkAllAsReadCommand.create());
  const markAsUnread = (id: Numberish) => dispatch(MarkAsUnreadCommand.create(id));

  const isFirstPageLoading = isLoading;
  const isNextPageLoading = isLoading;
  const hasMore = notifications.length < total;
  const loadNextPage = () => dispatch(FetchNotificationsNextPageCommand.create());

  return {
    notifications: getNotificationsList(notifications),
    isLoading,
    markAsUnread,
    markAsRead,
    newNotificationsCount,
    markAllAsRead,
    isFirstPageLoading,
    isNextPageLoading,
    hasMore,
    loadNextPage,
    total,
  };
};
