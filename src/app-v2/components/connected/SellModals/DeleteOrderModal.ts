import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {CancelNFTSellingCommand} from '../../../redux/modules/selling/actions';
import {DeleteOrderModal as PlainDeleteOrderModal} from '../../shared/Modals/Sell/DeleteOrderModal';

type DeleteOrderModalProps = {
  nftId: string;
  qty: number;
  orderId: string;
};
const mapStateToProps = (state: any, {nftId, qty}: DeleteOrderModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  return {
    image: nft?.image,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    quantity: qty,
    price: nft?.priceUsd,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, orderId}: DeleteOrderModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  cancelOrder: () => dispatch(CancelNFTSellingCommand.create(nftId, orderId)),
});

export const DeleteOrderModal = connect(mapStateToProps, mapDispatchToProps)(PlainDeleteOrderModal);
