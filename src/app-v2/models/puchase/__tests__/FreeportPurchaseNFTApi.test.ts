/* eslint-disable no-throw-literal */
/* eslint-disable no-sparse-arrays */
import {ERC20MockToken as ERC20, Marketplace} from '@cere/freeport-sc-sdk';
import {BigNumber} from 'ethers';

import {ContractsProvider} from '../../blockchain/ContractsProvider';
import {AllowanceBalanceError} from '../errors/AllowanceBalanceError';
import {NFTPurchaseError} from '../errors/NFTPurchaseError';
import {FreeportPurchaseNFTApi} from '../FreeportPurchaseNFTApi';

describe('FreeportPurchaseNFTApi', () => {
  let erc20Contract: ERC20;
  let marketplaceContract: Marketplace;
  let contractsProvider: ContractsProvider;
  let purchaseApi: FreeportPurchaseNFTApi;

  const maxPurchaseTries = 4;

  beforeEach(() => {
    erc20Contract = {
      address: 'erc20',
      increaseAllowance: jest.fn(() => Promise.resolve({wait: () => Promise.resolve()})),
    } as any;
    marketplaceContract = {
      address: 'marketplace',
      processOrder: jest.fn(() => Promise.resolve({wait: () => Promise.resolve()})),
      orders: jest.fn(() => Promise.resolve([, , , BigNumber.from(10), BigNumber.from(1), 'collection', , ,])),
    } as any;

    contractsProvider = {
      getMarketplaceContract: jest.fn(() => Promise.resolve(marketplaceContract)),
      getERC20Contract: jest.fn(() => Promise.resolve(erc20Contract)),
    } as any;

    purchaseApi = new FreeportPurchaseNFTApi(contractsProvider, maxPurchaseTries);
  });

  it('purchases nft', async () => {
    await purchaseApi.purchaseNft('123', 2);
    expect(contractsProvider.getERC20Contract).toBeCalled();
    expect(contractsProvider.getMarketplaceContract).toBeCalled();
    expect(erc20Contract.increaseAllowance).toBeCalledTimes(2);
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(1, 'marketplace', BigNumber.from(20));
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(2, 'collection', BigNumber.from(2));
    expect(marketplaceContract.processOrder).toBeCalledWith(BigNumber.from('123'), BigNumber.from(2));
  });

  it('throws an error if allowance request failed', async () => {
    (erc20Contract.increaseAllowance as jest.Mock).mockImplementationOnce(() => Promise.reject());
    await expect(() => purchaseApi.purchaseNft('123', 2)).rejects.toThrow(AllowanceBalanceError);
    expect(contractsProvider.getERC20Contract).toBeCalled();
    expect(erc20Contract.increaseAllowance).toBeCalledTimes(1);
    expect(marketplaceContract.processOrder).not.toBeCalled();
  });

  it('throws an error if nft purchase failed', async () => {
    (marketplaceContract.processOrder as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });
    await expect(() => purchaseApi.purchaseNft('123', 2)).rejects.toThrow();
    expect(contractsProvider.getERC20Contract).toBeCalled();
    expect(erc20Contract.increaseAllowance).toBeCalledTimes(2);
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(1, 'marketplace', BigNumber.from(20));
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(2, 'collection', BigNumber.from(2));
    expect(marketplaceContract.processOrder).toBeCalledWith(BigNumber.from('123'), BigNumber.from(2));
  });

  it('retries purchase in case when error.code === -32000', async () => {
    (marketplaceContract.processOrder as jest.Mock)
      .mockImplementationOnce(() => {
        throw {code: -32000};
      })
      .mockImplementationOnce(() => {
        throw {code: -32000};
      });
    await purchaseApi.purchaseNft('123', 2);
    expect(contractsProvider.getERC20Contract).toBeCalled();
    expect(erc20Contract.increaseAllowance).toBeCalledTimes(2);
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(1, 'marketplace', BigNumber.from(20));
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(2, 'collection', BigNumber.from(2));
    expect(marketplaceContract.processOrder).toBeCalledTimes(3);
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(1, BigNumber.from('123'), BigNumber.from(2));
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(2, BigNumber.from('123'), BigNumber.from(2));
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(3, BigNumber.from('123'), BigNumber.from(2));
  });

  it('throws an error if purchase attempts exceeds allowed number', async () => {
    (marketplaceContract.processOrder as jest.Mock)
      .mockImplementationOnce(() => {
        throw {code: -32000};
      })
      .mockImplementationOnce(() => {
        throw {code: -32000};
      })
      .mockImplementationOnce(() => {
        throw {code: -32000};
      })
      .mockImplementationOnce(() => {
        throw {code: -32000};
      })
      .mockImplementationOnce(() => {
        throw {code: -32000};
      });
    await expect(() => purchaseApi.purchaseNft('123', 2)).rejects.toThrow(NFTPurchaseError);
    expect(contractsProvider.getERC20Contract).toBeCalled();
    expect(erc20Contract.increaseAllowance).toBeCalledTimes(2);
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(1, 'marketplace', BigNumber.from(20));
    expect(erc20Contract.increaseAllowance).toHaveBeenNthCalledWith(2, 'collection', BigNumber.from(2));
    expect(marketplaceContract.processOrder).toBeCalledTimes(4);
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(1, BigNumber.from('123'), BigNumber.from(2));
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(2, BigNumber.from('123'), BigNumber.from(2));
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(3, BigNumber.from('123'), BigNumber.from(2));
    expect(marketplaceContract.processOrder).toHaveBeenNthCalledWith(4, BigNumber.from('123'), BigNumber.from(2));
  });
});
