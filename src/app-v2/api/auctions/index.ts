import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {GraphQLAuctionsApi} from './GraphQLAuctionsApi';
import {IAuctionsApi} from './IAuctionsApi';

export const createAuctionsApi = (client: IGraphQLClient): IAuctionsApi => new GraphQLAuctionsApi(client);
