import {Box, CircularProgress, Divider} from '@material-ui/core';
import {AppContainer} from 'app-v2/components/connected/AppContainer';
import {NotificationsControls} from 'app-v2/components/connected/Notifications/notifications-controls';
import {NotificationsEmptyList} from 'app-v2/components/connected/Notifications/notifications-empty-list';
import {NotificationsList} from 'app-v2/components/connected/Notifications/notifications-list';
import {NotificationSkeleton} from 'app-v2/components/primitives/Skeleton/NotificationSkeleton';
import {Title} from 'app-v2/components/primitives/Title';
import {Condition, ConditionsList, Defaults} from 'app-v2/components/shared/Conditions';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useTransactionNotifications} from 'app-v2/hooks/use-transaction-notifications.hook';
import {throttle} from 'lodash';
import {useCallback, useEffect} from 'react';

import {useStyles} from './styles';

export const NotificationsPage = () => {
  const {t} = useLocalization();
  const styles = useStyles();
  const {
    notifications,
    isFirstPageLoading,
    isNextPageLoading,
    markAsUnread,
    markAsRead,
    markAllAsRead,
    hasMore,
    loadNextPage,
  } = useTransactionNotifications();
  const canLoadMore = hasMore && !isNextPageLoading;

  const handleScroll = useCallback(() => {
    if (canLoadMore) {
      const {scrollTop, offsetHeight} = document.documentElement;
      const {innerHeight} = window;

      const bottomOfWindow = offsetHeight - (scrollTop + innerHeight);

      if (bottomOfWindow < 300) {
        loadNextPage();
      }
    }
  }, [canLoadMore, loadNextPage]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  return (
    <AppContainer>
      <PageContainer>
        <Box pt="5px">
          <Title>{t('Notifications')}</Title>
          <Box className={styles.controlsContainer}>
            <NotificationsControls onViewAll={markAllAsRead} loading={isFirstPageLoading} />
          </Box>
          <ConditionsList>
            <Condition condition={isFirstPageLoading}>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Box key={index}>
                    <NotificationSkeleton />
                    {index !== 9 && <Divider />}
                  </Box>
                ))}
            </Condition>
            <Condition condition={notifications.length > 0}>
              <NotificationsList notifications={notifications} onView={markAsUnread} onRead={markAsRead} />
              {isNextPageLoading && (
                <Box className={styles.nextPageLoaderWrapper}>
                  <CircularProgress size={36} thickness={2} className={styles.circularProgress} />
                </Box>
              )}
            </Condition>
            <Defaults>
              <Box className={styles.emptyListContainer}>
                <NotificationsEmptyList />
              </Box>
            </Defaults>
          </ConditionsList>
        </Box>
      </PageContainer>
    </AppContainer>
  );
};
