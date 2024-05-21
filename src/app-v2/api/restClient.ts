import axios from 'axios';

import {DAVINCI_API_URL, tenantId} from '../../config/common';
import {CURRENT_USER_TOKEN_FIELD} from '../constants/common';
import {AxiosClientDecorator} from './api-clients/AxiosClientDecorator';

const restApi = axios.create({
  baseURL: DAVINCI_API_URL,
});

restApi.interceptors.request.use((config) => {
  config.headers = {
    authorization: localStorage.getItem(CURRENT_USER_TOKEN_FIELD) || '',
    'X-Tenant-Id': tenantId(),
    ...config.headers,
  };
  return config;
});

export const restClient = new AxiosClientDecorator(restApi);
