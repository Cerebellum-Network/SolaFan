import {SupportedWalletType} from '../../../../models/wallet/types';
import {
  ActiveWalletTypeDocument,
  ConnectedWalletsTypesDocument,
  ConnectWalletCommand,
  DisconnectWalletCommand,
  RestoreWalletsConnectionCommand,
  SelectWalletTypeCommand,
  StartWalletsBalancePollingCommand,
  WalletConnectedEvent,
  WalletConnectionFailedEvent,
  WalletDisconnectedEvent,
  WalletDisconnectionFailedEvent,
  WalletsBalanceDocument,
  WalletsConnectionRestorationFailedEvent,
  WalletsConnectionRestoredEvent,
} from '../actions';

describe('User wallets actions', () => {
  it('creates restore all wallets connections command', () => {
    expect(RestoreWalletsConnectionCommand.create()).toEqual({
      type: '[USER WALLETS] Restore all wallets connection',
    });
  });

  it('creates wallets connection restored event', () => {
    expect(WalletsConnectionRestoredEvent.create()).toEqual({
      type: '[USER WALLETS] All wallets connection restored',
    });
  });

  it('creates wallets connection restoration failed event', () => {
    expect(WalletsConnectionRestorationFailedEvent.create('test')).toEqual({
      type: '[USER WALLETS] Connection restoration failed',
      payload: 'test',
    });
  });

  it('creates connect wallet command', () => {
    expect(ConnectWalletCommand.create(SupportedWalletType.METAMASK)).toEqual({
      type: '[USER WALLETS] Connect wallet',
      payload: SupportedWalletType.METAMASK,
    });
  });

  it('creates wallet connected event', () => {
    expect(WalletConnectedEvent.create(SupportedWalletType.METAMASK)).toEqual({
      type: '[USER WALLETS] Wallet connected',
      payload: SupportedWalletType.METAMASK,
    });
  });

  it('creates wallet connection failed event', () => {
    expect(WalletConnectionFailedEvent.create('test')).toEqual({
      type: '[USER WALLETS] Wallet connection failed',
      payload: 'test',
    });
  });

  it('creates disconnect wallet command', () => {
    expect(DisconnectWalletCommand.create(SupportedWalletType.METAMASK)).toEqual({
      type: '[USER WALLETS] Disconnect wallet',
      payload: SupportedWalletType.METAMASK,
    });
  });

  it('creates wallet disconnected event', () => {
    expect(WalletDisconnectedEvent.create(SupportedWalletType.METAMASK)).toEqual({
      type: '[USER WALLETS] Wallet disconnected',
      payload: SupportedWalletType.METAMASK,
    });
  });

  it('creates connected wallets types document', () => {
    expect(
      ConnectedWalletsTypesDocument.create([SupportedWalletType.METAMASK, SupportedWalletType.WALLETCONNECT]),
    ).toEqual({
      type: '[USER WALLETS] Connected wallets types',
      payload: [SupportedWalletType.METAMASK, SupportedWalletType.WALLETCONNECT],
    });
  });

  it('creates active wallet document', () => {
    expect(ActiveWalletTypeDocument.create(SupportedWalletType.WALLETCONNECT)).toEqual({
      type: '[USER WALLETS] Active wallet type',
      payload: SupportedWalletType.WALLETCONNECT,
    });
  });

  it('creates select wallet command', () => {
    expect(SelectWalletTypeCommand.create(SupportedWalletType.WALLETCONNECT)).toEqual({
      type: '[USER WALLETS] Select wallet type',
      payload: SupportedWalletType.WALLETCONNECT,
    });
  });

  it('creates wallet disconnection failed event', () => {
    expect(WalletDisconnectionFailedEvent.create('message')).toEqual({
      type: '[USER WALLETS] Wallet disconnection failed',
      payload: 'message',
    });
  });

  it('creates a command to start wallets balance polling', () => {
    expect(StartWalletsBalancePollingCommand.create()).toEqual({
      type: '[USER WALLETS] Start balance polling',
    });
  });

  it('creates user wallets balance document', () => {
    expect(WalletsBalanceDocument.create('balance' as any)).toEqual({
      type: '[USER WALLETS] Wallets balance',
      payload: 'balance',
    });
  });
});
