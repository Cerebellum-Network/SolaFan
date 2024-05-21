import {IDENTITY_API_URL} from '../../config/common';
import {get, post} from '../lib/request';

export const checkUserConsent = async (accessToken: string): Promise<boolean> => {
  const response = (await get(`/user-consent/check`, {
    base: IDENTITY_API_URL(),
    headers: {Authorization: `Bearer ${accessToken}`},
  })) as {data: boolean};

  return response.data;
};

export const addUserConsent = async (accessToken: string): Promise<void> => {
  await post(
    `/user-consent`,
    {},
    {
      base: IDENTITY_API_URL(),
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );
};
