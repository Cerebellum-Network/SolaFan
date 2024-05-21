import {ERC20MockToken as ERC20, Marketplace} from '@cere/freeport-sc-sdk';
import {BigNumber} from 'ethers';

import {ContractsProvider} from '../../blockchain/ContractsProvider';
import {FreeportAuctionApi} from '../FreeportAuctionApi';

describe('FreeportAuctionApi', () => {
  let marketplace: Marketplace;
  let erc20Contract: ERC20;
  let contractsProvider: ContractsProvider;
  let txWait: () => Promise<void>;

  beforeEach(() => {
    txWait = jest.fn(() => Promise.resolve());
    marketplace = {
      address: 'marketplace',
      bid: jest.fn(() =>
        Promise.resolve({
          hash: 'simple-auction-hash',
          timestamp: 'simple-auction-timestamp',
          wait: txWait,
        }),
      ),
      startAuction: jest.fn(() =>
        Promise.resolve({
          hash: 'simple-auction-hash',
          timestamp: 'simple-auction-timestamp',
          wait: txWait,
        }),
      ),
      resolveAuction: jest.fn(() =>
        Promise.resolve({
          hash: 'simple-auction-hash',
          timestamp: 'simple-auction-timestamp',
          wait: txWait,
        }),
      ),
    } as any;
    erc20Contract = {
      increaseAllowance: jest.fn(() => Promise.resolve({wait: () => Promise.resolve()})),
    } as any;
    contractsProvider = {
      getMarketplaceContract: jest.fn(() => Promise.resolve(marketplace)),
      getERC20Contract: jest.fn(() => Promise.resolve(erc20Contract)),
    } as any;
  });

  describe('start new auction', () => {
    it('starts a new auction for an NFT with collection address', async () => {
      const auctionApi = new FreeportAuctionApi(contractsProvider);
      await auctionApi.startAuction('111', 10, 123, 123, 'collectionAddress');
      expect(marketplace.startAuction).toBeCalledWith(
        'collectionAddress',
        BigNumber.from(111),
        BigNumber.from(123),
        BigNumber.from(10),
        BigNumber.from(123),
        '',
      );
      expect(txWait).toBeCalled();
    });
  });

  describe('bid on auction', () => {
    it('places a bid', async () => {
      const auctionApi = new FreeportAuctionApi(contractsProvider);
      await auctionApi.placeBid('123', 123);
      expect(erc20Contract.increaseAllowance).toBeCalledWith('marketplace', BigNumber.from(123));
      expect(marketplace.bid).toBeCalledWith(BigNumber.from('123'), BigNumber.from(123));
      expect(txWait).toBeCalled();
    });

    it('checks allowance and requests approve', async () => {
      const auctionApi = new FreeportAuctionApi(contractsProvider);
      await auctionApi.placeBid('123', 123);
      expect(erc20Contract.increaseAllowance).toBeCalledWith('marketplace', BigNumber.from(123));
    });
  });

  describe('settles an auction', () => {
    it('settles an auction', async () => {
      const auctionApi = new FreeportAuctionApi(contractsProvider);
      await auctionApi.settleAuction('123');
      expect(marketplace.resolveAuction).toBeCalledWith('123');
      expect(txWait).toBeCalled();
    });
  });
});
