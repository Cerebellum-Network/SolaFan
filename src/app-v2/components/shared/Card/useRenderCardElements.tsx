// TODO - remove this file when all Card logic will be realized in components/connected
import {AuctionStatus} from '@cere/services-types';
import {makeStyles} from '@material-ui/core';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 600,
  },
  greyColor: {
    color: theme.palette.grey[700],
  },
  actionColor: {
    color: theme.palette.secondary.main,
  },
}));

export const useRenderCardPriceBadge = () => {
  const {t} = useTranslation();
  const styles = useStyles();

  return useCallback(
    (auctionStatus: string, priceUsd: number) =>
      auctionStatus === AuctionStatus.ACTIVE ? (
        <span className={styles.actionColor}>
          {t('Starting price')}
          <span className={styles.bold}>{` $${priceUsd?.toFixed(2)}`}</span>
        </span>
      ) : (
        <span className={styles.bold}>{`$${priceUsd?.toFixed(2)}`}</span>
      ),
    [styles, t],
  );
};

export const useRenderSubTitle = () => {
  const {t} = useTranslation();
  const styles = useStyles();

  return useCallback(
    (auctionStatus?: string, supply?: number, balance?: number) =>
      auctionStatus === AuctionStatus.ACTIVE ? (
        <span className={styles.greyColor}>
          <span className={styles.bold}>1 </span>
          {t('Auctioned Original')}
        </span>
      ) : (
        <span className={styles.greyColor}>
          <span className={styles.bold}>{balance}</span>/{supply} {t('Collectibles left')}
        </span>
      ),
    [styles, t],
  );
};
