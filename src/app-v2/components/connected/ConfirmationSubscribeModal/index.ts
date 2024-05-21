import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {PlainConfirmationSubscribeModal} from './view';

const mapStateToProps = (_state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const ConfirmationSubscribeModal = connect(mapStateToProps, mapDispatchToProps)(PlainConfirmationSubscribeModal);
