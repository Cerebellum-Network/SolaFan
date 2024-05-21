import {Button, Modal, Typography} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import * as EmailValidator from 'email-validator';
import {useState} from 'react';

import {GoogleAnalyticsId} from '../../../../../analytics-ids'; // TODO: change in the future, move to v2 folder
import analyticService, {AnalyticEventsEnum} from '../../../../../shared/services/analytic.service'; // TODO change in the future, move to v2 folder
import colors from '../../../../../styles/colors'; // TODO change in the future, move to v2 folder
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {SubscriptionTypeEnum} from '../../../../types/subscription';
import AuthInput from '../../../primitives/AuthInput';
import {Checkbox} from '../../../primitives/Checkbox';

interface SubscribeModalProps {
  onClick: (email: string, eventId: string, subscriptionType: SubscriptionTypeEnum, locale: string) => void;
  onClose: Function;
  locale: string;
  subscriptionType: SubscriptionTypeEnum;
  eventId: string;
  appTitle: string;
  email?: string;
}

const useStyles = makeStyles(() => ({
  label: {
    color: colors.lightGrey,
  },
  modalContent: {
    padding: '15px',
  },
}));

export const SubscribeModal = ({
  onClick,
  onClose,
  locale,
  subscriptionType,
  eventId,
  appTitle,
  email: emailProps,
}: SubscribeModalProps) => {
  const {t} = useLocalization();
  const [email, setEmail] = useState<string>(emailProps || '');
  const [error, setError] = useState<string>('');
  const [readTerms, setReadTerms] = useState<boolean>(false);

  const classes = useStyles();
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
    analyticService.track(AnalyticEventsEnum.INTERSTITIAL_SUBSCRIBE_SUBMIT);
    onClick(email, eventId, subscriptionType, locale);
  };

  return (
    <Modal
      open
      onClose={onClose}
      maxWidth="xs"
      contentClassName={classes.modalContent}
      headerContent={<Typography variant="h4">{t('Subscribe for updates')}</Typography>}
    >
      <Typography>
        {t('Provide your email to get the latest news, future drops and updates from the Artist.')}
      </Typography>

      <Box mt="20px">
        <AuthInput
          value={email}
          helperText={error}
          inputProps={{inputMode: 'email'}}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <Box display="flex" alignItems="flex-start" mt="15px">
          <Checkbox checked={readTerms} onChange={() => setReadTerms(!readTerms)} />

          <Typography variant="caption1" className={classes.label}>
            {t('I agree to receive important announcements, feature updates and offers from the Artist', {
              appTitle: appTitle,
            })}
          </Typography>
        </Box>
      </Box>
      <Box m="24px auto 0" width="100%" maxWidth="140px">
        <Button
          className={clsx(GoogleAnalyticsId.SubscribeBtn)}
          disabled={error || !email || !readTerms}
          color="primary"
          variant="contained"
          fullWidth
          onClick={onSubmit}
        >
          {t('Get updated')}
        </Button>
      </Box>
    </Modal>
  );
};
