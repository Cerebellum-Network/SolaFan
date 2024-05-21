import {ExhibitCardInterface} from '@cere/services-types';

export interface IEventsApi {
  getFeaturedEvents(locale: string): Promise<ExhibitCardInterface[]>;
}
