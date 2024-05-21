import {Marketplace} from '@cere/freeport-sc-sdk';
import {BigNumber} from 'ethers';

import {ContractsProvider} from '../blockchain/ContractsProvider';
import {BidAllowanceError} from './errors/BidAllowanceError';
import {IAuctionSCApi} from './IAuctionSCApi';
import {TransactionResult} from './types';

export class FreeportAuctionApi implements IAuctionSCApi {
  constructor(private readonly contractProvider: ContractsProvider) {}

  async placeBid(auctionId: string, price: number): Promise<TransactionResult> {
    const contract = await this.contractProvider.getMarketplaceContract();
    await this.checkAllowedBalance(price, contract);
    const tx = await contract.bid(BigNumber.from(auctionId), BigNumber.from(price));
    await tx.wait();
    return {
      hash: tx.hash,
      timestamp: tx.timestamp,
    };
  }

  async settleAuction(auctionId: string): Promise<void> {
    const contract = await this.contractProvider.getMarketplaceContract();
    const tx = await contract.resolveAuction(auctionId);
    await tx.wait();
  }

  async startAuction(
    nftAddress: string,
    startingPrice: number,
    amount: number,
    duration: number,
    collectionAddress: string,
  ): Promise<void> {
    const contract = await this.contractProvider.getMarketplaceContract();
    const tx = await contract.startAuction(
      collectionAddress,
      BigNumber.from(nftAddress),
      BigNumber.from(amount),
      BigNumber.from(startingPrice),
      BigNumber.from(duration),
      '', // FixMe
    );
    await tx.wait();
  }

  private async checkAllowedBalance(price: number, marketplace: Marketplace): Promise<void> {
    const erc20 = await this.contractProvider.getERC20Contract();
    try {
      let tx = await erc20.increaseAllowance(marketplace.address, BigNumber.from(price));
      await tx.wait();
    } catch (err) {
      console.error(err);
      throw new BidAllowanceError();
    }
  }
}
