import {configureStore} from '@reduxjs/toolkit';

import {subscriptionsReducer} from './subscriptions';

export const toolkitStore = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    subscriptions: subscriptionsReducer,
  },
});

export const useToolkitDispatch = () => toolkitStore.dispatch;
