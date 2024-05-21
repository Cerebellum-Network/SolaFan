import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {PurchaseNFTForFiatCommand} from '../../../redux/modules/purchase/actions';
import {BuyCollectibleModal as BuyCollectibleModalView} from '../../shared/Modals/Buy/BuyCollectibleModal';

type ModalProps = {
  nftId: string;
  orderId: string;
  qty: number;
};

const mapStateToProps = (state: any, {nftId, qty}: ModalProps) => {
  const nft = selectNftById(state, nftId);
  return {
    quantity: qty || 1,
    nft,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, orderId}: ModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  onSubmit: (qty: number, email: string) => {
    dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, qty, email));
  },
});

export const BuyCollectibleModal = connect(mapStateToProps, mapDispatchToProps)(BuyCollectibleModalView);
