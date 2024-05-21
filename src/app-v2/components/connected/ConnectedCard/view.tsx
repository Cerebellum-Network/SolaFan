import {
  AuctionInterface,
  AuctionStatus,
  AvailabilityStatus,
  CheckUserHasNftEnum,
  NftSellingType,
  NftType,
} from '@cere/services-types';
import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {useCallback, useMemo} from 'react';
import {Trans, useTranslation} from 'react-i18next';

import {formatPriceUsd} from '../../../../shared/lib/formatNumber';
import {nftSoldOut} from '../../../utils/helpers/nft-availability';
import {LimitedBadge} from '../../primitives/Badge/LimitedBadge';
import {TransactionProcessing} from '../../primitives/Badge/TransactionProcessing';
import {Card, CardProps} from '../../shared/Card';
import {NftCardCompositeButton} from '../ActionButton/NftCardCompositeButton';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 600,
  },
  actionColor: {
    color: theme.palette.secondary.main,
  },
  flexText: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: '2px',
    },
  },
}));

export type ConnectedCardViewProps = {
  nftId: string;
  nftOrderId: string;
  hasPendingTransaction?: boolean;
  nftPurchaseStatus?: CheckUserHasNftEnum;
  nftAuction?: AuctionInterface;
  nftAvailability: AvailabilityStatus;
  nftSellingType?: NftSellingType;
  nftType: NftType;
  nftBalance?: number;
  nftSupply?: number;
  nftPrice: number;
  priceUsd: number;
  minterWalletAddress: string;
  sellerWalletAddress?: string;
  auctionStatus: AuctionStatus;
  buyBtnEvent?: string;
  cardLink: string;
  userWalletAddress: string | null;
  ownedBalance: string | null;
} & Omit<CardProps, 'cardBadge' | 'bottomInfo' | 'rightBottomElement'>;

export const ConnectedCardView = ({
  nftId,
  nftOrderId,
  hasPendingTransaction,
  nftPurchaseStatus,
  nftAuction,
  nftSellingType,
  nftType,
  nftBalance,
  nftSupply,
  minterWalletAddress,
  sellerWalletAddress,
  title,
  auctionStatus,
  priceUsd,
  cardLink,
  creatorImage,
  creatorName,
  creatorLink,
  onShareClick,
  onLikeClick,
  buyBtnEvent,
  userWalletAddress,
  nftAvailability,
  ownedBalance,
}: ConnectedCardViewProps) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const cardBadge = useMemo(() => {
    if (hasPendingTransaction) {
      return <TransactionProcessing />;
    }
    return <LimitedBadge />;
  }, [hasPendingTransaction]);

  const subTitle = useMemo(
    () =>
      auctionStatus === AuctionStatus.ACTIVE ? (
        t('1 Auctioned Original')
      ) : (
        <Trans
          i18nKey="<strong>{{leftAmount}}</strong>/{{totalAmount}} collectibles left"
          values={{
            leftAmount: nftBalance,
            totalAmount: nftSupply,
          }}
          count={nftBalance}
          components={{strong: <b style={{fontWeight: 500}} />}}
        />
      ),
    [auctionStatus, nftBalance, nftSupply, t],
  );

  const auctionHasBids = !!nftAuction?.bids?.[0];

  const renderCardPriceBadge = useCallback(() => {
    if (
      nftSoldOut({
        availability: nftAvailability!,
        auction: nftAuction,
        auctionStatus: auctionStatus,
        balance: nftBalance!,
      }) ||
      nftAvailability === AvailabilityStatus.COMING_SOON ||
      (auctionStatus === AuctionStatus.NOT_STARTED && nftType !== NftType.ACCESS)
    ) {
      return <></>;
    }
    if (auctionStatus === AuctionStatus.ACTIVE && auctionHasBids) {
      return (
        <Box className={styles.actionColor}>
          <Typography>{t('Top bid')}</Typography>
          <Typography className={styles.bold}>${formatPriceUsd(priceUsd)}</Typography>
        </Box>
      );
    }
    if (auctionStatus === AuctionStatus.ACTIVE) {
      return (
        <Box className={clsx(styles.flexText, styles.actionColor)}>
          <Typography>{t('Starting price')}</Typography>
          <Typography className={styles.bold}>${formatPriceUsd(priceUsd)}</Typography>
        </Box>
      );
    }
    return <Typography className={styles.bold}>${formatPriceUsd(priceUsd)}</Typography>;
  }, [styles, priceUsd, auctionStatus, auctionHasBids, t, nftAuction, nftAvailability, nftBalance, nftType]);

  const renderCardButton = useCallback(
    () => (
      <NftCardCompositeButton
        nftId={nftId}
        nftOrderId={nftOrderId}
        nftPurchaseStatus={nftPurchaseStatus}
        nftSellingType={nftSellingType}
        nftType={nftType}
        sellerWalletAddress={sellerWalletAddress || minterWalletAddress}
        disabled={hasPendingTransaction}
        cardLink={cardLink}
        buyBtnEvent={buyBtnEvent}
        buttonSize="small"
        userWalletAddress={userWalletAddress}
      />
    ),
    [
      nftId,
      nftOrderId,
      nftPurchaseStatus,
      nftSellingType,
      nftType,
      sellerWalletAddress,
      minterWalletAddress,
      hasPendingTransaction,
      cardLink,
      buyBtnEvent,
      userWalletAddress,
    ],
  );

  return (
    <Card
      nftId={nftId}
      title={title}
      subTitle={subTitle}
      creatorImage={creatorImage}
      creatorName={creatorName}
      creatorLink={creatorLink}
      cardBadge={cardBadge}
      onShareClick={onShareClick}
      onLikeClick={onLikeClick}
      leftBottomInfo={renderCardPriceBadge()}
      rightBottomElement={renderCardButton()}
      nftPurchaseStatus={nftPurchaseStatus}
      cardLink={cardLink}
      ownedBalance={ownedBalance}
    />
  );
};
