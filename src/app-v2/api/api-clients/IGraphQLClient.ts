import {DocumentNode} from '@apollo/client';

import {TypeGuard} from './types';

export interface IGraphQLClient {
  makeQuery<ReturnType, VariablesType = any>(
    query: DocumentNode,
    variables: VariablesType,
    dataField: string,
    typeGuard: TypeGuard,
  ): Promise<ReturnType | undefined>;
}
