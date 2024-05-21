import axios from 'axios';

import {FREEPORT_VIDEO_API} from '../../../config/common';
import {AxiosClientDecorator} from '../api-clients/AxiosClientDecorator';

const api = axios.create({
  baseURL: FREEPORT_VIDEO_API,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((response) => ({data: response}));

export const videoRestClient = new AxiosClientDecorator(api);
