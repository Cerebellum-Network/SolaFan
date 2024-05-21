import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {PurchaseNFTForCryptoCommand} from '../../../redux/modules/purchase/actions';
import {PurchaseFailedModal as PlainPurchasedFailedModal} from '../../shared/Modals/Purchase/PurchaseFailedModal';

type ModalProps = {
  nftId: string;
  orderId: string;
  price: number;
  qty: number;
};

const mapStateToProps = (state: any, {nftId, price, qty}: ModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  return {
    image: nft?.image,
    creatorName: nft?.creatorName,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId: nftId, locale}),
    nftAddress: nft?.address,
    quantity: qty,
    priceUSDC: price,
    sellerWalletAddress: nft?.minter,
    transitionDetailsLink: '', // FixMe
    backButtonText: 'Ok',
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, orderId, price, qty}: ModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  onBackButtonClick: () => dispatch(CloseActiveModalCommand.create()),
  onTryAgainClick: (sellerWalletAddress: string) =>
    dispatch(PurchaseNFTForCryptoCommand.create(nftId, orderId, sellerWalletAddress, price, qty)),
});

export const PurchaseFailedModal = connect(mapStateToProps, mapDispatchToProps)(PlainPurchasedFailedModal);
