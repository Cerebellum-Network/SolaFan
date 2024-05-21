import {Box, Button, Dialog, Typography} from '@material-ui/core';
import * as EmailValidator from 'email-validator';
import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import analyticService, {AnalyticEventsEnum} from '../../../../../shared/services/analytic.service';
import {ReactComponent as CloseIcon} from '../../../../assets/svg/close.svg';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {useToolkitDispatch} from '../../../../redux/toolkit/store';
import {
  createSubscription,
  hideAskEmailModal,
  selectSubscriptionsStore,
  setSubscriptionEmail,
} from '../../../../redux/toolkit/subscriptions';
import {SubscriptionTypeEnum} from '../../../../types/subscription';
import AuthInput from '../../../primitives/AuthInput';
import {Checkbox} from '../../../primitives/Checkbox';

interface AskEmailProps {
  text: string;
  agreementText: string;
  type: SubscriptionTypeEnum;
  entityId: string;
}

export const AskEmailModal = ({text, agreementText, type, entityId}: AskEmailProps) => {
  const {t} = useLocalization();
  const subscriptionStore = useSelector(selectSubscriptionsStore);
  const dispatch = useToolkitDispatch();
  const [email, setEmail] = useState<string | null>(subscriptionStore?.email);
  const [error, setError] = useState<string>('');
  const [readTerms, setReadTerms] = useState<boolean>(false);

  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onBlur = () => {
    if (!email || !EmailValidator.validate(email)) {
      setError(t('Please enter a valid email address'));
    }
  };

  const onFocus = () => {
    analyticService.track(AnalyticEventsEnum.INTERSTITIAL_SUBSCRIBE_EMAIL_FOCUSED);
    setError('');
  };

  const onSubmit = async () => {
    dispatch(setSubscriptionEmail({email}));
    dispatch(createSubscription({type, entityId}));
    onClose();
  };

  const onClose = useCallback(() => {
    dispatch(hideAskEmailModal());
  }, [dispatch]);

  return (
    <Dialog
      open={subscriptionStore?.askEmailModal?.showed === `${type}-${entityId}`}
      className="min-w-[300px]"
      onClose={onClose}
    >
      <Box className="divide-y">
        <Box className="p-4 flex flex-row justify-between items-center">
          <Typography variant="subtitle1">{t('Subscribe for updates')}</Typography>
          <Box className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center" onClick={onClose}>
            <CloseIcon className="w-3 h-3" />
          </Box>
        </Box>
        <Box className="p-4 flex flex-col gap-4">
          <Typography>{text}</Typography>
          <AuthInput
            value={email || ''}
            helperText={error}
            inputProps={{inputMode: 'email'}}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          <Box className="flex flex-row">
            <Checkbox checked={readTerms} onChange={() => setReadTerms(!readTerms)} />

            <Typography variant="caption">{agreementText}</Typography>
          </Box>
          <Box className="flex flex-row justify-center">
            <Button
              disabled={!!error || !email || !readTerms}
              color="primary"
              variant="contained"
              size="small"
              onClick={onSubmit}
            >
              {t('Get updated')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
