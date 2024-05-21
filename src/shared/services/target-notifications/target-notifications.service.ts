import {TargetNotificationStatus} from '@cere/services-types';

import {DAVINCI_API_URL as base, tenantId} from '../../../config/common';
import {get, patch} from '../../lib/request';
import {isRecord} from '../../types/is-record';

export const fetchNewNotifications = async (locale: string, token?: string): Promise<any> => {
  const response = await get<'json'>(`/target-notifications?locale=${locale}`, {
    base,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'X-Tenant-Id': tenantId(),
    },
  });

  if (isRecord(response) && response.data) {
    return response.data;
  }
};

export const markAsProcessed = async (token: string, id: number, locale: string): Promise<void> => {
  await patch<'json'>(
    `/target-notifications/${id}?locale=${locale}`,
    {
      status: TargetNotificationStatus.READ,
    },
    {
      base,
      headers: {Authorization: `Bearer ${token}`, 'X-Tenant-Id': tenantId()},
    },
  );
};
