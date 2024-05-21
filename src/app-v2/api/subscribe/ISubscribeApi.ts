import {SubscriptionTypeEnum} from '../../types/subscription';

export interface ISubscribeApi {
  subscribe(email: string, type: SubscriptionTypeEnum, entityId: string, locale: string): Promise<void>;
  unsubscribe(email: string, type: SubscriptionTypeEnum, entityId: string): Promise<void>;
  check(email: string, type: SubscriptionTypeEnum, entityId: string): Promise<boolean>;
}
