import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {GraphQLAppConfigApi} from './GraphQLAppConfigApi';

export const createAppConfigApi = (client: IGraphQLClient) => new GraphQLAppConfigApi(client);
