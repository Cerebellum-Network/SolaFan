import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AllWallets} from 'shared/types/supported-wallet';

import {selectAppConfig} from '../../redux/modules/app-config/selectors';
import {FetchUserNftsCommand, UserNftsActiveWallet} from '../../redux/modules/user-nfts-page/actions';
import {
  selectUserNfts,
  selectUserNftsActiveWallet,
  selectUserNftsLoading,
} from '../../redux/modules/user-nfts-page/selectors';
import {
  selectActiveWalletType,
  selectConnectedWalletTypes,
  selectNonCustodyWallets,
  selectWalletAddress,
  selectWalletPublicKeys,
} from '../../redux/modules/wallets/selectors';
import {UserNFTsPageView} from './view';

const mapStateToProps = (state: any) => {
  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
  const {appTitle} = selectAppConfig(state);
  const activeWallet = selectUserNftsActiveWallet(state);
  const nfts = selectUserNfts(state);
  const loading = selectUserNftsLoading(state);
  const connectedWallets = selectConnectedWalletTypes(state);
  const walletsPublicKeys = selectWalletPublicKeys(state);
  const nonCustodyWallets = selectNonCustodyWallets(state);
  return {
    nfts,
    loading: walletsPublicKeys.length !== 0,
    loadingNfts: loading,
    appTitle,
    activeWallet,
    walletPublicKey,
    connectedWallets,
    walletsPublicKeys,
    nonCustodyWallets,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadNfts: (nftQueryParam: string[]) => dispatch(FetchUserNftsCommand.create(nftQueryParam)),
    setActiveWallet: (activeWallet: AllWallets) => dispatch(UserNftsActiveWallet.create(activeWallet)),
  };
};

export const UserNftsPage = connect(mapStateToProps, mapDispatchToProps)(UserNFTsPageView as any);
