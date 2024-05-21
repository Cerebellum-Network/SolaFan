import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {SupportedWalletType} from '../../../models/wallet/types';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {ConnectWalletCommand} from '../../../redux/modules/wallets/actions';
import {ConnectWalletDialogView} from './view';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  connectWallet: (value: SupportedWalletType) => dispatch(ConnectWalletCommand.create(value)),
});

export const ConnectWalletDialog = connect(() => ({}), mapDispatchToProps)(ConnectWalletDialogView);
