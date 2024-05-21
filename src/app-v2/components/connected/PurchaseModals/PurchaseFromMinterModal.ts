import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {
  CancelPurchaseCommand,
  PurchaseNFTForCryptoCommand,
  PurchaseNFTForFiatCommand,
} from '../../../redux/modules/purchase/actions';
import {selectActiveWalletBalance, selectActiveWalletType} from '../../../redux/modules/wallets/selectors';
import {createQuantityOptions} from '../../primitives/QuantitySelect/createQuantityOptions';
import {BuyFromMinterModal} from '../../shared/Modals/Purchase/BuyFromMinterModal';

type PurchaseFromMinterModalProps = {
  nftId: string;
  qty: number;
};

const mapStateToProps = (state: any, props: PurchaseFromMinterModalProps) => {
  const nft = selectNftById(state, props.nftId);
  const locale = selectCurrentLocale(state);
  const selectedWalletName = selectActiveWalletType(state);
  const quantityOptions = nft == null ? [] : createQuantityOptions(nft.balance);
  return {
    image: nft?.image,
    creatorName: nft?.creatorName,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId: props.nftId, locale}),
    sellerWalletAddress: nft?.minter,
    walletName: selectedWalletName,
    walletBalance: selectActiveWalletBalance(state),
    nftAddress: nft?.address,
    quantityOptions,
    disabledQuantity: true,
    quantity: props.qty || 1,
    orderId: nft?.orderId,
    priceUSDC: nft?.priceUsd,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: PurchaseFromMinterModalProps) => {
  return {
    onBuyClick: (sellerWalletAddress: string, price: number, qty: number, orderId: string) =>
      dispatch(PurchaseNFTForCryptoCommand.create(nftId, orderId, sellerWalletAddress, price, qty)),
    onClose: () => dispatch(CancelPurchaseCommand.create()),
    onPayByCard: (orderId: string) => dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, 1)),
    onFundWalletClick: () => {}, // FixMe
  };
};

export const PurchaseFromMinterModal = connect(mapStateToProps, mapDispatchToProps)(BuyFromMinterModal);
