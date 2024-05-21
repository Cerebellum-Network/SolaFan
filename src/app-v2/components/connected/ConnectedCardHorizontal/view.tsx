import {
  AuctionInterface,
  AuctionStatus,
  AvailabilityStatus,
  CheckUserHasNftEnum,
  NftSellingType,
  NftType,
} from '@cere/services-types';
import {useCallback, useMemo} from 'react';
import {Trans, useTranslation} from 'react-i18next';

import {nftSoldOut} from '../../../utils/helpers/nft-availability';
import {CardHorizontal, CardHorizontalProps} from '../../shared/CardHorizontal';
import {NftCardCompositeButton} from '../ActionButton/NftCardCompositeButton';

export type ConnectedCardHorizontalViewProps = {
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
  cardLink: string;
  minterWalletAddress: string;
  sellerWalletAddress?: string;
  auctionStatus: AuctionStatus;
  userWalletAddress: string | null;
} & Omit<CardHorizontalProps, 'subTitle' | 'priceUSD' | 'renderActionElement'>;

export const ConnectedCardHorizontalView = ({
  nftId,
  nftOrderId,
  hasPendingTransaction,
  nftPurchaseStatus,
  nftSellingType,
  nftType,
  nftBalance,
  nftSupply,
  minterWalletAddress,
  sellerWalletAddress,
  cardLink,
  auctionStatus,
  userWalletAddress,
  nftAvailability,
  nftAuction,
}: ConnectedCardHorizontalViewProps) => {
  const {t} = useTranslation();

  const hidePrice = useCallback(() => {
    let ret = false;
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
      ret = true;
    }
    return ret;
  }, [nftAvailability, nftAuction, auctionStatus, nftBalance, nftType]);

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
        />
      ),
    [auctionStatus, nftBalance, nftSupply, t],
  );

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
      userWalletAddress,
    ],
  );

  return (
    <CardHorizontal nftId={nftId} subTitle={subTitle} renderActionElement={renderCardButton} hidePrice={hidePrice()} />
  );
};
