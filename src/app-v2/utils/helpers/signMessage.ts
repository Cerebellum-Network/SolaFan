import Web3 from 'web3';

export const signMessage = (message: string, privateKey?: string): string => {
  if (!privateKey) {
    throw new Error('Private key is not found!');
  }

  const web3 = new Web3();
  let signature: string;

  try {
    const wallet = web3.eth.accounts.wallet.add(privateKey);
    signature = wallet.sign(message).signature;
  } catch (error) {
    throw new Error(error);
  }

  return signature;
};
