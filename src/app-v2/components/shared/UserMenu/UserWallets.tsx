import {Box} from '@material-ui/core';

import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletType} from '../Wallet/types';
import {UserWalletsItem} from './UserWalletsItem';

export type UserWalletsItemProps = {
  userWallets: WalletType[];
  selectedWallet: SupportedWalletType;
  onWalletSelect: (type: SupportedWalletType) => void;
};

export const UserWallets = ({userWallets, selectedWallet, onWalletSelect}: UserWalletsItemProps) => {
  return (
    <Box>
      {userWallets.map((wallet) => (
        <UserWalletsItem key={wallet.type} wallet={wallet} onSelect={onWalletSelect} selectedWallet={selectedWallet} />
      ))}
    </Box>
  );
};
