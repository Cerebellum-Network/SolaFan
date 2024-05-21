import {Box} from '@material-ui/core';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {Numberish} from 'app-v2/types/exhibit';

import {NotificationsListItem} from './notifications-list-item';

type NotificationsListProps = {
  notifications: TransactionalNotification[];
  onView: (id: Numberish) => void;
  onRead: (id: Numberish) => void;
};

export const NotificationsList = ({notifications, onView, onRead}: NotificationsListProps) => {
  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationsListItem notification={notification} key={notification.id} onView={onView} onRead={onRead} />
      ))}
    </Box>
  );
};
