import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {Skeleton} from 'app-v2/components/primitives/Skeleton';
import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {formatPrice} from '../../../../../shared/lib/formatPrice';
import {StyledLink} from '../../../../components/primitives/StyledLink';
import {ReactComponent as CoinUSD} from '../../../../components/primitives/WalletBalanceCard/CoinUSD.svg';
import {ROUTES} from '../../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  balanceBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  balance: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
  },
  walletName: {
    fontSize: '12px',
    color: theme.palette.grey[700],
  },
  walletIcon: {
    width: '44px',
    height: '44px',
    backgroundColor: 'white',
    borderRadius: '50%',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '16px',
  },
  button: {
    textTransform: 'none',
    height: '48px',
    width: '100%',
  },
  transferLink: {
    width: '100%',
  },
}));

type Props = {
  walletBalance?: number;
  walletName: string;
  onManageWalletClick?: () => void;
  canTransfer?: boolean;
  onDisconnectClick?: () => void;
};

export const MyWallet = memo(
  ({walletBalance, walletName, onManageWalletClick, canTransfer, onDisconnectClick}: Props) => {
    const {t, i18n} = useTranslation();
    const styles = useStyles();

    const transferLink = useMemo(() => generatePath(ROUTES.WALLET_TRANSFER, {locale: i18n.language}), [i18n.language]);

    return (
      <Box>
        <Box className={styles.balanceBox}>
          <Box>
            {walletBalance == null ? (
              <>
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={160} />
              </>
            ) : (
              <>
                <Typography className={styles.balance}>{formatPrice(walletBalance)}</Typography>
                <Typography className={styles.walletName}>{t('{{walletName}} balance', {walletName})}</Typography>
              </>
            )}
          </Box>
          <CoinUSD className={styles.walletIcon} />
        </Box>
        <Box className={styles.buttonsBox}>
          {onManageWalletClick && (
            <Button variant="contained" color="default" className={styles.button} onClick={onManageWalletClick}>
              {t('Manage my wallet')}
            </Button>
          )}
          {onDisconnectClick && (
            <Button variant="outlined" color="inherit" className={styles.button} onClick={onDisconnectClick}>
              {t('Disconnect')}
            </Button>
          )}
          {canTransfer && (
            <StyledLink to={transferLink} className={styles.transferLink}>
              <Button variant="outlined" color="default" className={styles.button}>
                {t('Transfer')}
              </Button>
            </StyledLink>
          )}
        </Box>
      </Box>
    );
  },
);
