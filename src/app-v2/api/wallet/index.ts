import axios from 'axios';

import {IDENTITY_API_URL, tenantId} from '../../../config/common';
import {CURRENT_USER_TOKEN_FIELD} from '../../constants/common';
import {RESTWalletsApi} from './RESTWalletsApi';

const api = axios.create({
  baseURL: IDENTITY_API_URL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(CURRENT_USER_TOKEN_FIELD) || '';
  config.headers = {
    authorization: `Bearer ${token}`,
    'X-Tenant-Id': tenantId(),
  };
  return config;
});

export const walletsApi = new RESTWalletsApi(api);
