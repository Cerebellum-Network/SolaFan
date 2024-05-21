import {NftSellingType} from '@cere/services-types';
import {useStore} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {HIDE_MARKETPLACE_PAGE} from '../../../../config/common';
import {toBigNumber} from '../../../../shared/lib/big-number-utils';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {selectNftByCmsNftId} from '../../../redux/modules/nfts/selectors';
import {BuyFromMinterButton} from './BuyFromMinterButton';
import {BuyOnMarketplaceButton} from './BuyOnMarketplaceButton';
import {DisabledButton} from './DisabledButton';

export type BuyButtonProps = {
  className?: string;
  nftId: string;
  qty: number;
  sellingType: NftSellingType;
  sellerWalletAddress: string;
  disabled?: boolean;
  buttonText?: string;
  buyBtnEvent?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
};

export const BuyButton = ({
  nftId,
  qty,
  size,
  color,
  sellerWalletAddress,
  disabled,
  buttonText,
  buyBtnEvent,
}: BuyButtonProps) => {
  const location = useLocation();
  const {t} = useLocalization();
  const {getState} = useStore();
  const nft = selectNftByCmsNftId(getState() as any, {cmsNftId: nftId});

  const isPrimaryActive = toBigNumber(nft?.primaryOrder?.balance).gt(0);

  const comingSoonButton = <DisabledButton>{t('Coming soon')}</DisabledButton>;

  if (!nft) {
    return comingSoonButton;
  }

  if (nft && nft.primaryOrder && isPrimaryActive) {
    return (
      <BuyFromMinterButton
        text={buttonText}
        nftId={nftId}
        order={nft.primaryOrder}
        qty={qty}
        disabled={disabled}
        returnTo={location.pathname}
        buyBtnEvent={buyBtnEvent}
        size={size}
        color={color}
      />
    );
  }

  if (HIDE_MARKETPLACE_PAGE) {
    return comingSoonButton;
  }

  return (
    <BuyOnMarketplaceButton
      size="small"
      nftId={nftId}
      orders={nft.secondaryOrders}
      qty={qty}
      sellerWalletAddress={sellerWalletAddress}
      disabled={disabled}
      color={color}
      buttonText={buttonText}
      supply={nft.supply}
    />
  );
};
