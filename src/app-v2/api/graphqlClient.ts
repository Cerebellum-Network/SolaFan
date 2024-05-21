import {ApolloClient, InMemoryCache} from '@apollo/client';
import {BatchHttpLink} from '@apollo/client/link/batch-http';

import {CMS_PROXY_URL, tenantId} from '../../config/common';
import {ApolloClientDecorator} from './api-clients/ApolloClientDecorator';

const url = new URL(CMS_PROXY_URL);
url.pathname = 'graphql';

const link = new BatchHttpLink({
  uri: url.href,
  batchMax: 50,
  batchInterval: 20,
  headers: {
    'X-Tenant-Id': tenantId(),
  },
});

const plainApolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  headers: {
    'X-Tenant-Id': tenantId(),
  },
});

export const apolloClient = new ApolloClientDecorator(plainApolloClient);
