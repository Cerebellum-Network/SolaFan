import {APP_ID, IDENTITY_API_URL} from '../../../config/common';
import {SubscriptionTypeEnum} from '../../types/subscription';
import {IRESTClient} from '../api-clients/IRESTClient';
import {ISubscribeApi} from './ISubscribeApi';

export const createSubscribeApi = (restClient: IRESTClient): ISubscribeApi => {
  const subscribe = async (
    email: string,
    type: SubscriptionTypeEnum,
    entityId: string,
    locale: string,
  ): Promise<void> => {
    try {
      await restClient.makeRequest<void>('post', `${IDENTITY_API_URL()}/subscriptions`, () => true, {
        email,
        type,
        entityId: Number(entityId),
        locale,
        appId: APP_ID(),
      });
    } catch (error) {
      console.error(error);
      throw new Error('Cannot subscribe');
    }
  };

  const unsubscribe = async (email: string, type: SubscriptionTypeEnum, entityId: string): Promise<void> => {
    try {
      await restClient.makeRequest<void>('delete', `${IDENTITY_API_URL()}/subscriptions`, () => true, {
        params: {
          email,
          type,
          entityId: Number(entityId),
          appId: APP_ID(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Cannot unsubscribe');
    }
  };

  const check = async (email: string, type: SubscriptionTypeEnum, entityId: string): Promise<boolean> => {
    try {
      const result = await restClient.makeRequest<boolean>('get', `${IDENTITY_API_URL()}/subscriptions`, () => true, {
        params: {
          email,
          type,
          entityId: Number(entityId),
          appId: APP_ID(),
        },
      });
      return result === true;
    } catch (error) {
      console.error(error);
      throw new Error('Cannot check subscription');
    }
  };

  return {
    subscribe,
    unsubscribe,
    check,
  };
};
