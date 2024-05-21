import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {LoadMarketplaceDataCommand} from '../../redux/modules/marketplace/actions';
import {selectMarketplaceState} from '../../redux/modules/marketplace/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {MarketplacePageView} from './view';

const mapStateToProps = (state: any) => {
  const {featuredNftIds, collectableNftIds, loadingState} = selectMarketplaceState(state);
  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
  return {
    featuredNftIds,
    collectableNftIds,
    userWalletAddress: walletPublicKey || null,
    ...loadingState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadData: () => dispatch(LoadMarketplaceDataCommand.create()),
});

export const MarketplacePage = connect(mapStateToProps, mapDispatchToProps)(MarketplacePageView);
