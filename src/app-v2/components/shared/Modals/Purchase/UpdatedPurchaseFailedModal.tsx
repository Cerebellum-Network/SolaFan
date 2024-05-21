import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback} from 'react';

import {useLocalization} from '../../../../hooks/use-locale.hook';
import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import failureIcon from '../assets/failure-icon.svg';
import {UpdatedPurchaseModalBox} from '../UpdatedPurchaseModalBox';
import {UpdatedPurchaseModalBoxInner} from '../UpdatedPurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  purchaseDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FCDEC966',
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
  failureDescription: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    textAlign: 'center',
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
  sellerWalletAddress: string;
  onClose: () => void;
  onTryAgainClick: () => void;
};

export const UpdatedPurchaseFailedModal = memo(({onClose, onTryAgainClick}: Props) => {
  const {t} = useLocalization();
  const styles = useStyles();

  const handleRetry = useCallback(() => {
    onTryAgainClick();
    onClose();
  }, [onClose, onTryAgainClick]);

  const renderPurchaseDetailsBlock = useCallback(
    () => (
      <Box className={styles.purchaseDetails}>
        <img src={failureIcon} alt="failure" />
        <Typography className={styles.purchaseDetailsTitle}>{t('PurchaseUnsuccessful')}</Typography>
        <Typography className={styles.purchaseDetailsSubTitle}>
          {t("We're sorry, but it seems there was an issue processing your purchase.")}
        </Typography>
        <Button variant="contained" fullWidth className={styles.button} onClick={handleRetry}>
          {t('Try again')}
        </Button>
      </Box>
    ),
    [
      styles.purchaseDetails,
      styles.purchaseDetailsTitle,
      styles.purchaseDetailsSubTitle,
      styles.button,
      t,
      handleRetry,
    ],
  );

  const renderUnlockingEventsBlock = useCallback(
    () => (
      <Typography className={styles.failureDescription}>
        {t('If the problem persists, feel free to reach out to our support team. Thank you for your understanding')}
      </Typography>
    ),
    [styles, t],
  );

  return (
    <UpdatedPurchaseModalBox title={t('Buy Collectible')} onClose={onClose}>
      <UpdatedPurchaseModalBoxInner
        renderPurchaseDetailsBlock={renderPurchaseDetailsBlock}
        renderUnlockingEventsBlock={renderUnlockingEventsBlock}
      />
    </UpdatedPurchaseModalBox>
  );
});
