import {CmsAppConfig} from '@cere/services-types';

export interface IAppConfigApi {
  getAppConfig(locale: string): Promise<CmsAppConfig>;
}
