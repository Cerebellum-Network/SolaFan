import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getWalletDetails} from '../../components/connected/ConnectedUserMenu';
import {SupportedWalletType} from '../../models/wallet/types';
import {selectAppConfig} from '../../redux/modules/app-config/selectors';
import {FetchProfileCommand} from '../../redux/modules/collectors/actions';
import {
  selectMyCollectorsProfile,
  selectMyCollectorsProfileLoadingState,
} from '../../redux/modules/collectors/selectors';
import {FetchCreatorsCommand} from '../../redux/modules/creators';
import {selectCreatorsLoading, selectRandomCreator} from '../../redux/modules/creators/selectors';
import {DisconnectWalletCommand, OpenWallet} from '../../redux/modules/wallets';
import {
  selectActiveWalletType,
  selectConnectedWalletTypes,
  selectWalletAddress,
  selectWalletBalance,
} from '../../redux/modules/wallets/selectors';
import {WalletPageView} from './view';

const mapStateToProps = (state: any) => {
  const profileNfts = selectMyCollectorsProfile(state)?.collectedNfts;
  const loading = selectMyCollectorsProfileLoadingState(state);
  const appConfig = selectAppConfig(state);

  const activeWalletType = selectActiveWalletType(state);
  const isCreatorsLoading = selectCreatorsLoading(state);
  const randomCreator = selectRandomCreator(state);

  return {
    randomCreator,
    isCreatorsLoading,
    selectedWalletType: activeWalletType,
    connectedWallets: selectConnectedWalletTypes(state).map((wallet) => ({
      ...getWalletDetails(wallet, appConfig.appTitle),
      type: wallet,
      walletBalance: (selectWalletBalance(state, wallet) || 0).toString(),
      nftsCount: 1, // FIXME
      publicKey: selectWalletAddress(state, activeWalletType),
    })),
    profileNfts: loading ? undefined : profileNfts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCreators: () => dispatch(FetchCreatorsCommand.create()),
  fetchProfileNfts: () => dispatch(FetchProfileCommand.create()),
  disconnectWallet: (type: SupportedWalletType) => dispatch(DisconnectWalletCommand.create(type)),
  openWallet: (type: SupportedWalletType) => dispatch(OpenWallet.create(type)),
});

export const WalletPage = connect(mapStateToProps, mapDispatchToProps)(WalletPageView);
