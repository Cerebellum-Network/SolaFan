import {CmsAppConfig} from '@cere/services-types';

import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {GET_APP_CONFIG} from './app-config.query';
import {AppConfigLoadingError} from './AppConfigLoadingError';
import {IAppConfigApi} from './IAppConfigApi';
import {isCmsAppConfig} from './type-guards';

export class GraphQLAppConfigApi implements IAppConfigApi {
  constructor(private readonly client: IGraphQLClient) {}

  async getAppConfig(locale: string): Promise<CmsAppConfig> {
    const config = await this.client.makeQuery<CmsAppConfig, {locale: string}>(
      GET_APP_CONFIG,
      {locale},
      'appConfig',
      isCmsAppConfig,
    );
    if (!config) {
      throw new AppConfigLoadingError();
    }
    return config;
  }
}
