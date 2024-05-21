import {Box, Button, Dialog, Typography} from '@material-ui/core';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {ReactComponent as CloseIcon} from '../../../../assets/svg/close.svg';
import {ReactComponent as CancelIcon} from '../../../../assets/svg/ic-warning.svg';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {useToolkitDispatch} from '../../../../redux/toolkit/store';
import {hideConfirmUnsubscribeModal, selectConfirmUnsubscribeModal} from '../../../../redux/toolkit/subscriptions';
import {SubscriptionTypeEnum} from '../../../../types/subscription';

interface UnsubscribeModalProps {
  text: string;
  type: SubscriptionTypeEnum;
  entityId: string;
}

export const ConfirmUnsubscribeModal = ({text, type, entityId}: UnsubscribeModalProps) => {
  const {t} = useLocalization();
  const modalInfo = useSelector(selectConfirmUnsubscribeModal);
  const dispatch = useToolkitDispatch();

  const onClose = useCallback(() => {
    dispatch(hideConfirmUnsubscribeModal());
  }, [dispatch]);

  return (
    <Dialog open={modalInfo?.showed === `${type}-${entityId}`} onClose={onClose}>
      <Box className="min-w-[300px] divide-y">
        <Box className="p-4 flex flex-row justify-between items-center">
          <Typography variant="subtitle1">{t('Unsubscribe for updates')}</Typography>
          <Box className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center" onClick={onClose}>
            <CloseIcon className="w-3 h-3" />
          </Box>
        </Box>
        <Box className="p-4 g-4 flex flex-col items-center gap-4">
          <CancelIcon className="w-6 h-6" />
          <Typography>{text}</Typography>
          <Button color="default" size="small" variant="outlined" onClick={onClose}>
            {t('Close')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
