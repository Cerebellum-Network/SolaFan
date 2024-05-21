import {enableBiconomy, importProvider} from '@cere/freeport-sdk';
import {providers} from 'ethers';

import {BICONOMY_API_KEY, ENV, NETWORK_ID} from '../../config/common';

if (!NETWORK_ID) {
  throw new Error('Network ID should be provided');
}

export const getSigner = async (): Promise<providers.JsonRpcSigner> => {
  let provider = importProvider();
  if (BICONOMY_API_KEY) {
    provider = await enableBiconomy(provider, BICONOMY_API_KEY, ['dev', 'stage'].includes(ENV));
  }
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
};

export const switchNetwork = async () => {
  const provider = importProvider();
  const signer = provider.getSigner();
  await signer.provider.send('wallet_switchEthereumChain', [{chainId: `0x${NETWORK_ID.toString(16)}`}]);
};

export const connectAndSignIn = async (): Promise<string> => {
  const signer = await getSigner();
  const account = await signer.getAddress();
  await signer.signMessage(`Account:${account} Nonce: ${Date.now()}`);

  return account;
};

export const disconnect = async () => {
  try {
    const provider = importProvider();
    await provider.send('wallet_requestPermissions', [
      {
        eth_accounts: {},
      },
    ]);
    return true;
  } catch (e) {
    console.log('[Metamask] Error during disconnect', e);
    return false;
  }
};
