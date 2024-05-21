import {WalletStatus} from '@cere/embed-wallet';
import {AnyAction, MiddlewareAPI} from 'redux';

import {IWalletsApi} from '../../../api/wallet/IWalletsApi';
import {userDataStorage} from '../../../models/auth';
import {WalletsBalanceService} from '../../../models/balance/WalletsBalanceService';
import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletConnectionService} from '../../../models/wallet/WalletConnectionService';
import {LoadAppConfigSuccessEvent} from '../app-config/actions';
import {selectAppConfig} from '../app-config/selectors';
import {UserDataDocument} from '../auth/actions';
import {selectUserEmail} from '../auth/selectors';
import {
  ActiveWalletTypeDocument,
  ConnectedWalletsTypesDocument,
  ConnectWalletCommand,
  DisconnectWalletCommand,
  OpenWallet,
  RestoreWalletsConnectionCommand,
  SelectWalletTypeCommand,
  SetNonCustodyWalletsCommand,
  StartWalletsBalancePollingCommand,
  WalletConnectedEvent,
  WalletConnectionFailedEvent,
  WalletDisconnectedEvent,
  WalletDisconnectionFailedEvent,
  WalletsBalanceDocument,
  WalletsConnectionRestorationFailedEvent,
  WalletsConnectionRestoredEvent,
} from './actions';

export const walletsInitMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === LoadAppConfigSuccessEvent.type) {
      dispatch(RestoreWalletsConnectionCommand.create());
    }
  };

export const walletsConnectionRestoreMiddleware =
  (walletsApi: IWalletsApi, walletConnectionService: WalletConnectionService) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === RestoreWalletsConnectionCommand.type) {
      const appConfig = selectAppConfig(getState());

      try {
        const connectedWallets = await walletsApi.getConnectedWallets();
        walletConnectionService.addConnectedWallets(connectedWallets.map((w) => w.type));
        await walletConnectionService.restoreAllWalletsConnection({appConfig});
        const connectedWalletsTypes = walletConnectionService.getAllConnectedWalletsTypes();
        const activeWallet = walletConnectionService.getActiveWalletType();
        dispatch(WalletsConnectionRestoredEvent.create());
        dispatch(ConnectedWalletsTypesDocument.create(connectedWalletsTypes));
        dispatch(ActiveWalletTypeDocument.create(activeWallet));
        dispatch(SetNonCustodyWalletsCommand.create(connectedWallets));
        walletConnectionService.subscribe(
          SupportedWalletType.CEREWALLET,
          'status-update',
          (status: WalletStatus, prevStatus: WalletStatus) => {
            if (prevStatus === 'connected' && status === 'ready') {
              userDataStorage.clearUserData();
              dispatch(UserDataDocument.create(null));
            }
          },
        );
      } catch (e) {
        dispatch(WalletsConnectionRestorationFailedEvent.create(e.message));
        dispatch(ConnectWalletCommand.create(SupportedWalletType.CEREWALLET));
      } finally {
        dispatch(StartWalletsBalancePollingCommand.create());
      }
    }
  };

export const connectWalletMiddleware =
  (walletsApi: IWalletsApi, walletConnectionService: WalletConnectionService) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === ConnectWalletCommand.type) {
      const appConfig = selectAppConfig(getState());
      const isAuth = Boolean(selectUserEmail(getState()));
      const walletType = action.payload;

      if (!isAuth) {
        dispatch(WalletConnectionFailedEvent.create('The user is not authenticated'));
        return;
      }

      try {
        const walletAddress = await walletConnectionService.connectWalletByType(walletType, {appConfig});
        walletsApi.saveConnectedWallet(walletType, walletAddress).catch(console.warn);
        const connectedWalletsTypes = walletConnectionService.getAllConnectedWalletsTypes();
        dispatch(WalletConnectedEvent.create(walletType));
        dispatch(ConnectedWalletsTypesDocument.create(connectedWalletsTypes));
        dispatch(SelectWalletTypeCommand.create(walletType));

        walletConnectionService.subscribe(
          SupportedWalletType.CEREWALLET,
          'status-update',
          (status: WalletStatus, prevStatus: WalletStatus) => {
            if (prevStatus === 'connected' && status === 'ready') {
              userDataStorage.clearUserData();
              dispatch(UserDataDocument.create(null));
            }
          },
        );
      } catch (e) {
        dispatch(WalletConnectionFailedEvent.create(e.message));
      }
    }
  };

export const selectWalletMiddleware =
  (walletConnectionService: WalletConnectionService) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === SelectWalletTypeCommand.type) {
      try {
        const walletType = action.payload;
        walletConnectionService.setActiveWalletType(walletType);
        dispatch(ActiveWalletTypeDocument.create(walletType));
      } catch (e) {
        console.error(e.message);
      }
    }
  };

export const disconnectWalletMiddleware =
  (walletsApi: IWalletsApi, walletConnectionService: WalletConnectionService) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === DisconnectWalletCommand.type) {
      const walletType = action.payload;
      let connectedWalletsTypesBefore: SupportedWalletType[];
      try {
        connectedWalletsTypesBefore = walletConnectionService.getAllConnectedWalletsTypes();
      } catch (e) {
        dispatch(WalletDisconnectionFailedEvent.create(e.message));
        return;
      }
      const selectedWalletType = walletConnectionService.getActiveWalletType();
      if (walletType === selectedWalletType && walletType !== SupportedWalletType.CEREWALLET) {
        dispatch(SelectWalletTypeCommand.create(SupportedWalletType.CEREWALLET));
      }
      try {
        await walletConnectionService.disconnectWalletByType(walletType);
        await walletsApi.removeConnectedWallet(walletType);
        const connectedWalletsTypesAfter = walletConnectionService.getAllConnectedWalletsTypes();
        if (connectedWalletsTypesBefore.length === connectedWalletsTypesAfter.length) {
          dispatch(WalletDisconnectionFailedEvent.create('Wallet was not disconnected'));
          return;
        }
        dispatch(WalletDisconnectedEvent.create(walletType));
        dispatch(ConnectedWalletsTypesDocument.create(connectedWalletsTypesAfter));
      } catch (e) {
        dispatch(WalletDisconnectionFailedEvent.create(e.message));
      }
    }
  };

export const walletsBalancePollingMiddleware =
  (walletsBalanceService: WalletsBalanceService, pollingInterwal: number) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === StartWalletsBalancePollingCommand.type) {
      try {
        const walletsBalance = await walletsBalanceService.getWalletsBalance();
        dispatch(WalletsBalanceDocument.create(walletsBalance));
      } catch (e) {
        console.error(e.message);
      }
      setInterval(async () => {
        try {
          const walletsBalance = await walletsBalanceService.getWalletsBalance();
          dispatch(WalletsBalanceDocument.create(walletsBalance));
        } catch (e) {
          console.error(e.message);
        }
      }, pollingInterwal);
    }
  };

export const openWalletMiddleware =
  (walletConnectionService: WalletConnectionService) => () => (next: Function) => async (action: AnyAction) => {
    next(action);
    if (action.type === OpenWallet.type) {
      const type = action.payload;
      walletConnectionService.showWallet(type);
    }
  };
