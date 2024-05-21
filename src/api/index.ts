import axios from 'axios';

import {DAVINCI_API_URL, tenantId} from '../config/common';
import {LOCAL_STORAGE_KEY_TOKEN} from '../const/storage-keys';
import {createCreatorApi} from './creator';
import {createExhibitApi} from './exhibit';
import {createNftApi} from './nft';
import {createRealLifeEventApi} from './realLifeEvent';
import {createTranslationsApi} from './translations';

const api = axios.create({
  baseURL: DAVINCI_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers = {
    authorization: localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '',
    'X-Tenant-Id': tenantId(),
  };
  return config;
});

export const nftApi = createNftApi(api);
export const creatorApi = createCreatorApi(api);
export const exhibitApi = createExhibitApi(api);
export const translationsApi = createTranslationsApi(api);
export const realLifeEventsApi = createRealLifeEventApi(api);
