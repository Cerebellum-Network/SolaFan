import {connect} from 'react-redux';

import {BuyLimitedNftModal} from '../../shared/Modals/Purchase/BuyLimitedNftModal';

type PurchaseOnMarketplaceModalProps = {
  nftId: string;
  orderId: string;
  price: number;
  qty: number;
  sellerWalletAddress: string;
};

const mapStateToProps = (
  _: any,
  {nftId, price, qty, orderId, sellerWalletAddress}: PurchaseOnMarketplaceModalProps,
) => ({
  nftId,
  orderId,
  sellerWalletAddress,
  priceUSDC: price,
  quantity: qty,
});

export const PurchaseOnMarketplaceModal = connect(mapStateToProps)(BuyLimitedNftModal);
