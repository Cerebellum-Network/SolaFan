import {IWalletsApi} from '../../../api/wallet/IWalletsApi';
import {WalletsBalanceService} from '../../../models/balance/WalletsBalanceService';
import {WalletConnectionService} from '../../../models/wallet/WalletConnectionService';
import {StoreModule} from '../../base/types';
import {USER_WALLETS_MODULE_NAME} from './constants';
import {
  connectWalletMiddleware,
  disconnectWalletMiddleware,
  openWalletMiddleware,
  selectWalletMiddleware,
  walletsBalancePollingMiddleware,
  walletsConnectionRestoreMiddleware,
  walletsInitMiddleware,
} from './middlewares';
import {userWalletsModuleReducer} from './reducers';

export * from './actions';
export * from './statuses/actions';

const BALANCE_POLLING_INTERVAL = 30000;

export const createUserWalletsModule = (
  walletsApi: IWalletsApi,
  walletConnectionService: WalletConnectionService,
  walletsBalanceService: WalletsBalanceService,
): StoreModule => ({
  title: USER_WALLETS_MODULE_NAME,
  moduleReducer: userWalletsModuleReducer,
  middlewares: [
    walletsInitMiddleware,
    walletsConnectionRestoreMiddleware(walletsApi, walletConnectionService),
    connectWalletMiddleware(walletsApi, walletConnectionService),
    selectWalletMiddleware(walletConnectionService),
    disconnectWalletMiddleware(walletsApi, walletConnectionService),
    walletsBalancePollingMiddleware(walletsBalanceService, BALANCE_POLLING_INTERVAL),
    openWalletMiddleware(walletConnectionService),
  ],
});
