import {IDENTITY_API_URL} from '../../config/common';
import {post} from '../lib/request';

export interface PrivateKeyResult {
  privateKey: string;
}

export const fetchPrivateKey = async (userToken: string): Promise<string> => {
  const json = (await post(`/identity/fetch-private-key`, undefined, {
    base: IDENTITY_API_URL(),
    headers: {Authorization: `Bearer ${userToken}`},
  })) as Record<string, PrivateKeyResult>;

  return json.data?.privateKey;
};
