import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {SupportedWalletType} from '../../../models/wallet/types';
import {selectUserEmail} from '../../../redux/modules/auth/selectors';
import {LoadExhibitsArrayByIdsCommand} from '../../../redux/modules/exhibits/actions';
import {selectExhibitsBySlugs} from '../../../redux/modules/exhibits/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {ConnectCereWallet} from '../../../redux/modules/wallets';
import {UpdatedPurchaseSuccessModal} from '../../shared/Modals/Purchase/UpdatedPurchaseSuccessModal';

type ModalProps = {
  nftId: string;
  price: number;
  qty: number;
  email: string;
};

const mapStateToProps = (state: any, {nftId}: ModalProps) => {
  const nft = selectNftById(state, nftId);
  const unlockingEventsSlugs = nft?.unlockingEventsSlugs || [];
  const unlockingEvents = unlockingEventsSlugs == null ? [] : selectExhibitsBySlugs(state, unlockingEventsSlugs);
  return {
    isUserAuthenticated: Boolean(selectUserEmail(state)),
    unlockingEvents,
    unlockingEventsSlugs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {email}: ModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  loadUnlockingEvents: (slugs: string[]) => dispatch(LoadExhibitsArrayByIdsCommand.create(slugs)),
  onContinue: () => dispatch(ConnectCereWallet.create(SupportedWalletType.CEREWALLET, undefined, email)),
});

export const UpdatedPurchaseSuccessfulModal = connect(mapStateToProps, mapDispatchToProps)(UpdatedPurchaseSuccessModal);
