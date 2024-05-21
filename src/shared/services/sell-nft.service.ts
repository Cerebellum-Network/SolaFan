import {createERC20MockToken, Deployment, getERC20Address} from '@cere/freeport-sc-sdk';
import {ContractReceipt} from 'ethers';

import {APPLICATION, CONTRACTS_DEPLOYMENT, GAS_LIMIT as gasLimit, GAS_PRICE as gasPrice} from '../../config/common';
import {unitToDecimals} from '../lib/decimals';
import {getCollection} from '../lib/get-collection';
import {getFreeport} from '../lib/get-freeport';
import {getMarketplace, getMarketplaceNonCustody} from '../lib/get-marketplace';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {AppWallet, SupportedWallet} from '../types/supported-wallet';
import {getDavinciSignerAndProvider} from './get-signer-and-provider';
import {getSigner} from './non-custody-wallet';
import {safeTransferFrom} from './token-transfer.service';

export const makeNftOfferCustody = async (
  userToken: string,
  nftId: string,
  price: string,
  saleAmount: number,
  collectionAddress?: string,
) => {
  const contract = await getMarketplace(userToken);
  const {provider} = await getDavinciSignerAndProvider(userToken);

  const erc20Address = await getERC20Address(provider, CONTRACTS_DEPLOYMENT as Deployment, APPLICATION());
  const erc20Token = createERC20MockToken({signer: contract.signer, contractAddress: erc20Address});
  const decimals = await erc20Token.decimals();

  const tx = await contract['makeOrder(address,uint256,uint256,address,uint256)'](
    collectionAddress!,
    nftId,
    saleAmount,
    erc20Address,
    unitToDecimals(price, decimals),
    {
      gasLimit,
      gasPrice,
    },
  );
  return tx.wait();
};

export const makeNftOfferNonCustody = async (
  type: NonCustodyWalletTypeEnum,
  nftId: string,
  price: string,
  saleAmount: number,
  collectionAddress?: string,
) => {
  const contract = await getMarketplaceNonCustody(type);
  const signer = await getSigner(type);

  const erc20Address = await getERC20Address(signer.provider, CONTRACTS_DEPLOYMENT as Deployment, APPLICATION());
  const erc20Token = createERC20MockToken({signer, contractAddress: erc20Address});
  const decimals = await erc20Token.decimals();

  let result;
  try {
    const tx = await contract['makeOrder(address,uint256,uint256,address,uint256)'](
      collectionAddress!,
      nftId,
      saleAmount,
      erc20Address,
      unitToDecimals(price, decimals),
    );
    result = await tx.wait();
  } catch (e) {
    return e;
  }
  return result as ContractReceipt;
};

export const makeNftOffer = async (
  nftId: string,
  price: string,
  saleAmount: number,
  wallet: SupportedWallet,
  collectionAddress?: string,
  userToken?: string,
): Promise<ContractReceipt> => {
  if (wallet === AppWallet.DAVINCI && userToken) {
    return makeNftOfferCustody(userToken, nftId, price, saleAmount, collectionAddress);
  }
  return makeNftOfferNonCustody(wallet as NonCustodyWalletTypeEnum, nftId, price, saleAmount, collectionAddress);
};

export const transferNft = async (
  userToken: string,
  userPublicKey: string,
  toAccount: string,
  nftId: string,
  collectionAddress?: string,
): Promise<void> => {
  const contract = collectionAddress
    ? await getCollection(userToken, collectionAddress!)
    : await getFreeport(userToken);

  await safeTransferFrom(contract, {
    from: userPublicKey,
    toAccount: toAccount,
    tokenId: nftId,
    amount: 1,
  });
};
