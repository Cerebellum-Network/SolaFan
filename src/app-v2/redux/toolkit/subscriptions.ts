import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import {subscribeApi} from '../../api';
import {SubscriptionTypeEnum} from '../../types/subscription';

interface SubscriptionsState {
  // data
  email: string | null;
  subscriptions: {
    // true - user has subscription, false - don't have, undefined - need to check
    [SubscriptionTypeEnum.NFT]: {[entityId: string]: boolean};
    [SubscriptionTypeEnum.ARTIST]: {[entityId: string]: boolean};
    [SubscriptionTypeEnum.EXHIBIT]: {[entityId: string]: boolean};
  };
  // UI
  askEmailModal: {
    showed: string | null;
  };
  confirmSubscribeModal: {
    showed: string | null;
  };
  confirmUnsubscribeModal: {
    showed: string | null;
  };
}

// Define the initial state using that type
const initialState: SubscriptionsState = {
  // DATA
  email: null,
  subscriptions: {
    [SubscriptionTypeEnum.NFT]: {},
    [SubscriptionTypeEnum.ARTIST]: {},
    [SubscriptionTypeEnum.EXHIBIT]: {},
  },
  askEmailModal: {
    showed: null,
  },
  confirmSubscribeModal: {
    showed: null,
  },
  confirmUnsubscribeModal: {
    showed: null,
  },
};

export const checkSubscription = createAsyncThunk(
  'checkSubscription',
  async (payload: {type: SubscriptionTypeEnum; entityId: string}, thunkApi) => {
    let ret = false;
    const state: {subscriptions: SubscriptionsState} = thunkApi?.getState?.() as {subscriptions: SubscriptionsState};
    const lastValue = state?.subscriptions?.subscriptions?.[payload.type]?.[payload.entityId];
    if (lastValue) {
      return {type: payload.type, entityId: payload.entityId, result: lastValue};
    }
    if (!state?.subscriptions?.email) {
      throw new Error('Email is not defined in subscription store');
    }
    if (!payload?.entityId) {
      throw new Error('Entity id for subscription is not defined');
    }
    if (!payload?.type) {
      throw new Error('Subscription type is not defined');
    }
    try {
      ret = await subscribeApi.check(state?.subscriptions?.email, payload.type, payload.entityId);
    } catch (e) {
      console.error(e);
    }
    return {type: payload.type, entityId: payload.entityId, result: ret};
  },
);

export const createSubscription = createAsyncThunk(
  'createSubscription',
  async (payload: {type: SubscriptionTypeEnum; entityId: string}, thunkApi) => {
    const state: {subscriptions: SubscriptionsState} = thunkApi?.getState?.() as {subscriptions: SubscriptionsState};
    if (!state?.subscriptions?.email) {
      thunkApi.dispatch(showAskEmailModal({type: payload.type, entityId: payload.entityId}));
      throw new Error('Email is not defined in subscription store');
    }
    if (!payload?.entityId) {
      throw new Error('Entity id for subscription is not defined');
    }
    if (!payload?.type) {
      throw new Error('Subscription type is not defined');
    }
    await subscribeApi.subscribe(state?.subscriptions?.email, payload.type, payload.entityId, 'en');
    return {type: payload.type, entityId: payload.entityId, result: true};
  },
);

export const removeSubscription = createAsyncThunk(
  'removeSubscription',
  async (payload: {type: SubscriptionTypeEnum; entityId: string}, thunkApi) => {
    const state: {subscriptions: SubscriptionsState} = thunkApi?.getState?.() as {subscriptions: SubscriptionsState};
    if (!state?.subscriptions?.email) {
      throw new Error('Email is not defined in subscription store');
    }
    if (!payload?.entityId) {
      throw new Error('Entity id for subscription is not defined');
    }
    if (!payload?.type) {
      throw new Error('Subscription type is not defined');
    }
    await subscribeApi.unsubscribe(state?.subscriptions?.email, payload.type, payload.entityId);
    return {type: payload.type, entityId: payload.entityId, result: false};
  },
);

const subscriptionsSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: () => ({
    setSubscriptionEmail: (state, {payload}: PayloadAction<{email: string | null}>) => {
      if (state.email !== payload.email) {
        state.email = payload.email;
        state.subscriptions = {
          [SubscriptionTypeEnum.NFT]: {},
          [SubscriptionTypeEnum.ARTIST]: {},
          [SubscriptionTypeEnum.EXHIBIT]: {},
        };
      }
    },
    showConfirmSubscribeModal: (state, {payload}: PayloadAction<{type: SubscriptionTypeEnum; entityId: string}>) => {
      state.confirmSubscribeModal.showed = `${payload.type}-${payload.entityId}`;
    },
    hideConfirmSubscribeModal: (state) => {
      state.confirmSubscribeModal.showed = null;
    },
    showConfirmUnsubscribeModal: (state, {payload}: PayloadAction<{type: SubscriptionTypeEnum; entityId: string}>) => {
      state.confirmUnsubscribeModal.showed = `${payload.type}-${payload.entityId}`;
    },
    hideConfirmUnsubscribeModal: (state) => {
      state.confirmUnsubscribeModal.showed = null;
    },
    showAskEmailModal: (state, {payload}: PayloadAction<{type: SubscriptionTypeEnum; entityId: string}>) => {
      state.askEmailModal.showed = `${payload.type}-${payload.entityId}`;
    },
    hideAskEmailModal: (state) => {
      state.askEmailModal.showed = null;
    },
  }),
  extraReducers: (builder) => {
    builder.addCase(checkSubscription.fulfilled, (state, {payload}) => {
      state.subscriptions[payload.type][payload.entityId] = payload.result;
    });
    builder.addCase(checkSubscription.rejected, (_state, acton) => {
      console.error(acton?.error || acton);
    });
    builder.addCase(createSubscription.fulfilled, (state, {payload}) => {
      state.subscriptions[payload.type][payload.entityId] = payload.result;
      state.confirmSubscribeModal.showed = `${payload.type}-${payload.entityId}`;
    });
    builder.addCase(createSubscription.rejected, (_state, acton) => {
      console.error(acton?.error || acton);
    });
    builder.addCase(removeSubscription.fulfilled, (state, {payload}) => {
      state.subscriptions[payload.type][payload.entityId] = payload.result;
      state.confirmUnsubscribeModal.showed = `${payload.type}-${payload.entityId}`;
    });
    builder.addCase(removeSubscription.rejected, (_state, acton) => {
      console.error(acton?.error || acton);
    });
  },
});

export const {
  setSubscriptionEmail,
  showConfirmSubscribeModal,
  hideConfirmSubscribeModal,
  showConfirmUnsubscribeModal,
  hideConfirmUnsubscribeModal,
  showAskEmailModal,
  hideAskEmailModal,
} = subscriptionsSlice.actions;

export const selectConfirmSubscribeModal = (state: {subscriptions: SubscriptionsState}) =>
  state.subscriptions.confirmSubscribeModal;
export const selectConfirmUnsubscribeModal = (state: {subscriptions: SubscriptionsState}) =>
  state.subscriptions.confirmUnsubscribeModal;
export const selectSubscriptionsStore = (state: {subscriptions: SubscriptionsState}) => state.subscriptions;
export const subscriptionsReducer = subscriptionsSlice.reducer;
