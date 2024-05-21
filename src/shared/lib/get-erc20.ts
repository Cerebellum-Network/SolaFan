import {createERC20, createSigner, getERC20Address, TestERC20 as ERC20} from '@cere/freeport-sdk';
import {providers} from 'ethers';

import {APPLICATION, CONTRACTS_DEPLOYMENT, HTTP_PROVIDER_URL} from '../../config/common';
import {getSigner} from '../services/non-custody-wallet';
import {fetchPrivateKey} from '../services/private-key.service';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';

const PROVIDER_URL = HTTP_PROVIDER_URL;

if (!PROVIDER_URL) {
  throw new Error('Specify "REACT_APP_HTTP_PROVIDER_URL" ENV parameters!');
}

let erc20CustodyMap = new Map<string, ERC20>();

export const getERC20 = async (userToken: string): Promise<ERC20> => {
  if (erc20CustodyMap.has(userToken)) {
    return erc20CustodyMap.get(userToken)!;
  }

  const privateKey = await fetchPrivateKey(userToken);

  let erc20: ERC20;

  try {
    // We use static provider here to query contract quickly, instead of getDavinciSignerAndProvider
    const provider = new providers.StaticJsonRpcProvider(PROVIDER_URL);
    const signer = createSigner({provider, mnemonic: undefined, privateKey});
    const contractAddress = await getERC20Address(provider, CONTRACTS_DEPLOYMENT, APPLICATION());
    erc20 = createERC20({signer, contractAddress});
  } catch (err) {
    console.error(err);
    throw err;
  }

  erc20CustodyMap.set(userToken, erc20);

  return erc20;
};

let erc20NonCustodyMap = new Map<NonCustodyWalletTypeEnum, [ERC20, providers.JsonRpcSigner]>();

export const getERC20NonCustody = async (type: NonCustodyWalletTypeEnum): Promise<[ERC20, providers.JsonRpcSigner]> => {
  if (erc20NonCustodyMap.has(type)) {
    return erc20NonCustodyMap.get(type)!;
  }

  let erc20: ERC20;
  let signer: providers.JsonRpcSigner;

  try {
    signer = await getSigner(type);
    const contractAddress = await getERC20Address(signer.provider, CONTRACTS_DEPLOYMENT, APPLICATION());
    erc20 = createERC20({signer, contractAddress});
  } catch (err) {
    console.error(err);
    throw err;
  }

  const result: [ERC20, providers.JsonRpcSigner] = [erc20, signer];

  erc20NonCustodyMap.set(type, result);

  return result;
};

export const resetErc20Clients = () => {
  erc20CustodyMap.clear();
  erc20NonCustodyMap.clear();
};
