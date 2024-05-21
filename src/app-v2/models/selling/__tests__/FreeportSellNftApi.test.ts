import {ERC20MockToken as ERC20, FreeportCollection, Marketplace} from '@cere/freeport-sc-sdk';
import {BigNumber} from 'ethers';

import {ContractsProvider} from '../../blockchain/ContractsProvider';
import {FreeportSellNftApi} from '../FreeportSellNftApi';

describe('FreeportSellNftApi', () => {
  const decimals = 1;
  let approvedAmount: BigNumber;
  let marketplaceContract: Marketplace;
  let erc20Contract: ERC20;
  let contractsProvider: ContractsProvider;
  let freeportCollection: FreeportCollection;
  let txWait: () => Promise<void>;

  beforeEach(() => {
    approvedAmount = BigNumber.from(1);
    txWait = jest.fn(() => Promise.resolve());
    marketplaceContract = {
      address: 'marketplace',
      'makeOrder(address,uint256,uint256,address,uint256)': jest.fn(() => Promise.resolve({wait: txWait})),
      cancelOrder: jest.fn(() => Promise.resolve({wait: txWait})),
      orders: jest.fn(() => Promise.resolve({royaltyFee: '0'})),
    } as any;
    erc20Contract = {
      address: 'erc20',
      decimals: jest.fn(() => decimals),
      allowance: jest.fn(() => approvedAmount),
      decreaseAllowance: jest.fn(() => Promise.resolve({wait: txWait})),
    } as any;
    freeportCollection = {
      setApprovalForAll: jest.fn().mockResolvedValue({wait: txWait}),
    } as any;
    contractsProvider = {
      getMarketplaceContract: jest.fn(() => Promise.resolve(marketplaceContract)),
      getERC20Contract: jest.fn(() => Promise.resolve(erc20Contract)),
      createFreeportCollection: jest.fn(() => Promise.resolve(freeportCollection)),
      getSignerAddress: jest.fn(() => Promise.resolve('')),
    } as any;
  });

  describe('makes nft offer', () => {
    it('makes an offer', async () => {
      const price = 10;
      const sellApi = new FreeportSellNftApi(contractsProvider);
      const decimalsPrice = (price * Math.pow(10, decimals)).toString();
      await sellApi.sellNft('1', price, 1, 'collection');
      expect(freeportCollection.setApprovalForAll).toBeCalledWith('marketplace', true);
      expect(marketplaceContract['makeOrder(address,uint256,uint256,address,uint256)']).toBeCalledWith(
        'collection',
        '1',
        1,
        'erc20',
        decimalsPrice,
      );
      expect(txWait).toBeCalled();
    });
  });

  describe('cancels nft offer', () => {
    it('cancels an offer', async () => {
      const sellApi = new FreeportSellNftApi(contractsProvider);
      await sellApi.cancelNftSelling('123');
      expect(marketplaceContract.cancelOrder).toBeCalledWith(BigNumber.from('123'));
      expect(txWait).toBeCalled();
    });
  });
});
