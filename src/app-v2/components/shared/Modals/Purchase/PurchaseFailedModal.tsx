import {Box, Button, Divider, makeStyles, Typography} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as LinkIcon} from '../assets/link.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      height: '44px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      height: '40px',
      width: '180px',
    },
  },
  hideOnMobileLandscape: {
    [mobileLandscapeMediaQuery(theme)]: {
      display: 'none',
    },
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
  image?: string;
  creatorName?: string;
  title?: string;
  subTitle?: string;
  nftLink: string;
  nftAddress?: string;
  quantity: number;
  priceUSDC: number;
  sellerWalletAddress?: string;
  transitionDetailsLink: string;
  onClose: () => void;
  onTryAgainClick: (sellerWalletAddress: string) => void;
  backButtonText: string;
  onBackButtonClick: () => void;
};

export const PurchaseFailedModal = memo(
  ({
    image,
    creatorName,
    title,
    subTitle,
    nftLink,
    nftAddress,
    quantity,
    priceUSDC,
    sellerWalletAddress,
    transitionDetailsLink,
    onClose,
    onTryAgainClick,
    backButtonText,
    onBackButtonClick,
  }: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const totalAmount = priceUSDC * quantity;

    const handleRetry = useCallback(() => {
      if (sellerWalletAddress) {
        onTryAgainClick(sellerWalletAddress);
      }
    }, [onTryAgainClick, sellerWalletAddress]);

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && creatorName && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} creator={creatorName} title={title} />
            </StyledLink>
          )}
          {nftAddress && (
            <Box pt="16px">
              <CopyBox title={t('NFT ID')} copiedText={nftAddress} />
            </Box>
          )}
        </>
      ),
      [creatorName, image, nftAddress, nftLink, title, t],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          <Divider className={styles.hideOnMobileLandscape} />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Quantity')} value={`${quantity}`} />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Price')} value={`${priceUSDC.toFixed(2)} USDC `} />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Total amount')}
              value={`${totalAmount.toFixed(2)} USDC `}
              subValue={`(~${totalAmount.toFixed(2)} USD)`}
            />
          </Box>
          <Divider />
          <Box pt="16px">
            <StyledLink to={transitionDetailsLink} className={styles.transitionDetailsBox}>
              <Typography className={styles.transitionDetails}>{t('View transaction details in Explorer')}</Typography>
              <LinkIcon />
            </StyledLink>
          </Box>
        </>
      ),
      [priceUSDC, quantity, totalAmount, transitionDetailsLink, styles, t],
    );

    const renderButtons = useCallback(
      () => (
        <>
          <Button variant="contained" color="primary" className={styles.button} onClick={handleRetry}>
            {t('Try again')}
          </Button>
          <Button className={styles.button} onClick={onBackButtonClick}>
            {t(backButtonText)}
          </Button>
        </>
      ),
      [backButtonText, handleRetry, onBackButtonClick, styles.button, t],
    );

    return (
      <PurchaseModalBox
        icon={<ErrorIcon color="error" />}
        title={t('Payment failed')}
        subTitle={subTitle ?? t('Oops, something happened. Please try again')}
        onClose={onClose}
      >
        <PurchaseModalBoxInner
          renderNftCardAndUserWallet={renderNftCardAndUserWallet}
          renderNftPriceInfo={renderNftPriceInfo}
          renderButtons={renderButtons}
        />
      </PurchaseModalBox>
    );
  },
);
