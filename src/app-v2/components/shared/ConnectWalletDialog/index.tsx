import {Dialog, Typography} from '@cere/rxb-template-ui-kit';
import {Box, Button, makeStyles} from '@material-ui/core';
import {useMemo} from 'react';
import {Trans, useTranslation} from 'react-i18next';

import {ReactComponent as Metamask} from '../../../assets/svg/metamask.svg';
import walletConnect from '../../../assets/svg/walletConnect.svg';
import {isMobileDevice} from '../../../utils/helpers/isMobileDevice';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '16px',
  },
  text: {
    color: theme.palette.success.main,
  },
  description: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    color: theme.palette.text.primary,
    '& strong': {
      color: theme.palette.success.main,
      fontWeight: 400,
    },
  },
  button: {
    height: '48px',
    paddingLeft: '16px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    '&:not(:last-of-type)': {
      marginBottom: '14px',
    },
  },
}));

type Props = {
  onClose: () => void;
  onConnectMetamask: () => void;
  onConnectWalletConnect: () => void;
};

export const ConnectWalletDialog = ({onClose, onConnectMetamask, onConnectWalletConnect}: Props) => {
  const isMobile = useMemo(() => isMobileDevice(), []);
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      headerContent={<Typography variant="h3">{t('Connect wallet')}</Typography>}
    >
      <Box className={styles.container}>
        <Typography className={styles.description}>
          <Trans i18nKey="Pick one of our available wallet providers to purchase and bid during the live exhibit. Connect your wallet to <strong>POLYGON</strong> network" />
        </Typography>
        <Box display="flex" justifyContent="space-between" mt="10px" flexDirection="column">
          {!isMobile && (
            <Button className={styles.button} startIcon={<Metamask />} fullWidth onClick={onConnectMetamask}>
              {t('MetaMask')}
            </Button>
          )}
          <Button
            className={styles.button}
            startIcon={<img src={walletConnect} alt="WalletConnect" />}
            fullWidth
            onClick={onConnectWalletConnect}
          >
            {t('WalletConnect')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
