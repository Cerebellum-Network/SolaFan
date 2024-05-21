import {Bytes} from 'ethers';

export type Signer = {
  signMessage: (message: string | Bytes) => Promise<string>;
};
