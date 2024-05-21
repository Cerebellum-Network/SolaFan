import {Box, makeStyles, Typography} from '@material-ui/core';
import {ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {CopySmallBox} from '../../primitives/CopySmallBox';

const useStyles = makeStyles(() => ({
  list: {
    margin: '0',
  },
  copyBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

type Props = {
  walletPublicKey: string;
  walletIcon?: ReactElement;
};

export const useContinueBuyModalSteps = ({walletPublicKey, walletIcon}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return useMemo(
    () => [
      <>
        <Typography variant="subtitle1">{t('Fund your wallet with USDC on Polygon Network')}</Typography>
        <ul className={styles.list}>
          <li>{t('In order to purchase an NFT you must send USDC funds to your wallet address')}</li>
          <li>{t('Top up your wallet with your credit card in the wallet app')} </li>
        </ul>
      </>,
      <>
        <Box className={styles.copyBox}>
          <CopySmallBox icon={walletIcon} text={walletPublicKey} />
        </Box>
        <Typography variant="subtitle1">{t('This is your wallet address')}</Typography>
        <ul className={styles.list}>
          <li>{t('Use this address to send funds to your wallet')}</li>
          <li>
            {t(
              'Your wallet address will always stay the same. You can find your address in your profile or in the wallet app',
            )}
          </li>
        </ul>
      </>,
      <>
        <Typography variant="subtitle1">{t('Your wallet has been created and is ready to be used!')}</Typography>
        <ul className={styles.list}>
          <li>{t('You can find your wallet in your profile.')}</li>
          <li>{t('Access your wallet by clicking on the widget in the bottom left corner')}</li>
        </ul>
      </>,
    ],
    [walletIcon, walletPublicKey, styles, t],
  );
};
