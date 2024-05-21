import {IRESTClient} from '../api-clients/IRESTClient';
import {BFFEventsApi} from './BFFEventsApi';
import {IEventsApi} from './IEventsApi';

export const createEventsApi = (client: IRESTClient): IEventsApi => new BFFEventsApi(client);
