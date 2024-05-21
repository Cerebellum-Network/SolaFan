import {alpha, Box, makeStyles, Popover, Theme, Typography, useMediaQuery} from '@material-ui/core';
import {TransactionalNotification} from 'app-v2/api/notifications/types';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useCallback, useState} from 'react';
import colors from 'styles/colors';

import {ReactComponent as CloseIcon} from '../../../assets/svg/close.svg';
import {ReactComponent as BellIcon} from '../../../assets/svg/pink-bell.svg';
import {getNotificationImage, getNotificationTitle} from './helper';
import {NotificationItemLink} from './notification-link';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
    display: 'flex',
  },
  icon: {
    width: '16.33px',
    height: '19.83px',
    marginRight: '9.84px',
    marginLeft: '5.83px',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: '14px',
    lineHeight: '22px',
    marginBottom: '4px',
    textDecoration: 'none',
    color: colors.primaryDark,

    '& p': {
      margin: 0,
    },
  },
  image: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    marginRight: '12px',
    overflow: 'hidden',
    objectFit: 'cover',
  },
  close: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer',
    padding: '16px',
    backdropFilter: 'blur(54px)',
    borderRadius: '50%',
    background: colors.lighter,
    width: '30px',
    height: '30px',
  },
  closeIconContainer: {
    top: '15px',
  },
  closeIcon: {
    borderRadius: '50%',
    position: 'absolute',
    right: '10px',
    top: '10px',
    minWidth: '12px',
    width: '12px',
    height: '12px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const usePopoverStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: '12px',
    boxShadow: `0px 4px 20px ${alpha(colors.black, 0.12)}`,
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      width: '390px',
    },
  },
}));

const NotificationsPopupContent = ({
  notification,
  onClose,
  onClick,
}: {
  notification: TransactionalNotification;
  onClose: () => void;
  onClick: () => void;
}) => {
  const classes = useStyles();
  const {t} = useLocalization();

  return (
    <Box className={classes.content}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb="12px">
        <Typography className={classes.header}>
          <BellIcon className={classes.icon} />
          {t('Notification')}
        </Typography>
        <Box className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </Box>
      </Box>
      <NotificationItemLink notification={notification} className={classes.link} onClick={onClick}>
        <Box display="flex" flexDirection="row">
          <Box>{getNotificationImage(notification, classes.image)}</Box>
          <Box className={classes.title}>{getNotificationTitle(notification)}</Box>
        </Box>
      </NotificationItemLink>
    </Box>
  );
};

export const NotificationsPopup = ({anchorEl}: {anchorEl: Element | null}) => {
  const [activeNotification, setActiveNotification] = useState<TransactionalNotification | null>(null);
  const isDesktop = useMediaQuery<Theme>((theme) => `${theme.breakpoints.up('lg')}`);
  const popoverClasses = usePopoverStyles();

  const onClick = useCallback(() => {}, []);

  return (
    <Popover
      classes={popoverClasses}
      open={Boolean(activeNotification)}
      anchorEl={isDesktop ? anchorEl : null}
      onClose={() => setActiveNotification(null)}
      anchorOrigin={
        isDesktop
          ? {
              vertical: 'bottom',
              horizontal: -350,
            }
          : {
              vertical: 'bottom',
              horizontal: 'center',
            }
      }
    >
      {activeNotification && (
        <NotificationsPopupContent
          notification={activeNotification}
          onClose={() => setActiveNotification(null)}
          onClick={onClick}
        />
      )}
    </Popover>
  );
};
