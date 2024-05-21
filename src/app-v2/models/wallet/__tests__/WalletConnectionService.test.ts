import {MissingWalletConnectorError} from '../errors/MissingWalletConnectorError';
import {NoConnectedWalletsError} from '../errors/NoConnectedWalletsError';
import {SupportedWalletType} from '../types';
import {WalletConnectionManager} from '../WalletConnectionManager';
import {WalletConnectionService} from '../WalletConnectionService';
import {WalletConnectionStorage} from '../WalletConnectionStorage';

describe('WalletConnectionService', () => {
  let connectionManager: WalletConnectionManager;
  let walletConnectionStorage: WalletConnectionStorage;
  const walletConnector1 = {
    type: 'test-1',
    disconnect: jest.fn(),
    connectToWallet: jest.fn(() =>
      Promise.resolve({
        getNetwork: jest.fn(() => Promise.resolve({chainId: 123})),
        getSigner: jest.fn(() => ({
          getAddress: jest.fn(() => Promise.resolve('test-address-1')),
        })),
      }),
    ),
  } as any;
  const walletConnector2 = {
    type: 'test-2',
    disconnect: jest.fn(),
    connectToWallet: jest.fn(() =>
      Promise.resolve({
        getNetwork: jest.fn(() => Promise.resolve({chainId: 123})),
        getSigner: jest.fn(() => ({
          getAddress: jest.fn(() => Promise.resolve('test-address-2')),
        })),
      }),
    ),
  } as any;

  beforeEach(() => {
    connectionManager = {
      connect: jest.fn(() => Promise.resolve('test-address')),
      disconnect: jest.fn(() => Promise.resolve()),
      getSigner: jest.fn(() => Promise.resolve('test-signer' as any)),
      setActiveWallet: jest.fn(),
    } as any;
    walletConnectionStorage = {
      setLastActiveWallet: jest.fn(),
      setConnectedWalletsTypes: jest.fn(),
      getLastActiveWalletType: jest.fn(() => 'type-2' as any),
      getConnectedWalletsTypes: jest.fn(() => ['type-1', 'type-2'] as any[]),
      clearAll: jest.fn(),
    } as any;
  });

  it('restores all wallets connection', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    connectorsMap.set('type-2', walletConnector2);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.restoreAllWalletsConnection();

    expect(walletConnectionStorage.getConnectedWalletsTypes).toBeCalled();
    expect(connectionManager.connect).toBeCalledTimes(2);
    expect(connectionManager.connect).toHaveBeenNthCalledWith(1, walletConnector1, undefined);
    expect(connectionManager.connect).toHaveBeenNthCalledWith(2, walletConnector2, undefined);
    expect(walletConnectionStorage.getLastActiveWalletType).toBeCalled();
    expect(connectionManager.setActiveWallet).toBeCalledWith('type-2');
  });

  it('throws an error if there is no required wallet connector', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await expect(() => connectionService.restoreAllWalletsConnection()).rejects.toThrow(MissingWalletConnectorError);
  });

  it('connects a single wallet by type', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.connectWalletByType('type-1' as any);
    expect(connectionManager.connect).toBeCalledWith(walletConnector1, undefined);
  });

  it('connects a single wallet by type with options', async () => {
    const options: any = {};
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.connectWalletByType('type-1' as any, options);
    expect(connectionManager.connect).toBeCalledWith(walletConnector1, options);
  });

  it('[single wallet connection] throws an error if there is no required wallet connector', async () => {
    const connectorsMap = new Map();
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await expect(() => connectionService.connectWalletByType('type-1' as any)).rejects.toThrow(
      MissingWalletConnectorError,
    );
  });

  it('disconnects a wallet by type', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.disconnectWalletByType('type-1' as any);
    expect(connectionManager.disconnect).toBeCalledWith('type-1');
  });

  it('returns a signer', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    const signer = await connectionService.getSigner();
    expect(signer).toEqual('test-signer');
    expect(connectionManager.getSigner).toBeCalled();
  });

  it('throws an error if there sre no wallets to get a signer from', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    (connectionManager.getSigner as jest.Mock).mockImplementationOnce(() => Promise.resolve(null));
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await expect(() => connectionService.getSigner()).rejects.toThrow(NoConnectedWalletsError);
  });

  it('selects required wallet', () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    connectionService.setActiveWalletType(SupportedWalletType.CEREWALLET);
    expect(connectionManager.setActiveWallet).toBeCalledWith(SupportedWalletType.CEREWALLET);
  });

  it('returns last active wallet', () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    expect(connectionService.getActiveWalletType()).toEqual('type-2');
  });

  it('returns active wallet type', () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    expect(connectionService.getActiveWalletType()).toEqual('type-2');
    expect(walletConnectionStorage.getLastActiveWalletType).toBeCalled();
  });

  it('throws an error if there is no active wallet', () => {
    (walletConnectionStorage.getLastActiveWalletType as jest.Mock).mockImplementationOnce(() => null);
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    expect(() => connectionService.getActiveWalletType()).toThrow(NoConnectedWalletsError);
    expect(walletConnectionStorage.getLastActiveWalletType).toBeCalled();
  });

  it('returns a list of connected wallets types', () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    expect(connectionService.getAllConnectedWalletsTypes()).toEqual(['type-1', 'type-2']);
    expect(walletConnectionStorage.getConnectedWalletsTypes).toBeCalled();
  });

  it('throws an error if there are no connected wallets', () => {
    (walletConnectionStorage.getConnectedWalletsTypes as jest.Mock).mockImplementationOnce(() => []);
    const connectorsMap = new Map();
    connectorsMap.set('type-1', walletConnector1);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    expect(() => connectionService.getAllConnectedWalletsTypes()).toThrow(NoConnectedWalletsError);
    expect(walletConnectionStorage.getConnectedWalletsTypes).toBeCalled();
  });

  it('returns selected wallet address', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-2', walletConnector2);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.connectWalletByType('type-2' as any);
    connectionService.setActiveWalletType('type-2' as any);
    const address = connectionService.getSelectedWalletAddress();
    expect(address).toEqual('test-address');
  });

  it('returns wallet address for provided wallet type', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-2', walletConnector2);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.connectWalletByType('type-2' as any);
    const address = connectionService.getWalletAddressByType('type-2' as any);
    expect(address).toEqual('test-address');
  });

  it('returns wallet type by its address', async () => {
    const connectorsMap = new Map();
    connectorsMap.set('type-2', walletConnector2);
    const connectionService = new WalletConnectionService(
      connectionManager,
      walletConnectionStorage,
      connectorsMap as any,
    );
    await connectionService.connectWalletByType('type-2' as any);
    const type = connectionService.getWalletTypeByAddress('test-address');
    expect(type).toEqual('type-2');
  });
});
