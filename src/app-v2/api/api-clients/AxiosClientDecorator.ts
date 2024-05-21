import {AxiosInstance, AxiosRequestConfig} from 'axios';

import {AbstractClientDecorator} from './AbstractClientDecorator';
import {IRESTClient} from './IRESTClient';
import {HTTPMethod, TypeGuard} from './types';

export class AxiosClientDecorator extends AbstractClientDecorator implements IRESTClient {
  constructor(private readonly axiosClient: AxiosInstance) {
    super();
  }

  async makeRequest<ReturnType, ConfigType = any>(
    method: HTTPMethod,
    url: string,
    typeGuard: TypeGuard,
    config?: ConfigType & AxiosRequestConfig<ConfigType>,
  ): Promise<ReturnType | undefined> {
    const {data: response} = await this.axiosClient[method](url, config);
    return this.checkDataAndReturnValidEntries<ReturnType>(response.data, typeGuard);
  }
}
