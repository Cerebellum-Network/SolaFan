import {IWalletConnector} from '../connectors/IWalletConnector';
import {NetworkNotSupportedError} from '../errors/NetworkNotSupportedError';
import {WalletNotConnectedError} from '../errors/WalletNotConnectedError';
import {WalletConnectionManager} from '../WalletConnectionManager';
import {WalletConnectionStorage} from '../WalletConnectionStorage';

describe('WalletConnectionManager', () => {
  let walletConnector1: IWalletConnector;
  let walletConnector2: IWalletConnector;
  let walletConnectionStorage: WalletConnectionStorage;

  beforeEach(() => {
    walletConnector1 = {
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
    walletConnector2 = {
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
    walletConnectionStorage = {
      setLastActiveWallet: jest.fn(),
      setConnectedWalletsTypes: jest.fn(),
      getLastActiveWalletType: jest.fn(),
      getConnectedWalletsTypes: jest.fn(),
      addConnectedWalletType: jest.fn(),
      removeConnectedWalletType: jest.fn(),
      clearAll: jest.fn(),
    };
  });

  it('connects a wallet', async () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    const address = await connectionManager.connect(walletConnector1);

    expect(walletConnector1.connectToWallet).toBeCalledWith(undefined);
    expect(address).toEqual('test-address-1');
    const signer = await connectionManager.getSigner();
    const addressFromSigner = await signer?.getAddress();
    expect(addressFromSigner).toEqual('test-address-1');
    expect(walletConnectionStorage.addConnectedWalletType).toBeCalledWith('test-1');
  });

  it('connects a wallet with options', async () => {
    const options: any = {};
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    const address = await connectionManager.connect(walletConnector1, options);

    expect(walletConnector1.connectToWallet).toBeCalledWith(options);
    expect(address).toEqual('test-address-1');
  });

  it('connects several wallets', async () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    const address1 = await connectionManager.connect(walletConnector1);
    expect(address1).toEqual('test-address-1');
    const address2 = await connectionManager.connect(walletConnector2);
    expect(address2).toEqual('test-address-2');
    expect(walletConnectionStorage.addConnectedWalletType).toHaveBeenCalledTimes(2);
    expect(walletConnectionStorage.addConnectedWalletType).toHaveBeenNthCalledWith(1, 'test-1');
    expect(walletConnectionStorage.addConnectedWalletType).toHaveBeenNthCalledWith(2, 'test-2');
  });

  it('throws an error in case if a wallet is connected to a wrong network', async () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 311);
    await expect(() => connectionManager.connect(walletConnector1)).rejects.toThrow(NetworkNotSupportedError);
  });

  it('disconnects a wallet', async () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    await connectionManager.connect(walletConnector1);
    await connectionManager.disconnect('test-1' as any);
    expect(walletConnector1.disconnect).toBeCalled();
    expect(walletConnectionStorage.removeConnectedWalletType).toBeCalledWith('test-1' as any);
  });

  it('sets active wallet by type', async () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    await connectionManager.connect(walletConnector1);
    await connectionManager.connect(walletConnector2);
    connectionManager.setActiveWallet('test-1' as any);
    const signer1 = await connectionManager.getSigner();
    const addressFromSigner1 = await signer1?.getAddress();
    expect(addressFromSigner1).toEqual('test-address-1');
    expect(walletConnectionStorage.setLastActiveWallet).toBeCalledWith('test-1');
    connectionManager.setActiveWallet('test-2' as any);
    expect(walletConnectionStorage.setLastActiveWallet).toBeCalledWith('test-2');
    const signer2 = await connectionManager.getSigner();
    const addressFromSigner2 = await signer2?.getAddress();
    expect(addressFromSigner2).toEqual('test-address-2');
  });

  it('throws an error if someones try to activate a wallet of type which was not connected', () => {
    const connectionManager = new WalletConnectionManager(walletConnectionStorage, 123);
    expect(() => connectionManager.setActiveWallet('test' as any)).toThrow(WalletNotConnectedError);
  });
});
