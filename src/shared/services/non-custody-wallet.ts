import {providers} from 'ethers';

import {NETWORK_ID} from '../../config/common';
import i18n from '../../i18n';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {getSigner as getSignerMetamask, switchNetwork as switchNetworkMetamask} from './metamask';
// import {getSigner as getSignerWalletConnect, switchNetwork as switchNetworkWalletConnect} from './wallet-connect';
import {maticNetworkNames, MaticTestnetIdEnum} from './web3';

export const switchNetwork = (type: NonCustodyWalletTypeEnum) => {
  let handler;
  switch (type) {
    case NonCustodyWalletTypeEnum.METAMASK:
      handler = switchNetworkMetamask;
      break;
    // case NonCustodyWalletTypeEnum.WALLET_CONNECT:
    //   handler = switchNetworkWalletConnect;
    //   break;
    default:
      throw new Error(i18n.t(`Unsupported wallet type {{type}}`, {type}));
  }

  return handler();
};

export const getSigner = (type: NonCustodyWalletTypeEnum): Promise<providers.JsonRpcSigner> => {
  let signer;
  switch (type) {
    // case NonCustodyWalletTypeEnum.WALLET_CONNECT:
    //   signer = getSignerWalletConnect;
    //   break;
    case NonCustodyWalletTypeEnum.METAMASK:
      signer = getSignerMetamask;
      break;
    default:
      throw new Error(i18n.t(`Unsupported wallet type {{type}}`, {type}));
  }

  return signer();
};

export const checkNetwork = async (type: NonCustodyWalletTypeEnum) => {
  const signer = await getSigner(type);

  const {chainId} = await signer.provider.getNetwork();

  const allowedChainId = NETWORK_ID;

  if (allowedChainId !== chainId) {
    const id = Number(allowedChainId) as MaticTestnetIdEnum;

    throw new Error(
      i18n.t(`You should switch your MetaMask client to {{networkName}}`, {networkName: maticNetworkNames[id]}),
    );
  }
};
