import {ExhibitCardInterface} from '@cere/services-types';
import {isEvent} from 'app-v2/utils/type-guards/events';

import {IRESTClient} from '../api-clients/IRESTClient';
import {IEventsApi} from './IEventsApi';

export class BFFEventsApi implements IEventsApi {
  constructor(private readonly client: IRESTClient) {}

  async getFeaturedEvents(locale: string): Promise<ExhibitCardInterface[]> {
    const data = await this.client.makeRequest<ExhibitCardInterface[]>(
      'get',
      `/featured-exhibits?locale=${locale}`,
      isEvent,
    );
    return data ?? [];
  }
}
