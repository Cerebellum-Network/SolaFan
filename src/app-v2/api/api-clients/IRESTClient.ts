import {AxiosRequestConfig} from 'axios';

import {HTTPMethod, TypeGuard} from './types';

export interface IRESTClient {
  makeRequest<ReturnType, ConfigType = any>(
    method: HTTPMethod,
    url: string,
    typeGuard: TypeGuard,
    config?: ConfigType & AxiosRequestConfig<ConfigType>,
  ): Promise<ReturnType | undefined>;
}
