import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {SupportedWalletType} from '../../../models/wallet/types';
import {selectAppConfig} from '../../../redux/modules/app-config/selectors';
import {SignOutCommand} from '../../../redux/modules/auth/actions';
import {selectUserEmail} from '../../../redux/modules/auth/selectors';
import {ShowConnectYourWalletDialogCommand} from '../../../redux/modules/home-page/actions';
import {selectNfts} from '../../../redux/modules/nfts/selectors';
import {ConnectCereWallet, SelectWalletTypeCommand} from '../../../redux/modules/wallets';
import {
  selectActiveWalletType,
  selectConnectedWalletTypes,
  selectWalletAddress,
  selectWalletBalance,
} from '../../../redux/modules/wallets/selectors';
import {UserMenu} from '../../shared/UserMenu';
import {ReactComponent as Cere} from './assets/cere.svg';
import {ReactComponent as Davinci} from './assets/davinci.svg';
import {ReactComponent as Metamask} from './assets/metamask.svg';
import walletConnect from './assets/walletconnect.svg';

export const getWalletDetails = (walletType: SupportedWalletType, appTitle: string) => {
  switch (walletType) {
    case SupportedWalletType.APP:
      return {
        title: `${appTitle} wallet`,
        icon: <Davinci />,
      };
    case SupportedWalletType.CEREWALLET:
      return {
        title: `Cere wallet`,
        icon: <Cere />,
      };
    case SupportedWalletType.METAMASK:
      return {
        title: `Metamask wallet`,
        icon: <Metamask />,
      };
    case SupportedWalletType.WALLETCONNECT:
      return {
        title: `WalletConnect wallet`,
        icon: <img src={walletConnect} alt="WalletConnect" />,
      };
    default:
      return {
        title: 'Unknown wallet',
        icon: <span />,
      };
  }
};

const mapStateToProps = (state: any) => {
  const appConfig = selectAppConfig(state);
  const activeWalletType = selectActiveWalletType(state);
  const nfts = selectNfts(state);
  const userNfts = Object.values(nfts).filter((nft) => nft?.purchaseStatus === 'USER_HAS_NFT');

  return {
    isUserAuthenticated: Boolean(selectUserEmail(state)),
    userEmail: selectUserEmail(state) || '',
    totalNftsCount: userNfts.length,
    selectedWallet: activeWalletType,
    hasNewNotifications: false, // FixMe
    faqUrl: appConfig.faqUrl,
    connectedWallets: selectConnectedWalletTypes(state).map((wallet) => ({
      ...getWalletDetails(wallet, appConfig.appTitle),
      type: wallet,
      walletBalance: (selectWalletBalance(state, wallet) || 0).toString(),
      nftsCount: userNfts.length,
      publicKey: selectWalletAddress(state, activeWalletType),
    })),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignIn: () => dispatch(ConnectCereWallet.create(SupportedWalletType.CEREWALLET)),
  onSignOut: () => dispatch(SignOutCommand.create()),
  onConnectWallet: () => dispatch(ShowConnectYourWalletDialogCommand.create()),
  onSelectWallet: (walletId: SupportedWalletType) => dispatch(SelectWalletTypeCommand.create(walletId)),
});

export const ConnectedUserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
