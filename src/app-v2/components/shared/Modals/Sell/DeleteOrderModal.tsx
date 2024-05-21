import {Box, Button, CircularProgress, Divider, makeStyles} from '@material-ui/core';
import {memo, useCallback, useState} from 'react';

import {useLocalization} from '../../../../hooks/use-locale.hook';
import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as QuestionIcon} from '../assets/question.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
  },
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
  nftLink: string;
  qty: number;
  image?: string;
  title?: string;
  price?: number;
  onClose: () => void;
  cancelOrder: () => void;
};
export const DeleteOrderModal = memo(({image, title, nftLink, qty, price, onClose, cancelOrder}: Props) => {
  const {t} = useLocalization();
  const styles = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);

  const cancelOrderHandler = useCallback(() => {
    setIsProcessing(true);
    cancelOrder?.();
  }, [cancelOrder]);

  const renderNftCardAndUserWallet = useCallback(
    () => (
      <>
        {image && title && (
          <StyledLink to={nftLink}>
            <NftModalHighlightCard image={image} title={title} />
          </StyledLink>
        )}
      </>
    ),
    [image, nftLink, title],
  );

  const renderNftPriceInfo = useCallback(
    () => (
      <>
        <Divider className={styles.hideOnMobileLandscape} />
        <Box pb="8px" pt="16px">
          <NftModalValueBlock title={t('Quantity')} value={qty.toString()} />
        </Box>
        <Divider />
        <Box pb="8px" pt="16px">
          <NftModalValueBlock title={t('Net sales')} value={`$${price}`} />
        </Box>
      </>
    ),
    [price, qty, styles.hideOnMobileLandscape, t],
  );

  const renderButtons = useCallback(
    () => (
      <>
        <Button
          variant="contained"
          disabled={isProcessing}
          color="inherit"
          className={styles.button}
          onClick={cancelOrderHandler}
        >
          {isProcessing ? <CircularProgress /> : t('Yes, Delete Order')}
        </Button>
        <Button variant="outlined" className={styles.button} onClick={onClose}>
          {t('No, Keep Order')}
        </Button>
      </>
    ),
    [styles, t, isProcessing, cancelOrderHandler, onClose],
  );

  return (
    <PurchaseModalBox
      icon={<QuestionIcon />}
      title={t('Confirm deleting this order')}
      subTitle={t('Are you sure you want to delete your sell order for this NFT?')}
      onClose={onClose}
    >
      <PurchaseModalBoxInner
        renderNftCardAndUserWallet={renderNftCardAndUserWallet}
        renderNftPriceInfo={renderNftPriceInfo}
        renderButtons={renderButtons}
      />
    </PurchaseModalBox>
  );
});
