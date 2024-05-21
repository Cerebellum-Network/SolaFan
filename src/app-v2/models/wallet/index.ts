import {NETWORK_ID} from '../../../config/common';
import {userDataStorage} from '../auth';
import {createTorusWallet} from './CereWallet';
import {getTorusConnector} from './connectors/CereConnector';
import {IWalletConnector} from './connectors/IWalletConnector';
import {getMetamaskConnector} from './connectors/MetamaskConnector';
import {SupportedWalletType} from './types';
import {WalletConnectionManager} from './WalletConnectionManager';
import {WalletConnectionService} from './WalletConnectionService';
import {WalletConnectionStorage} from './WalletConnectionStorage';

export const torusWallet = createTorusWallet(userDataStorage);

const connectorsMap = new Map<SupportedWalletType, IWalletConnector>();
connectorsMap.set(SupportedWalletType.METAMASK, getMetamaskConnector());
connectorsMap.set(SupportedWalletType.CEREWALLET, getTorusConnector(torusWallet));

const walletConnectionStorage = new WalletConnectionStorage();
const connectionManager = new WalletConnectionManager(walletConnectionStorage, NETWORK_ID);

export const walletConnectionService = new WalletConnectionService(
  connectionManager,
  walletConnectionStorage,
  connectorsMap,
);
