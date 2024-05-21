import {memo} from 'react';

import {SupportedWalletType} from '../../../models/wallet/types';
import {ConnectWalletDialog} from '../../shared/ConnectWalletDialog';

type Props = {
  onClose: () => void;
  connectWallet: (value: SupportedWalletType) => void;
};

export const ConnectWalletDialogView = memo(({onClose, connectWallet}: Props) => {
  const connectMetamask = async () => {
    connectWallet(SupportedWalletType.METAMASK);
  };

  const connectWalletConnect = async () => {
    connectWallet(SupportedWalletType.WALLETCONNECT);
  };

  return (
    <ConnectWalletDialog
      onClose={onClose}
      onConnectMetamask={connectMetamask}
      onConnectWalletConnect={connectWalletConnect}
    />
  );
});
