import {AvailabilityStatus, CheckUserHasNftEnum, NftSellingType, NftType} from '@cere/services-types';
import {Button, makeStyles, Typography} from '@material-ui/core';
import {useCallback} from 'react';
import {useStore} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {HIDE_MARKETPLACE_PAGE} from '../../../../config/common';
import {toBigNumber} from '../../../../shared/lib/big-number-utils';
import {formatNumber, formatPriceUsd} from '../../../../shared/lib/formatNumber';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {selectNftByCmsNftId} from '../../../redux/modules/nfts/selectors';
import {BuyButton} from './BuyButton';
import {SellButton} from './SellButton';

const useStyles = makeStyles(() => ({
  smallerButton: {
    fontSize: '12px',
    padding: '7px 12px !important',
  },
}));

type NftCardCompositeButtonProps = {
  excludeSellButton?: boolean;
  nftId: string;
  nftOrderId: string;
  nftPurchaseStatus?: CheckUserHasNftEnum;
  nftSellingType?: NftSellingType;
  nftType: NftType;
  nftQuantity?: number;
  sellerWalletAddress?: string;
  cardLink?: string;
  disabled?: boolean;
  buttonText?: string;
  buyBtnEvent?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  userWalletAddress: string | null;
};

export const NftCardCompositeButton = ({
  excludeSellButton,
  nftId,
  nftSellingType,
  nftQuantity,
  disabled,
  sellerWalletAddress,
  cardLink,
  buttonText,
  buyBtnEvent,
  buttonSize,
  userWalletAddress,
}: NftCardCompositeButtonProps) => {
  const color = buttonSize === 'medium' ? 'primary' : 'default';
  const {t, locale} = useLocalization();
  const {getState} = useStore();
  const nft = selectNftByCmsNftId(getState() as any, {cmsNftId: nftId});
  const styles = useStyles();

  const renderNftButton = useCallback(() => {
    const primaryOrdersSoldOut = nft?.primaryOrder == null || toBigNumber(nft.primaryOrder.balance).eq(0);

    // 2024-02-20, add !HIDE_MARKETPLACE_PAGE because of https://www.notion.so/cere/User-should-be-able-to-buy-collectible-again-even-if-user-already-bought-it-c7e12f18d35f4aecab295c77f0b26939?pvs=6&utm_content=c7e12f18-d35f-4aec-ab29-5c77f0b26939&utm_campaign=T0686QGGJ&n=slack&n=slack_link_unfurl and https://cere-network.slack.com/archives/C04L6GD5KU4/p1708346686042349
    if (
      !excludeSellButton &&
      cardLink &&
      nft?.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT &&
      !HIDE_MARKETPLACE_PAGE &&
      primaryOrdersSoldOut
    ) {
      const ownSecondaryOrder =
        userWalletAddress == null
          ? undefined
          : nft.secondaryOrders?.find((order) => order.creator.toLowerCase() === userWalletAddress.toLowerCase());

      return ownSecondaryOrder || userWalletAddress === sellerWalletAddress ? (
        <Button size={buttonSize} component={Link} to={cardLink} color={color} variant="contained">
          {t('View')}
        </Button>
      ) : (
        <SellButton size={buttonSize} nftId={nft.id} disabled={disabled} cardLink={cardLink} />
      );
    }

    if (nft == null || (nft.primaryOrder == null && nft.secondaryOrders?.length === 0)) {
      return (
        <Button color={color} variant="outlined" size={buttonSize || 'small'}>
          {t('Coming soon')}
        </Button>
      );
    }

    const secondaryOrdersSoldOut =
      nft.secondaryOrders != null && nft.secondaryOrders.every((order) => toBigNumber(order.balance).eq(0));
    const isSoldOut = primaryOrdersSoldOut && secondaryOrdersSoldOut;

    if (isSoldOut) {
      return (
        <Button size={buttonSize} component={Link} to={cardLink} color={color} variant="contained">
          {t('View')}
        </Button>
      );
    }

    if (nft.secondaryOrders?.length > 0 && primaryOrdersSoldOut && !HIDE_MARKETPLACE_PAGE) {
      const balance = nft.secondaryOrders.reduce((acc, order) => acc + Number(order.balance), 0);
      const supply = nft.supply || 0;
      const bestPrice = nft.secondaryOrders.reduce((acc, order) => Math.min(acc, order.priceUsd), Infinity);
      return (
        <Button
          component={Link}
          to={generatePath(ROUTES.NFT_MARKETPLACE, {locale, nftId})}
          size={buttonSize === 'small' ? 'small' : 'medium'}
          color={buttonSize === 'small' ? 'default' : 'primary'}
          variant={buttonSize === 'small' ? 'contained' : 'outlined'}
          className={buttonSize === 'small' ? styles.smallerButton : undefined}
        >
          {buttonSize === 'small' ? (
            t('Buy on marketplace')
          ) : (
            <Typography variant="caption">
              {formatNumber(balance)} / {formatNumber(supply)} {t('Left')} | {t('Buy on marketplace')} &mdash; $
              {formatPriceUsd(bestPrice)}
            </Typography>
          )}
        </Button>
      );
    }

    if (nft.availability === AvailabilityStatus.OFFER_ENDED) {
      return (
        <Button color={color} variant="outlined" size={buttonSize}>
          {t('Offer ended')}
        </Button>
      );
    }
    return (
      <BuyButton
        className={GoogleAnalyticsId.CollectibleBuyBtn}
        nftId={nft.id}
        qty={nftQuantity || 1}
        sellingType={nftSellingType!}
        sellerWalletAddress={sellerWalletAddress!}
        disabled={disabled}
        buttonText={buttonText}
        size={buttonSize}
        color={color}
        buyBtnEvent={buyBtnEvent}
      />
    );
  }, [
    excludeSellButton,
    cardLink,
    nft,
    nftQuantity,
    nftSellingType,
    sellerWalletAddress,
    disabled,
    buttonText,
    buttonSize,
    color,
    buyBtnEvent,
    userWalletAddress,
    t,
    locale,
    nftId,
    styles.smallerButton,
  ]);

  return renderNftButton();
};
