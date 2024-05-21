import {ApolloClient, DocumentNode, NormalizedCacheObject} from '@apollo/client';

import {AbstractClientDecorator} from './AbstractClientDecorator';
import {IGraphQLClient} from './IGraphQLClient';
import {MissingExpectedFieldError} from './MissingExpectedFieldError';
import {TypeGuard} from './types';

export class ApolloClientDecorator extends AbstractClientDecorator implements IGraphQLClient {
  constructor(private readonly apolloClient: ApolloClient<NormalizedCacheObject>) {
    super();
  }

  async makeQuery<ReturnType, VariablesType = any>(
    query: DocumentNode,
    variables: VariablesType,
    dataField: string,
    typeGuard: TypeGuard,
  ): Promise<ReturnType | undefined> {
    const {data} = await this.apolloClient.query({query, variables, fetchPolicy: 'network-only'});
    const response = data[dataField] as unknown;
    if (!response) {
      throw new MissingExpectedFieldError(dataField);
    }
    return this.checkDataAndReturnValidEntries<ReturnType>(response, typeGuard);
  }
}
