import {Box, FormControlLabel, makeStyles, Radio, Theme, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

import {WalletType} from './types';

const useStyles = makeStyles<Theme, {isActive: boolean}>((theme) => ({
  wallet: {
    padding: '16px',
    display: 'flex',
    borderRadius: '12px',
    gap: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: ({isActive}) => (isActive ? theme.palette.secondary.light : theme.palette.divider),
  },
  walletIcon: {
    width: '16px',
  },
  walletInfo: {
    flexGrow: 2,
  },
  walletTitle: {
    fontSize: '14px',
    fontWeight: 600,
    paddingBottom: '5px',
  },
  walletBalanceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  walletBalance: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.grey[700],
  },
  walletNftsCount: {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.palette.grey[700],
    padding: '2px 12px',
    backgroundColor: theme.palette.grey[100],
    borderRadius: '8px',
  },
  walletIsActive: {
    '& .MuiFormControlLabel-label': {
      fontSize: '10px',
      fontWeight: 600,
      color: ({isActive}) => (isActive ? theme.palette.secondary.light : theme.palette.grey[700]),
    },
  },
}));

interface Props extends WalletType {
  isActive: boolean;
  setIsActive: (walletId: string) => void;
}

export const Wallet = ({type, title, icon, walletBalance, nftsCount, isActive, setIsActive}: Props) => {
  const styles = useStyles({isActive});
  const {t} = useTranslation();

  const onChange = () => setIsActive(type);

  return (
    <Box className={styles.wallet}>
      <Box className={styles.walletIcon}>{icon}</Box>
      <Box className={styles.walletInfo}>
        <Typography className={styles.walletTitle}>{title}</Typography>
        <Box className={styles.walletBalanceBox}>
          <Typography>{walletBalance}</Typography>
          <Typography className={styles.walletNftsCount}>
            {nftsCount} {t('NFTs')}
          </Typography>
        </Box>
      </Box>
      <FormControlLabel
        className={styles.walletIsActive}
        labelPlacement="start"
        control={<Radio checked={isActive} onChange={onChange} size="small" />}
        label={t('Active')}
      />
    </Box>
  );
};
