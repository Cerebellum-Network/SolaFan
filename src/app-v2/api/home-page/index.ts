import {IRESTClient} from '../api-clients/IRESTClient';
import {BFFHomePageNftsApi} from './BFFHomePageNftsApi';

export const createHomePageApi = (client: IRESTClient) => new BFFHomePageNftsApi(client);
