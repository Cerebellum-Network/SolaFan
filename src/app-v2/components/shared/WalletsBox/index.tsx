import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Wallet} from '../Wallet';
import {WalletType} from '../Wallet/types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '20px',
  },
  title: {
    fontsize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
  },
  addWalletButton: {
    fontsize: '12px',
    fontWeight: 600,
    lineHeight: '22px',
    textTransform: 'none',
    color: theme.palette.grey[700],
  },
  walletsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}));

type Props = {
  wallets: WalletType[];
  onAddClick: () => void;
  activeWallet: string;
  setActiveWallet: (walletId: string) => void;
};

export const WalletsBox = memo(({wallets, onAddClick, activeWallet, setActiveWallet}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Typography className={styles.title}>{t('Wallets')}</Typography>
        <Button className={styles.addWalletButton} variant="text" onClick={onAddClick}>
          {t('Add wallet')}
        </Button>
      </Box>
      <Box className={styles.walletsBox}>
        {wallets.map((wallet) => (
          <Wallet
            key={wallet.type}
            type={wallet.type}
            title={wallet.title}
            icon={wallet.icon}
            walletBalance={wallet.walletBalance}
            nftsCount={wallet.nftsCount}
            isActive={activeWallet === wallet.type}
            setIsActive={setActiveWallet}
          />
        ))}
      </Box>
    </Box>
  );
});
