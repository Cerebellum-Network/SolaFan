import {IWalletsApi} from '../../../../api/wallet/IWalletsApi';
import {WalletsBalanceService} from '../../../../models/balance/WalletsBalanceService';
import {SupportedWalletType} from '../../../../models/wallet/types';
import {WalletConnectionService} from '../../../../models/wallet/WalletConnectionService';
import {mockMiddleware} from '../../../base/store.mock';
import {LoadAppConfigSuccessEvent} from '../../app-config/actions';
import * as appConfigsSelectors from '../../app-config/selectors';
import * as authSelectors from '../../auth/selectors';
import {
  ActiveWalletTypeDocument,
  ConnectedWalletsTypesDocument,
  ConnectWalletCommand,
  DisconnectWalletCommand,
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
} from '../actions';
import {
  connectWalletMiddleware,
  disconnectWalletMiddleware,
  selectWalletMiddleware,
  walletsBalancePollingMiddleware,
  walletsConnectionRestoreMiddleware,
  walletsInitMiddleware,
} from '../middlewares';

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

jest.mock('../../../../../config/common', () => ({
  FIREBASE_API_KEY: () => 'test',
  FIREBASE_AUTH_DOMAIN: () => 'test',
  FIREBASE_PROJECT_ID: () => 'test',
  FIREBASE_APP_ID: () => 'test',
  IDENTITY_API_URL: () => '',
  tenantId: () => '',
  APP_ID: () => '',
  NETWORK_ID: '123',
  HTTP_PROVIDER_URL: '123',
  TOKEN_DECIMALS_POW: 18,
}));

