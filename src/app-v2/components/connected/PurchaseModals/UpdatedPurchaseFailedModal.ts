import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {PurchaseNFTForFiatCommand} from '../../../redux/modules/purchase/actions';
import {UpdatedPurchaseFailedModal as PlainPurchasedFailedModal} from '../../shared/Modals/Purchase/UpdatedPurchaseFailedModal';

type ModalProps = {
  nftId: string;
  orderId: string;
  price: number;
  qty: number;
  email?: string;
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, orderId, qty, email}: ModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  onBackButtonClick: () => dispatch(CloseActiveModalCommand.create()),
  onTryAgainClick: () => dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, qty, email)),
});

export const UpdatedPurchaseFailedModal = connect(() => ({}), mapDispatchToProps)(PlainPurchasedFailedModal);
