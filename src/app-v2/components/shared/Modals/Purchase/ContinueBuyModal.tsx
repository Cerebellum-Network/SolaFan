import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {CheckCircle} from '@material-ui/icons';
import {memo, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {ErrorMsg} from '../../../primitives/ErrorMsg';
import {ImageSquare} from '../../../primitives/ImageSquare';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as CoinUSD} from '../../../primitives/WalletBalanceCard/CoinUSD.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: 'flex-start',
    paddingTop: '64px',
    paddingLeft: '24px',
    paddingBottom: 0,
  },
  registrationMsg: {
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #E7E8EB',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  registrationMsgIcon: {
    color: theme.palette.info.main,
  },
  subTitle: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '22px',
    color: theme.palette.text.disabled,
    paddingBottom: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    [mobileLandscapeMediaQuery(theme)]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: '20px',
    },
  },
  connectWalletBox: {
    paddingBottom: '8px',
    cursor: 'pointer',
  },
  nftBox: {
    display: 'flex',
    padding: '4px',
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
  },
  imageBox: {
    width: '56px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  nftInfo: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    paddingLeft: '16px',
  },
  nftName: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary,
  },
  nftPrice: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: theme.palette.text.primary,
  },
  walletWrapper: {
    borderRadius: '12px',
    overflow: 'hidden',
  },
  walletError: {
    borderRadius: 0,
  },
  walletBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: theme.palette.background.paper,
  },
  walletBalance: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary,
  },
  walletName: {
    fontSize: '10px',
    lineHeight: '14px',
    color: theme.palette.text.disabled,
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    paddingTop: '16px',
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
    },
  },
  button: {
    width: '100%',
    height: '40px',
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      height: '44px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      width: '200px',
    },
  },
}));

type Props = {
  image: string;
  nftLink: string;
  nftName: string;
  nftUsdPrice: number;
  walletBalance: string;
  walletName: string;
  isShowWalletError: boolean;
  isNonCustodyWalletConnected: boolean;
  onConnectWalletClick?: () => void;
  onAddFundsClick: () => void;
  onPayWithCrypto: () => void;
  onPayByCard: () => void;
  isHidePayByCard?: boolean;
  onClose: () => void;
  isShowRegistrationMsg: boolean;
  renderSteper: () => ReactElement;
};

export const ContinueBuyModal = memo(
  ({
    image,
    nftLink,
    nftName,
    nftUsdPrice,
    walletBalance,
    walletName,
    isShowWalletError,
    isNonCustodyWalletConnected,
    onConnectWalletClick,
    onAddFundsClick,
    onPayWithCrypto,
    onPayByCard,
    isHidePayByCard,
    onClose,
    isShowRegistrationMsg,
    renderSteper,
  }: Props) => {
    const {t} = useTranslation();

    const styles = useStyles();

    return (
      <PurchaseModalBox title={t('Continue your purchase')} onClose={onClose} classes={{header: styles.header}}>
        <>
          {isShowRegistrationMsg && (
            <Box className={styles.registrationMsg}>
              <CheckCircle className={styles.registrationMsgIcon} />
              {t('Successful registration')}
            </Box>
          )}
          <Typography className={styles.subTitle}>
            {t("Your account and wallet are successfully created. You're all set for any marketplace transaction.")}
          </Typography>
          <Box className={styles.container}>
            <Box>
              {isNonCustodyWalletConnected && (
                <Box className={styles.connectWalletBox} onClick={onConnectWalletClick}>
                  <ErrorMsg variant="error" text="Connect wallet" />
                </Box>
              )}
              <StyledLink to={nftLink}>
                <Box className={styles.nftBox}>
                  <Box className={styles.imageBox}>
                    <ImageSquare image={image} />
                  </Box>
                  <Box className={styles.nftInfo}>
                    <Typography className={styles.nftName}>{nftName}</Typography>
                    <Typography className={styles.nftPrice}>${nftUsdPrice}</Typography>
                  </Box>
                </Box>
              </StyledLink>
            </Box>
            <Box>
              <Box className={styles.walletWrapper}>
                <Box className={styles.walletBox}>
                  <Box>
                    <Typography className={styles.walletBalance}>{walletBalance}</Typography>
                    <Typography className={styles.walletName}>
                      {walletName} {t('wallet balance')}
                    </Typography>
                  </Box>
                  <CoinUSD />
                </Box>

                {isShowWalletError && (
                  <ErrorMsg
                    variant="error"
                    text="Insufficient balance, fund your wallet"
                    classes={{rootBackground: styles.walletError}}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box className={styles.buttonsBox}>
            {isShowWalletError && (
              <Button variant="contained" color="primary" className={styles.button} onClick={onAddFundsClick}>
                {t('Add funds')}
              </Button>
            )}
            {!isShowWalletError && (
              <Button variant="contained" color="primary" className={styles.button} onClick={onPayWithCrypto}>
                {t('Pay with crypto')}
              </Button>
            )}
            {!isHidePayByCard && (
              <Button variant="text" color="secondary" className={styles.button} onClick={onPayByCard}>
                {t('Pay by card')}
              </Button>
            )}
          </Box>
          {renderSteper()}
        </>
      </PurchaseModalBox>
    );
  },
);
