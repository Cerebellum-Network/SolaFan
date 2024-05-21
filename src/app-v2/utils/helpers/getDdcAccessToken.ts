import {CMS_URL} from 'config/common';

import {fetchPrivateKey} from './fetchPrivateKey';
import {post} from './fetchRequest';
import {signMessage} from './signMessage';

export const getDdcAccessToken = async (ddcUrl: string, userPublicKey?: string, token?: string): Promise<string> => {
  if (!userPublicKey) {
    throw new Error('Public key is not found!');
  }
  if (!token) {
    throw new Error('User token is not found!');
  }

  const privateKey = await fetchPrivateKey(token);

  const message: string = `${ddcUrl}${userPublicKey}`;
  const signature = signMessage(message, privateKey);

  return (await post(
    `/cms-exhibitions/video/access-token`,
    {
      ddcUrl,
      wallet: userPublicKey,
      signature,
    },
    {
      base: CMS_URL(),
      type: 'text',
    },
  )) as string;
};
