import axios from 'axios';

import {NOTIFICATION_SERVICE_API_URL, tenantId} from '../../config/common';
import {CURRENT_USER_TOKEN_FIELD} from '../constants/common';
import {AxiosClientDecorator} from './api-clients/AxiosClientDecorator';

const restApi = axios.create({
  baseURL: NOTIFICATION_SERVICE_API_URL,
});

restApi.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${localStorage.getItem(CURRENT_USER_TOKEN_FIELD)}` || '',
    'X-Tenant-Id': tenantId(),
  };
  return config;
});

export const notificationsRestClient = new AxiosClientDecorator(restApi);
