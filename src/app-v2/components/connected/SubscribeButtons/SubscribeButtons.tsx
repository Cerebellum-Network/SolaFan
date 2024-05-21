import {Button, CircularProgress} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {useLocalization} from '../../../hooks/use-locale.hook';
import {useToolkitDispatch} from '../../../redux/toolkit/store';
import {
  checkSubscription,
  createSubscription,
  removeSubscription,
  selectSubscriptionsStore,
  setSubscriptionEmail,
} from '../../../redux/toolkit/subscriptions';
import {SubscriptionTypeEnum} from '../../../types/subscription';
import {AskEmailModal} from './modals/AskEmailModal';
import {ConfirmSubscribeModal} from './modals/ConfirmSubscriptionModal';
import {ConfirmUnsubscribeModal} from './modals/ConfirmUnsubscriptionModal';

type Props = {
  userEmail?: string;
  type: SubscriptionTypeEnum;
  entityId: string;
  confirmSubscriptionMessage: string;
  confirmUnsubscriptionMessage: string;
  provideEmailMessage: string;
  provideEmailAgreementMessage: string;
  buttonSize?: 'small' | 'medium' | 'large';
  hideUnsubscribeButton?: boolean;
};

export const SubscribeButtons = ({
  type,
  entityId,
  userEmail,
  provideEmailMessage,
  provideEmailAgreementMessage,
  confirmSubscriptionMessage,
  confirmUnsubscriptionMessage,
  buttonSize = 'small',
  hideUnsubscribeButton = false,
}: Props) => {
  const {t} = useLocalization();
  const dispatch = useToolkitDispatch();
  const subscriptionStore = useSelector(selectSubscriptionsStore);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setSubscriptionEmail({email: userEmail || null}));
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (userEmail) {
      dispatch(checkSubscription({type, entityId}));
    }
  }, [dispatch, type, entityId, userEmail]);

  const setLoading = async (timer = 2000) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(() => resolve(true), timer));
    setIsLoading(false);
  };

  const onRemoveSubscription = () => {
    setLoading();
    dispatch(removeSubscription({type, entityId}));
  };
  const onCreateSubscription = () => {
    setLoading();
    dispatch(createSubscription({type, entityId}));
  };

  return (
    <>
      {subscriptionStore?.subscriptions?.[type][entityId] !== true && (
        <Button
          variant={isLoading ? 'outlined' : 'contained'}
          disabled={isLoading}
          size={buttonSize}
          onClick={() => onCreateSubscription()}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} thickness={2} /> : t('Subscribe For Future Drops')}
        </Button>
      )}
      {subscriptionStore?.subscriptions?.[type][entityId] === true && !hideUnsubscribeButton && (
        <Button
          color={isLoading ? 'default' : 'inherit'}
          variant="outlined"
          disabled={isLoading}
          size={buttonSize}
          onClick={() => onRemoveSubscription()}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} thickness={2} /> : t('Unsubscribe')}
        </Button>
      )}
      <ConfirmSubscribeModal type={type} entityId={entityId} text={confirmSubscriptionMessage} />
      <ConfirmUnsubscribeModal type={type} entityId={entityId} text={confirmUnsubscriptionMessage} />
      <AskEmailModal
        type={type}
        entityId={entityId}
        text={provideEmailMessage}
        agreementText={provideEmailAgreementMessage}
      />
    </>
  );
};
