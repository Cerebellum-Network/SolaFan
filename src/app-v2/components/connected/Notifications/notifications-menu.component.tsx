import {Box, Divider, makeStyles, Menu, MenuItem, Theme, useMediaQuery} from '@material-ui/core';
import {NotificationSkeleton} from 'app-v2/components/primitives/Skeleton/NotificationSkeleton';
import {Condition, ConditionsList, Defaults} from 'app-v2/components/shared/Conditions';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useTransactionNotifications} from 'app-v2/hooks/use-transaction-notifications.hook';
import {ReactComponent as CloseIcon} from 'assets/close.svg';
import {ReactComponent as BellIcon} from 'assets/icons/bell.svg';
import {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {NotificationsPopup} from './notification-popup';
import {NotificationsControls} from './notifications-controls';
import {NotificationsEmptyList} from './notifications-empty-list';
import {NotificationsList} from './notifications-list';
import {Typography} from './Typography';

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    boxShadow: 'none',
    maxWidth: '471px',
    minWidth: '471px',
    padding: '0 10px',
    backgroundColor: 'transparent',
    maxHeight: 'none',
  },

  content: {
    margin: '0 24px 14px 0',
    borderRadius: '12px',
    maxWidth: '451px',
    minWidth: '451px',
    marginTop: '-22px',
    backgroundColor: theme.palette.common.white,
    boxShadow:
      '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
  },

  hiddenBlock: {
    height: '60px',
    width: '36px',
    margin: '-10px 25px 0 auto',
    backgroundColor: 'transparent',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '16px',
  },

  emptyListContainer: {
    minHeight: '270px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextPageLoaderWrapper: {
    color: theme.palette.grey[700],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '32px',
  },

  notificationsContainer: {
    position: 'relative',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[300],
    marginRight: '16px',
    cursor: 'pointer',
    zIndex: 10000,
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  notificationsIcon: {
    position: 'relative',
    margin: 'auto',
    height: '14.17px',
    width: '11.67px',
  },
  notificationsCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.palette.secondary.main,
    fontSize: '10px',
    lineHeight: '14px',
    color: theme.palette.grey[200],
    padding: '0 4px',
    borderRadius: '7px',
  },
  close: {
    right: '16px',
    cursor: 'pointer',
    padding: '16px',
    backdropFilter: 'blur(54px)',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[100],
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
    height: '12px',
  },
  header: {
    padding: '12px 16px 20px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headerTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 600,
  },
  linkWrapper: {
    padding: 0,
  },
  link: {
    width: '100%',
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
    color: theme.palette.primary.dark,
    padding: '20px 0',
  },
}));

export const NotificationsMenuComponent = () => {
  const {t, locale} = useLocalization();
  const classes = useStyles();
  const isDesktop = useMediaQuery<Theme>((theme) => `${theme.breakpoints.up('lg')}`);
  const {
    notifications,
    isLoading,
    markAsRead,
    markAsUnread,
    newNotificationsCount: total,
    markAllAsRead,
  } = useTransactionNotifications();
  const notificationMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBellOpen, setIsBellOpen] = useState<boolean>(false);
  const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(false);
  const history = useHistory();

  const isNotificationsLinkVisible =
    notifications.length > 0 && history.location.pathname !== `/${locale}/notifications`;

  return (
    <>
      <div
        ref={notificationMenuRef}
        className={classes.notificationsContainer}
        onClick={() => {
          setIsOpen(true);
          setIsBellOpen(true);
        }}
        onMouseOver={() => {
          setIsOpen(true);
          setIsBellOpen(true);
        }}
      >
        <BellIcon className={classes.notificationsIcon} />
        {!!total && <Box className={classes.notificationsCount}>{total}</Box>}
      </div>

      <Menu
        id="notifications-list"
        anchorEl={notificationMenuRef.current}
        keepMounted
        open={Boolean(notificationMenuRef) && isOpen && (isBellOpen || isMenuListOpen)}
        onClose={() => setIsOpen(false)}
        classes={{paper: classes.paper}}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 410,
        }}
        disableScrollLock={true}
      >
        <Box
          className={classes.hiddenBlock}
          onMouseLeave={() => setIsBellOpen(false)}
          onMouseOver={() => {
            setIsBellOpen(true);
          }}
        ></Box>
        <Box
          className={classes.content}
          onMouseLeave={() => setIsMenuListOpen(false)}
          onMouseOver={() => {
            setIsMenuListOpen(true);
          }}
        >
          <Box className={classes.header}>
            <Typography className={classes.headerTitle}>{t('Notifications')}</Typography>
            {!isDesktop && (
              <Box className={classes.close} onClick={() => setIsOpen(false)}>
                <CloseIcon className={classes.closeIcon} />
              </Box>
            )}
          </Box>

          <Box className={classes.container}>
            <NotificationsControls onViewAll={markAllAsRead} loading={isLoading} />
            <ConditionsList>
              <Condition condition={isLoading}>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Box key={index}>
                      <NotificationSkeleton />
                      {index !== 4 && <Divider />}
                    </Box>
                  ))}
              </Condition>
              <Condition condition={notifications.length > 0}>
                <NotificationsList notifications={notifications} onView={markAsUnread} onRead={markAsRead} />
              </Condition>
              <Defaults>
                <Box className={classes.emptyListContainer}>
                  <NotificationsEmptyList />
                </Box>
              </Defaults>
            </ConditionsList>
          </Box>
          <ConditionsList>
            <Condition condition={isNotificationsLinkVisible}>
              <MenuItem className={classes.linkWrapper}>
                <Link to={`/${locale}/notifications`} className={classes.link}>
                  {t('Show all notifications')}
                </Link>
              </MenuItem>
            </Condition>
          </ConditionsList>
        </Box>
      </Menu>

      <NotificationsPopup anchorEl={notificationMenuRef.current} />
    </>
  );
};
