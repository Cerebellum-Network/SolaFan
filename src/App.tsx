import './i18n';

import {ApolloProvider} from '@apollo/client';
import {MarketplaceMediaSdkProvider} from 'context/marketplace-media-sdk-provider';
import TagManager from 'react-gtm-module';
import {Provider} from 'react-redux';
import {SingletonHooksContainer} from 'react-singleton-hook';

import packageJson from '../package.json';
import {apolloClient} from './apollo-client';
import {Loader} from './app-v2/components/connected/ConnectedLoader';
import {ErrorsContainer} from './app-v2/components/shared/ErrorsContainer';
import {oldStore} from './app-v2/redux';
import {gtmId} from './config/common';
import {AppProvider} from './context/app-provider';
import {AppRouter} from './router';

if (gtmId()) {
  TagManager.initialize({
    gtmId: gtmId(),
  });
}

export function App() {
  console.log(
    `%cClient App Version:  ${packageJson.version}`,
    ` color:white; background-color:black; border-left: 1px solid yellow; padding: 4px;`,
  );

  return (
    <Provider store={oldStore}>
      <ApolloProvider client={apolloClient}>
        <AppProvider>
          <MarketplaceMediaSdkProvider>
            <SingletonHooksContainer />
            <ErrorsContainer />
            <AppRouter />
          </MarketplaceMediaSdkProvider>
          <Loader />
        </AppProvider>
      </ApolloProvider>
    </Provider>
  );
}
