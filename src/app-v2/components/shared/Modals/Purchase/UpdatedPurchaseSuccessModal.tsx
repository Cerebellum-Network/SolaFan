import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {useLocalization} from '../../../../hooks/use-locale.hook';
import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CmsExhibit} from '../../../../types/exhibit';
import {EventCardSmall} from '../../EventCardSmall';
import successIcon from '../assets/success-icon.svg';
import {UpdatedPurchaseModalBox} from '../UpdatedPurchaseModalBox';
import {UpdatedPurchaseModalBoxInner} from '../UpdatedPurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  purchaseDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#C9FCD466',
    padding: '24px 33px 16px',
    borderRadius: '24px',
  },
  purchaseDetailsTitle: {
    textAlign: 'center',
    maxWidth: '320px',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '28.15px',
    marginTop: '8px',
  },
  purchaseDetailsSubTitle: {
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '21px',
    maxWidth: '247px',
    marginTop: '8px',
  },
  unlockingEvents: {
    paddingTop: '16px',
  },
  unlockingEventsTitle: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '26px',
  },
  transactionProcessingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingBottom: '16px',
  },
  transactionProcessing: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary,
  },
  button: {
    textTransform: 'none',
    borderRadius: '72px',
    marginTop: '8px',
  },
  hideOnMobileLandscape: {
    [mobileLandscapeMediaQuery(theme)]: {
      display: 'none',
    },
  },
  transitionDetailsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    [mobileLandscapeMediaQuery(theme)]: {
      justifyContent: 'flex-end',
    },
  },
  transitionDetails: {
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.secondary.main,
  },
}));

type Props = {
  isUserAuthenticated: boolean;
  title: string;
  unlockingEvents: CmsExhibit[];
  loadUnlockingEvents: (slugs: string[]) => void;
  unlockingEventsSlugs: string[];
  onClose: () => void;
  onContinue: () => void;
};

export const UpdatedPurchaseSuccessModal = memo(
  ({isUserAuthenticated, onClose, onContinue, unlockingEvents, loadUnlockingEvents, unlockingEventsSlugs}: Props) => {
    const {t, locale} = useLocalization();
    const styles = useStyles();
    const history = useHistory();

    useEffect(() => {
      let isMounted = true;
      if (isMounted && unlockingEvents.length > 0 && isUserAuthenticated) {
        loadUnlockingEvents(unlockingEventsSlugs);
      }
      return () => {
        isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unlockingEventsSlugs]);

    const handleOnProfileClick = useCallback(() => {
      history.push(`/${locale}/home/user/profile`);
      onClose();
    }, [history, locale, onClose]);

    const handleOnContinueClick = useCallback(() => {
      onContinue();
      onClose();
    }, [onClose, onContinue]);

    const renderPurchaseDetailsBlock = useCallback(() => {
      return (
        <Box className={styles.purchaseDetails}>
          <img src={successIcon} alt="success" />
          <Typography className={styles.purchaseDetailsTitle}>{t('Thank you for your purchase!')}</Typography>
          <Typography className={styles.purchaseDetailsSubTitle}>
            {t('Your new collectable is now proudly displayed in your profile')}
          </Typography>

          {isUserAuthenticated ? (
            <Button variant="contained" fullWidth className={styles.button} onClick={handleOnProfileClick}>
              {t('My Profile')}
            </Button>
          ) : (
            <Button className={styles.button} fullWidth variant="contained" onClick={handleOnContinueClick}>
              {t('Continue Onboarding')}
            </Button>
          )}
        </Box>
      );
    }, [
      handleOnContinueClick,
      handleOnProfileClick,
      isUserAuthenticated,
      styles.button,
      styles.purchaseDetails,
      styles.purchaseDetailsSubTitle,
      styles.purchaseDetailsTitle,
      t,
    ]);

    const renderUnlockingEventsBlock = useCallback(
      () =>
        unlockingEvents.length > 0 ? (
          <Box className={styles.unlockingEvents}>
            <Typography className={styles.unlockingEventsTitle}>{t('Unlocking events')}</Typography>
            <div className="flex flex-col w-full">
              {unlockingEvents.map((event) => (
                <EventCardSmall
                  title={event.title}
                  image={event.image.url}
                  id={event.id}
                  slug={event.slug}
                  isEventLocked={false}
                />
              ))}
            </div>
          </Box>
        ) : null,
      [styles.unlockingEvents, styles.unlockingEventsTitle, t, unlockingEvents],
    );

    return (
      <UpdatedPurchaseModalBox title={t('Buy Collectible')} onClose={onClose}>
        <UpdatedPurchaseModalBoxInner
          renderPurchaseDetailsBlock={renderPurchaseDetailsBlock}
          renderUnlockingEventsBlock={renderUnlockingEventsBlock}
        />
      </UpdatedPurchaseModalBox>
    );
  },
);
