import {CMS_URL} from '../../config/common';
import {post} from '../lib/request';
import {signMessage} from '../lib/signature';
import {fetchPrivateKey} from './private-key.service';

export const getDdcAccessToken = async (
  ddcUrl: string,
  keys: {userPublicKey?: string},
  token: string,
): Promise<string> => {
  if (!keys.userPublicKey) {
    throw new Error('Public key is not found!');
  }

  const privateKey = await fetchPrivateKey(token);

  const message: string = `${ddcUrl}${keys.userPublicKey}`;
  const signature = signMessage(message, privateKey);

  return (await post(
    `/cms-exhibitions/video/access-token`,
    {
      ddcUrl,
      wallet: keys.userPublicKey,
      signature,
    },
    {
      base: CMS_URL(),
      type: 'text',
    },
  )) as string;
};
