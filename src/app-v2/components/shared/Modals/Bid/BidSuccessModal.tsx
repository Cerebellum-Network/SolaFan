import {Box, Button, Divider, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as LinkIcon} from '../assets/link.svg';
import {ReactComponent as SuccessIcon} from '../assets/success.svg';
import {ReactComponent as TransactionProcessing} from '../assets/transactionProcessing.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  pendingStatus: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.grey[700],
    paddingBottom: '4px',
  },
  transactionProcessingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingBottom: '16px',
  },
  transactionProcessing: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary,
  },
  button: {
    width: '311px',
    textTransform: 'none',
    borderColor: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      height: '44px',
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
  nftLink: string;
  nftAddress?: string;
  bidsCount: number;
  userBid: number;
  transitionDetailsLink: string;
  onClose: () => void;
};

export const BidSuccessModal = memo(
  ({image, creatorName, title, nftLink, nftAddress, bidsCount, userBid, transitionDetailsLink, onClose}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          <Typography className={styles.pendingStatus}>{t('Pending status')}</Typography>
          <Box className={styles.transactionProcessingBox}>
            <Typography className={styles.transactionProcessing}>{t('Bid transaction processing')}</Typography>
            <TransactionProcessing />
          </Box>
          {image && creatorName && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} creator={creatorName} title={title} />
            </StyledLink>
          )}
          {nftAddress && <CopyBox title={t('NFT ID')} copiedText={nftAddress} />}
        </>
      ),
      [creatorName, title, image, nftAddress, nftLink, styles, t],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          <Divider className={styles.hideOnMobileLandscape} />
          <Box pb="8px">
            <NftModalValueBlock title={t('Quantity')} value="1" />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Your bid')}
              subTitle={`(${bidsCount} ${t('bids')})`}
              value={`${userBid.toFixed(2)} USDC`}
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
      [bidsCount, transitionDetailsLink, userBid, styles, t],
    );

    const renderButtons = useCallback(
      () => (
        <Button variant="outlined" className={styles.button} onClick={onClose}>
          {t('Ok')}
        </Button>
      ),
      [onClose, styles, t],
    );

    return (
      <PurchaseModalBox
        icon={<SuccessIcon />}
        title={t('Bid successful')}
        subTitle={t(
          'Your bid will be placed. It might take some time to show up in the bid history. You will be notified when your transaction is completed',
        )}
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
