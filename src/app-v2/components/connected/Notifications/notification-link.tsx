import {NotificationEventType} from '@cere/services-types';
import {Box} from '@material-ui/core';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {Numberish} from 'app-v2/types/exhibit';
import {useCallback} from 'react';
import {Link} from 'react-router-dom';

import {getNotificationLink} from './helper';

type NotificationItemLinkProps = {
  notification: TransactionalNotification;
  onClick: (id: Numberish) => void;
  onMouseOver?: () => void;
  className?: string;
  children: JSX.Element;
};

export const NotificationItemLink = ({
  notification,
  onClick,
  onMouseOver,
  className,
  children,
}: NotificationItemLinkProps) => {
  const {locale} = useLocalization();

  const link = getNotificationLink(notification, locale);

  const onNotificationClick = useCallback(() => {
    onClick(notification.id);

    if (notification?.type === NotificationEventType.CERE_WALLET_CREATED) {
      // start cere wallet guide
    }
  }, [notification, onClick]);

  if (link) {
    return (
      <Link
        to={getNotificationLink(notification, locale)}
        className={className}
        onMouseOver={onMouseOver}
        onClick={onNotificationClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Box className={className} onMouseOver={onMouseOver} onClick={onNotificationClick}>
      {children}
    </Box>
  );
};
