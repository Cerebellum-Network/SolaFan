import {Box, Button, Divider, makeStyles} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
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
  nftAddress: string;
  sellerWalletAddress: string;
  userBid: number;
  onClose: () => void;
  tryAgain: () => void;
};

export const BidFailedModal = memo(
  ({image, creatorName, title, subTitle, nftLink, nftAddress, userBid, onClose, tryAgain}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && creatorName && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} creator={creatorName} title={title} />
            </StyledLink>
          )}
          <Box pt="16px">
            <CopyBox title={t('NFT ID')} copiedText={nftAddress} />
          </Box>
        </>
      ),
      [creatorName, image, nftAddress, nftLink, title, t],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          <Divider className={styles.hideOnMobileLandscape} />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Quantity')} value="1" />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Your bid')}
              subTitle={`(${1} ${t('bids')})`}
              value={`${userBid.toFixed(2)} USDC`}
            />
          </Box>
          <Divider />
        </>
      ),
      [styles.hideOnMobileLandscape, t, userBid],
    );

    const renderButtons = useCallback(
      () => (
        <>
          <Button variant="contained" color="primary" className={styles.button} onClick={tryAgain}>
            {t('Try again')}
          </Button>
          <Button className={styles.button} onClick={onClose}>
            {t('Ok')}
          </Button>
        </>
      ),
      [onClose, tryAgain, styles.button, t],
    );

    return (
      <PurchaseModalBox
        icon={<ErrorIcon color="error" />}
        title={t('Bid failed')}
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
