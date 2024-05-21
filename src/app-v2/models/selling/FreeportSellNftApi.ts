import {BigNumber, BigNumberish} from 'ethers';

import {unitToDecimals} from '../../utils/helpers/decimals';
import {ContractsProvider} from '../blockchain/ContractsProvider';
import {ISellNftApi} from './ISellNftApi';

export class FreeportSellNftApi implements ISellNftApi {
  constructor(private readonly contractsProvider: ContractsProvider) {}

  async sellNft(nftAddress: string, price: BigNumberish, amount: number, collectionAddress: string): Promise<string> {
    const marketplace = await this.contractsProvider.getMarketplaceContract();
    const erc20 = await this.contractsProvider.getERC20Contract();
    const decimals = await erc20.decimals();
    const decimalsPrice = unitToDecimals(price, decimals).toString();

    const collection = await this.contractsProvider.createFreeportCollection(collectionAddress);
    const tx1 = await collection.setApprovalForAll(marketplace.address, true);
    await tx1.wait();
    const tx2 = await marketplace['makeOrder(address,uint256,uint256,address,uint256)'](
      collectionAddress,
      nftAddress,
      amount,
      erc20.address,
      decimalsPrice,
    );
    await tx2.wait();
    return tx2.hash;
  }

  async cancelNftSelling(orderId: string): Promise<void> {
    let tx;
    const marketplace = await this.contractsProvider.getMarketplaceContract();
    const marketPlaceAddress = marketplace.address;

    const erc20 = await this.contractsProvider.getERC20Contract();
    const orderInfo = await marketplace.orders(orderId);

    tx = await marketplace.cancelOrder(BigNumber.from(orderId));
    await tx.wait();

    const signerAddress = await this.contractsProvider.getSignerAddress();

    const approvedAmount = await erc20.allowance(signerAddress, marketPlaceAddress);
    if (approvedAmount.lte(orderInfo.royaltyFee)) {
      tx = await erc20.approve(marketPlaceAddress, 0);
    } else {
      tx = await erc20.decreaseAllowance(marketPlaceAddress, orderInfo.royaltyFee);
    }
    await tx.wait();
  }
}
