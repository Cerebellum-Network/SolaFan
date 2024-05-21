import {Box, Button, Divider, makeStyles} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as ErrorIcon} from '../assets/error.svg';
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
  netSalesTitle: {
    color: theme.palette.text.primary,
  },
}));

type Props = {
  image?: string;
  title?: string;
  subTitle?: string;
  nftLink: string;
  nftAddress?: string;
  royalties?: number;
  price: number;
  quantity: number;
  onClose: () => void;
  onTryAgainClick: () => void;
  backButtonText: string;
};

export const SellFailedModal = memo(
  ({image, title, subTitle, nftLink, nftAddress, price, royalties, quantity, onClose, onTryAgainClick}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const netSales = price - price * (royalties || 0);

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} title={title} />
            </StyledLink>
          )}
          {nftAddress && (
            <Box pt="16px">
              <CopyBox title={t('Collectible ID')} copiedText={nftAddress} />
            </Box>
          )}
        </>
      ),
      [image, nftAddress, nftLink, title, t],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          <Divider className={styles.hideOnMobileLandscape} />
          <div className="pb-2 pt-4">
            <NftModalValueBlock title={t('Quantity')} value={quantity.toString()} />
          </div>
          <Divider />
          <div className="pb-2 pt-4">
            <NftModalValueBlock
              title={t('Offer')}
              subValue={`(~${price.toFixed(2)} USD)`}
              value={`${price.toFixed(2)} USDC`}
            />
          </div>
          <Divider />
          <div className="pb-2 pt-4">
            <NftModalValueBlock
              title={t('Royalties')}
              subValue={`(~${royalties?.toFixed(2)} USD)`}
              value={`${royalties?.toFixed(2)} USDC`}
            />
          </div>
          <Divider />
          <div className="pb-2 pt-4">
            <NftModalValueBlock
              title={t('Net sales')}
              value={`${netSales.toFixed(2)} USDC `}
              subValue={`(~${netSales.toFixed(2)} USD)`}
              classes={{title: styles.netSalesTitle}}
            />
          </div>
        </>
      ),
      [netSales, price, quantity, royalties, styles.hideOnMobileLandscape, styles.netSalesTitle, t],
    );

    const renderButtons = useCallback(
      () => (
        <>
          <Button variant="contained" className={styles.button} onClick={onTryAgainClick}>
            {t('Try again')}
          </Button>
        </>
      ),
      [onTryAgainClick, styles, t],
    );

    return (
      <PurchaseModalBox
        icon={<ErrorIcon color="error" />}
        title={t('Listing failed')}
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
