import {ERC20MockToken as Erc20, Marketplace} from '@cere/freeport-sc-sdk';
import {BigNumber} from 'ethers';

import {ContractsProvider} from '../blockchain/ContractsProvider';
import {AllowanceBalanceError} from './errors/AllowanceBalanceError';
import {NFTPurchaseError} from './errors/NFTPurchaseError';
import {IPurchaseNFTApi} from './IPurchaseNFTApi';

const METAMASK_GAS_REQUIRED_EXCEEDS_ALLOWANCE_ERROR_CODE = -32000;

export class FreeportPurchaseNFTApi implements IPurchaseNFTApi {
  constructor(private readonly contractProvider: ContractsProvider, private readonly maxPurchaseRetries: number = 3) {}

  async purchaseNft(orderId: string, qty: number): Promise<number> {
    const erc20 = await this.contractProvider.getERC20Contract();
    const marketplace = await this.contractProvider.getMarketplaceContract();
    const orderInfo = await this.getOrderInfo(orderId, marketplace);
    await this.checkAllowedBalance(
      orderInfo.price,
      orderInfo.royaltyFee,
      qty,
      orderInfo.collection,
      erc20,
      marketplace,
    );
    return await this.purchaseNftWithRetryStrategy(orderId, qty, marketplace);
  }

  private async purchaseNftWithRetryStrategy(
    orderId: string,
    qty: number,
    marketplace: Marketplace,
    attempt: number = 1,
  ): Promise<number> {
    try {
      const tx = await marketplace.processOrder(BigNumber.from(orderId), BigNumber.from(qty));
      await tx.wait();
      return tx.timestamp || Date.now();
    } catch (error) {
      if (error?.code === METAMASK_GAS_REQUIRED_EXCEEDS_ALLOWANCE_ERROR_CODE && attempt < this.maxPurchaseRetries) {
        return await this.purchaseNftWithRetryStrategy(orderId, qty, marketplace, attempt + 1);
      }
      console.error(error);
      throw new NFTPurchaseError();
    }
  }

  private async checkAllowedBalance(
    nftPrice: BigNumber,
    nftRoyalty: BigNumber,
    qty: number,
    collectionAddress: string,
    erc20: Erc20,
    marketplace: Marketplace,
  ): Promise<void> {
    try {
      let tx = await erc20.increaseAllowance(marketplace.address, nftPrice.mul(qty));
      await tx.wait();
      tx = await erc20.increaseAllowance(collectionAddress, nftRoyalty.mul(qty));
      await tx.wait();
    } catch (err) {
      console.error(err);
      throw new AllowanceBalanceError();
    }
  }

  private async getOrderInfo(orderId: string, marketplace: Marketplace) {
    const [, nftId, amount, price, royaltyFee, collection, , receiver, creator] = await marketplace.orders(
      BigNumber.from(orderId),
    );
    const summary = BigNumber.from(price).add(royaltyFee);
    return {
      orderId,
      nftId,
      amount,
      price,
      royaltyFee,
      collection,
      receiver,
      creator,
      summary,
    };
  }
}
