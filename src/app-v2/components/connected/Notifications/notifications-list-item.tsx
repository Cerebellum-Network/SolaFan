import {Box, makeStyles} from '@material-ui/core';
import {TransactionalNotificationStatus} from 'app-v2/api/notifications/enums';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {Numberish} from 'app-v2/types/exhibit';
import clsx from 'clsx';
import {useCallback} from 'react';
import colors from 'styles/colors';

import {getDateLabel, getNotificationImage, getNotificationTitle, getStatusLabel} from './helper';
import {NotificationItemLink} from './notification-link';

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    padding: '16px 0',
    borderBottom: `1px solid ${colors.lighter}`,

    '&:last-child': {
      borderBottomWidth: 0,
    },

    '&:hover': {
      backgroundColor: 'rgba(224, 224, 231, 0.5)',
    },
  },
  link: {
    textDecoration: 'none',
  },
  status: {
    width: '5px',
    margin: '22.5px 8px 0 0',
    height: '5px',
    borderRadius: '50%',
  },
  statusNew: {
    backgroundColor: colors.green,
  },
  statusUnread: {
    backgroundColor: theme.palette.secondary.main,
  },
  image: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    marginRight: '12px',
    overflow: 'hidden',
    objectFit: 'cover',
  },
  details: {
    textDecoration: 'none',
  },
  title: {
    fontSize: '14px',
    lineHeight: '22px',
    marginBottom: '4px',
    textDecoration: 'none',
    color: colors.primaryDark,
    '& p': {
      margin: '0',
    },
  },
  date: {
    fontSize: '12px',
    lineHeight: '16px',
    color: colors.disable,
  },
  statusDot: {
    width: '3px',
    height: '3px',
    backgroundColor: colors.disable,
    borderRadius: '50%',
    margin: '6.5px 6px 0',
  },
  statusDescription: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  statusDescriptionNew: {
    color: colors.green,
  },
  statusDescriptionUnread: {
    color: theme.palette.secondary.main,
  },
}));

type NotificationsListItemProps = {
  notification: TransactionalNotification;
  onView: (id: Numberish) => void;
  onRead: (id: Numberish) => void;
};

export const NotificationsListItem = ({notification, onView, onRead}: NotificationsListItemProps) => {
  const styles = useStyles();
  const statusLabel = getStatusLabel(notification);
  const onMouseOver = useCallback(() => {
    if (notification.status === TransactionalNotificationStatus.NEW) {
      onView(notification.id);
    }
  }, [notification, onView]);

  const onClick = useCallback(() => {
    if ([TransactionalNotificationStatus.NEW, TransactionalNotificationStatus.UNREAD].includes(notification.status)) {
      onRead(notification.id);
    }
  }, [notification, onRead]);

  return (
    <Box className={styles.notificationContainer}>
      <NotificationItemLink
        notification={notification}
        className={styles.link}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <Box
              className={clsx(styles.status, {
                [styles.statusNew]: notification.status === TransactionalNotificationStatus.NEW,
                [styles.statusUnread]: notification.status === TransactionalNotificationStatus.UNREAD,
              })}
            ></Box>
          </Box>
          <Box>{getNotificationImage(notification, styles.image)}</Box>
          <Box className={styles.details}>
            <Box className={styles.title}>{getNotificationTitle(notification)}</Box>
            <Box display="flex" flexDirection="row">
              <Box className={styles.date}>{getDateLabel(notification)}</Box>
              {statusLabel && (
                <>
                  <Box className={styles.statusDot}></Box>
                  <Box
                    className={clsx(styles.statusDescription, {
                      [styles.statusDescriptionNew]: notification.status === TransactionalNotificationStatus.NEW,
                      [styles.statusDescriptionUnread]: notification.status === TransactionalNotificationStatus.UNREAD,
                    })}
                  >
                    {statusLabel}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </NotificationItemLink>
    </Box>
  );
};
