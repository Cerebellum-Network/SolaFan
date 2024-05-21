import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';

import {useLocalization} from '../../../../app-v2/hooks/use-locale.hook';
import {ReactComponent as CoinUSD} from './CoinUSD.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '10px',
  },
  balance: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary,
    paddingBottom: '2px',
  },
  walletName: {
    fontSize: '10px',
    lineHeight: '14px',
    color: theme.palette.grey[700],
  },
}));

type Props = {
  balance: number;
  walletName: string;
};

export const WalletBalanceCard = memo(({balance, walletName}: Props) => {
  const styles = useStyles();
  const {t} = useLocalization();

  return (
    <Box className={styles.root}>
      <Box>
        <Typography className={styles.balance}>{balance}</Typography>
        <Typography className={styles.walletName}>
          {walletName} {t('wallet balance')}
        </Typography>
      </Box>
      <CoinUSD />
    </Box>
  );
});
