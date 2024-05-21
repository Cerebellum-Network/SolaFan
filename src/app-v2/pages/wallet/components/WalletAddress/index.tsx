import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {CopyButton} from '../../../../components/primitives/CopyButton';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  publicKeyBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
    },
  },
  publicKey: {
    fontSize: '16px',
    color: theme.palette.grey[700],
    maxWidth: '300px',
    width: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('lg')]: {
      marginRight: 'auto',
      marginBottom: '28px',
    },
  },
}));

type Props = {
  publicKey: string;
  afterCopyEvent: () => void;
};

export const WalletAddress = memo(({publicKey, afterCopyEvent}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();

  return (
    <Box>
      <Typography className={styles.title}>{t('Wallet address')}</Typography>
      <Box className={styles.publicKeyBox}>
        <Typography className={styles.publicKey}>{publicKey}</Typography>
        <CopyButton copyText={publicKey} isIconButton={!isDesktop} afterCopyEvent={afterCopyEvent} />
      </Box>
    </Box>
  );
});
