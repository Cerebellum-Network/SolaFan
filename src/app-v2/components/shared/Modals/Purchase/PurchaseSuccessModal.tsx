import {Box, Button, Divider, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledALink, StyledLink} from '../../../primitives/StyledLink';
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
  priceUSDC: number;
  quantity: number;
  transitionDetailsLink: string;
  onClose: () => void;
};

export const PurchaseSuccessModal = memo(
  ({image, creatorName, title, nftLink, nftAddress, priceUSDC, quantity, transitionDetailsLink, onClose}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();
    const history = useHistory();

    const totalAmount = priceUSDC * quantity;

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
            <NftModalValueBlock title={t('Price')} value={`${priceUSDC.toFixed(2)} USDC`} />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Total amount')}
              value={`${totalAmount.toFixed(2)} USDC `}
              subValue={`(~${totalAmount.toFixed(2)} USD)`}
            />
          </Box>
          <Box pt="16px">
            <StyledALink href={transitionDetailsLink} className={styles.transitionDetailsBox}>
              <Typography className={styles.transitionDetails}>{t('View transaction details in Explorer')}</Typography>
              <LinkIcon />
            </StyledALink>
          </Box>
        </>
      ),
      [priceUSDC, totalAmount, transitionDetailsLink, styles, t],
    );

    const renderButtons = useCallback(() => {
      const onClick = () => {
        history.push(nftLink);
        onClose();
      };
      return (
        <Button variant="outlined" className={styles.button} onClick={onClick}>
          {t('View NFT')}
        </Button>
      );
    }, [history, nftLink, onClose, styles.button, t]);

    return (
      <PurchaseModalBox
        icon={<SuccessIcon />}
        title={t('Purchase confirmed')}
        subTitle={t('Thank you for your purchase. You will be notified when your transaction is completed')}
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
