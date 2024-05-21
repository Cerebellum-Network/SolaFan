import {Box, MenuItem} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';
import {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {ReactComponent as FeedIcon} from '../../../../assets/menuIcons/feedIcon.svg';
import {ReactComponent as BellIcon} from '../../../../assets/menuIcons/notificationsIcon.svg';
import {HIDE_FEED_PAGE} from '../../../../config/common';
import {useAccountStyles, useMenuListStyles} from './styles';

type Props = {
  hasNewNotifications: boolean;
};

export const UserAccount = ({hasNewNotifications}: Props) => {
  const {t, locale} = useLocalization();
  const history = useHistory();
  const classes = useAccountStyles();
  const itemsClasses = useMenuListStyles({});
  const {pathname} = history.location; // FixMe: Rewrite this with using NavLink component
  const navigateToFeed = useCallback(() => {
    history.push(`/${locale}/feed`);
  }, [history, locale]);

  return (
    <Box className={classes.listContainer}>
      {!HIDE_FEED_PAGE && (
        <MenuItem
          classes={{root: clsx(itemsClasses.menuItemRoot, classes.menuItem)}}
          className={clsx(
            itemsClasses.menuItem,
            pathname === `/${locale}/feed` ? itemsClasses.activeItem : itemsClasses.inActiveItem,
          )}
          onClick={navigateToFeed}
        >
          <FeedIcon />
          {t('Personal feed')}
        </MenuItem>
      )}

      <Link to={`/${locale}/notifications`} className={classes.link}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box className={classes.iconContainer}>
            <BellIcon />
          </Box>
          <Box className={clsx(classes.title, pathname === '/notifications' && classes.activeItem)}>
            {t('Notifications')}
          </Box>
          {hasNewNotifications && <Box className={classes.newNotificationsMarker} />}
        </Box>
      </Link>
    </Box>
  );
};