describe('User wallet middlewares', () => {
  let walletsApi: IWalletsApi;
  let walletConnectionService: WalletConnectionService;
  let walletsBalanceService: WalletsBalanceService;
  let appConfig: any = {};

  beforeEach(() => {
    walletsApi = {
      saveConnectedWallet: jest.fn(() => Promise.resolve()),
      getConnectedWallets: jest.fn(() => Promise.resolve([{type: 'wallet-1'}])),
      removeConnectedWallet: jest.fn(() => Promise.resolve()),
    } as any;
    walletConnectionService = {
      restoreAllWalletsConnection: jest.fn(() => Promise.resolve()),
      getAllConnectedWalletsTypes: jest.fn(() => []),
      getActiveWalletType: jest.fn(() => 'test-type'),
      connectWalletByType: jest.fn(() => Promise.resolve()),
      setActiveWalletType: jest.fn(),
      disconnectWalletByType: jest.fn(() => Promise.resolve()),
      addConnectedWallets: jest.fn(),
    } as any;
    walletsBalanceService = {
      getWalletsBalance: jest.fn(() => Promise.resolve('balance')),
    } as any;

    jest.spyOn(authSelectors, 'selectUserEmail').mockReturnValue('test@gmail.com');
    jest.spyOn(appConfigsSelectors, 'selectAppConfig').mockReturnValue(appConfig);
  });

  describe('walletsInitMiddleware', () => {
    it('dispatches a command to restore wallets connection and start balance polling', () => {
      const {invoke, store, next} = mockMiddleware(walletsInitMiddleware);
      invoke(LoadAppConfigSuccessEvent.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(RestoreWalletsConnectionCommand.create());
    });
  });

  describe('walletsConnectionRestoreMiddleware', () => {
    it('restores wallets connection', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => [
        'type-1',
        'type-2',
      ]);
      (walletConnectionService.getActiveWalletType as jest.Mock).mockImplementationOnce(() => 'type-1');
      const {invoke, next, store} = mockMiddleware(
        walletsConnectionRestoreMiddleware(walletsApi, walletConnectionService),
      );
      await invoke(RestoreWalletsConnectionCommand.create());
      expect(next).toBeCalled();
      expect(walletConnectionService.addConnectedWallets).toBeCalledWith(['wallet-1']);
      expect(walletConnectionService.restoreAllWalletsConnection).toBeCalled();
      expect(walletConnectionService.getAllConnectedWalletsTypes).toBeCalled();
      expect(walletConnectionService.getActiveWalletType).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(7);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, WalletsConnectionRestoredEvent.create());
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        ConnectedWalletsTypesDocument.create(['type-1', 'type-2'] as any),
      );
      expect(store.dispatch).toHaveBeenNthCalledWith(3, ActiveWalletTypeDocument.create('type-1' as any));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        4,
        SetNonCustodyWalletsCommand.create([{type: 'wallet-1'} as any]),
      );
    });

    it('dispatches an error event if walletConnectionService.restoreAllWalletsConnection throws an error', async () => {
      (walletConnectionService.restoreAllWalletsConnection as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(
        walletsConnectionRestoreMiddleware(walletsApi, walletConnectionService),
      );
      await invoke(RestoreWalletsConnectionCommand.create());
      expect(next).toBeCalled();
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(store.dispatch).toBeCalledTimes(3);
      expect(call1).toEqual([WalletsConnectionRestorationFailedEvent.create('message')]);
      expect(call2).toEqual([ConnectWalletCommand.create(SupportedWalletType.CEREWALLET)]);
      expect(call3).toEqual([StartWalletsBalancePollingCommand.create()]);
    });

    it('dispatches an error event if walletConnectionService.getAllConnectedWalletsTypes throws an error', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(
        walletsConnectionRestoreMiddleware(walletsApi, walletConnectionService),
      );
      await invoke(RestoreWalletsConnectionCommand.create());
      expect(next).toBeCalled();
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(store.dispatch).toBeCalledTimes(3);
      expect(call1).toEqual([WalletsConnectionRestorationFailedEvent.create('message')]);
      expect(call2).toEqual([ConnectWalletCommand.create(SupportedWalletType.CEREWALLET)]);
      expect(call3).toEqual([StartWalletsBalancePollingCommand.create()]);
    });

    it('dispatches an error event if walletConnectionService.getActiveWalletType throws an error', async () => {
      (walletConnectionService.getActiveWalletType as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(
        walletsConnectionRestoreMiddleware(walletsApi, walletConnectionService),
      );
      await invoke(RestoreWalletsConnectionCommand.create());
      expect(next).toBeCalled();
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(store.dispatch).toBeCalledTimes(3);
      expect(call1).toEqual([WalletsConnectionRestorationFailedEvent.create('message')]);
      expect(call2).toEqual([ConnectWalletCommand.create(SupportedWalletType.CEREWALLET)]);
      expect(call3).toEqual([StartWalletsBalancePollingCommand.create()]);
    });
  });

  describe('connectWalletMiddleware', () => {
    it('connects a wallet', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => [
        'type-1',
        'type-2',
      ]);
      const {invoke, next, store} = mockMiddleware(connectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(ConnectWalletCommand.create('type-2' as any));
      expect(next).toBeCalled();
      expect(walletConnectionService.connectWalletByType).toBeCalledWith('type-2', {appConfig});
      expect(walletConnectionService.getAllConnectedWalletsTypes).toBeCalled();
      expect(walletsApi.saveConnectedWallet).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(4);
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(call1).toEqual([WalletConnectedEvent.create('type-2' as any)]);
      expect(call2).toEqual([ConnectedWalletsTypesDocument.create(['type-1', 'type-2'] as any)]);
      expect(call3).toEqual([SelectWalletTypeCommand.create('type-2' as any)]);
    });

    it('dispatches an error event if walletConnectionService.connectWalletByType throws an error', async () => {
      (walletConnectionService.connectWalletByType as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(connectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(ConnectWalletCommand.create('type-2' as any));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(WalletConnectionFailedEvent.create('message'));
    });

    it('dispatches an error event if walletConnectionService.getAllConnectedWalletsTypes throws an error', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(connectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(ConnectWalletCommand.create('type-2' as any));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(WalletConnectionFailedEvent.create('message'));
    });

    it('dispatches an error event if user in not authenticated', async () => {
      jest.spyOn(authSelectors, 'selectUserEmail').mockReturnValue(null);

      const {invoke, next, store} = mockMiddleware(connectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(ConnectWalletCommand.create('type-2' as any));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(WalletConnectionFailedEvent.create('The user is not authenticated'));
    });
  });

  describe('selectWalletMiddleware', () => {
    it('sets active wallet', async () => {
      const {invoke, next, store} = mockMiddleware(selectWalletMiddleware(walletConnectionService));
      await invoke(SelectWalletTypeCommand.create('type-2' as any));
      expect(next).toBeCalled();
      expect(walletConnectionService.setActiveWalletType).toBeCalledWith('type-2');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(ActiveWalletTypeDocument.create('type-2' as any));
    });
  });

  describe('disconnectWalletMiddleware', () => {
    it('disconnects not selected wallet', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock)
        .mockImplementationOnce(() => ['type-1', 'type-2'])
        .mockImplementationOnce(() => ['type-2']);
      (walletConnectionService.getActiveWalletType as jest.Mock).mockImplementationOnce(() => 'type-2');
      const {invoke, next, store} = mockMiddleware(disconnectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(DisconnectWalletCommand.create('type-1' as any));
      expect(next).toBeCalled();
      expect(walletConnectionService.disconnectWalletByType).toBeCalledWith('type-1');
      expect(walletConnectionService.getAllConnectedWalletsTypes).toBeCalledTimes(2);
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([WalletDisconnectedEvent.create('type-1' as any)]);
      expect(call2).toEqual([ConnectedWalletsTypesDocument.create(['type-2'] as any)]);
    });

    it('disconnects selected wallet', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock)
        .mockImplementationOnce(() => ['type-1', 'type-2'])
        .mockImplementationOnce(() => ['type-2']);
      (walletConnectionService.getActiveWalletType as jest.Mock).mockImplementationOnce(() => 'type-1');
      const {invoke, next, store} = mockMiddleware(disconnectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(DisconnectWalletCommand.create('type-1' as any));
      expect(next).toBeCalled();
      expect(walletConnectionService.disconnectWalletByType).toBeCalledWith('type-1');
      expect(walletConnectionService.getAllConnectedWalletsTypes).toBeCalledTimes(2);
      expect(store.dispatch).toBeCalledTimes(3);
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(call1).toEqual([SelectWalletTypeCommand.create(SupportedWalletType.CEREWALLET)]);
      expect(call2).toEqual([WalletDisconnectedEvent.create('type-1' as any)]);
      expect(call3).toEqual([ConnectedWalletsTypesDocument.create(['type-2'] as any)]);
    });

    it('dispatches an error event if connected wallets list was not changed', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock)
        .mockImplementationOnce(() => ['type-1', 'type-2'])
        .mockImplementationOnce(() => ['type-1', 'type-2']);
      (walletConnectionService.getActiveWalletType as jest.Mock).mockImplementationOnce(() => 'type-2');
      const {invoke, next, store} = mockMiddleware(disconnectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(DisconnectWalletCommand.create('type-1' as any));
      expect(next).toBeCalled();
      expect(walletConnectionService.disconnectWalletByType).toBeCalledWith('type-1');
      expect(walletConnectionService.getAllConnectedWalletsTypes).toBeCalledTimes(2);
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(WalletDisconnectionFailedEvent.create('Wallet was not disconnected'));
    });

    it('dispatches an error event if walletConnectionService.getAllConnectedWalletsTypes throws an error', async () => {
      (walletConnectionService.getAllConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(disconnectWalletMiddleware(walletsApi, walletConnectionService));
      await invoke(DisconnectWalletCommand.create('type-1' as any));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(WalletDisconnectionFailedEvent.create('message'));
    });
  });

  describe('walletsBalancePollingMiddleware', () => {
    it('start user wallets balance polling', async () => {
      const {invoke, next, store} = mockMiddleware(walletsBalancePollingMiddleware(walletsBalanceService, 500));
      invoke(StartWalletsBalancePollingCommand.create());
      await wait(1200);
      expect(next).toBeCalled();
      expect(walletsBalanceService.getWalletsBalance).toBeCalledTimes(3);
      expect(store.dispatch).toBeCalledTimes(3);
      expect(store.dispatch).toBeCalledWith(WalletsBalanceDocument.create('balance' as any));
    });
  });
});
