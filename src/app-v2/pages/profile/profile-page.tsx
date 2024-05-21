import {FC} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Dispatch} from 'redux';

import {getWalletDetails} from '../../components/connected/ConnectedUserMenu';
import {selectAppConfig} from '../../redux/modules/app-config/selectors';
import {selectUserEmail} from '../../redux/modules/auth/selectors';
import {FetchProfileCommand} from '../../redux/modules/collectors/actions';
import {
  selectCollectorsProfile,
  selectCollectorsProfileLoadingState,
  selectMyCollectorsProfile,
  selectMyCollectorsProfileLoadingState,
} from '../../redux/modules/collectors/selectors';
import {selectExhibits} from '../../redux/modules/exhibits/selectors';
import {FetchExhibitsCommand} from '../../redux/modules/exhibits-page/actions';
import {selectExhibitsLoadingState} from '../../redux/modules/exhibits-page/selectors';
import {
  selectActiveWalletType,
  selectConnectedWalletTypes,
  selectWalletAddress,
  selectWalletBalance,
} from '../../redux/modules/wallets/selectors';
import {ProfilePageView} from './profile-page-view-view';

const mapStateToProps = (state: any, {walletPublicKey}: {walletPublicKey?: string}) => {
  const profile =
    walletPublicKey == null ? selectMyCollectorsProfile(state) : selectCollectorsProfile(state, walletPublicKey);
  const loading =
    walletPublicKey == null
      ? selectMyCollectorsProfileLoadingState(state)
      : selectCollectorsProfileLoadingState(state, walletPublicKey);

  const nfts = profile?.collectedNfts;
  const exhibitions = profile?.collectedExhibitions;
  const creators = profile?.collectedCreators;

  const appConfig = selectAppConfig(state);

  const allEvents = Object.values(selectExhibits(state)) || [];

  const activeWalletType = selectActiveWalletType(state);

  return {
    isUserAuthenticated: Boolean(selectUserEmail(state)),
    nfts,
    exhibitions,
    creators,
    loading: loading == null ? true : loading,
    selectedWalletType: activeWalletType,
    connectedWallets: selectConnectedWalletTypes(state).map((wallet) => ({
      ...getWalletDetails(wallet, appConfig.appTitle),
      type: wallet,
      walletBalance: (selectWalletBalance(state, wallet) || 0).toString(),
      nftsCount: 1, // FIXME
      publicKey: selectWalletAddress(state, activeWalletType),
    })),
    isLoadingExhibits: selectExhibitsLoadingState(state),
    allEvents,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {walletPublicKey}: {walletPublicKey?: string}) => {
  return {
    loadExhibits: () => dispatch(FetchExhibitsCommand.create()),
    fetchProfile: () => dispatch(FetchProfileCommand.create(walletPublicKey)),
  };
};

const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageView);

export const CollectorProfilePage: FC = () => {
  const {walletPublicKey} = useParams<{walletPublicKey: string}>();
  return <ProfilePage walletPublicKey={walletPublicKey} />;
};

export const MyProfilePage: FC = () => {
  return <ProfilePage />;
};
