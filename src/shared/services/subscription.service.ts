import * as Sentry from '@sentry/react';

import {SubscriptionTypeEnum} from '../../app-v2/types/subscription';
import {APP_ID, IDENTITY_API_URL} from '../../config/common';
import {post} from '../lib/request';

export const createSubscription = async (
  email: string,
  type: SubscriptionTypeEnum,
  entityId?: number,
  locale?: string,
): Promise<void> => {
  await post(
    `/subscriptions`,
    {
      email,
      type,
      entityId,
      appId: APP_ID(),
      locale,
    },
    {base: IDENTITY_API_URL()},
  ).catch((error) => {
    Sentry.captureException(error);
    throw error;
  });
};
