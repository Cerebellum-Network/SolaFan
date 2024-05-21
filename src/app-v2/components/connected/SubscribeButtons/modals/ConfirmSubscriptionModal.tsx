import {Box, Button, Dialog, Typography} from '@material-ui/core';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {ReactComponent as CheckIcon} from '../../../../assets/svg/check.svg';
import {ReactComponent as CloseIcon} from '../../../../assets/svg/close.svg';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {useToolkitDispatch} from '../../../../redux/toolkit/store';
import {hideConfirmSubscribeModal, selectConfirmSubscribeModal} from '../../../../redux/toolkit/subscriptions';
import {SubscriptionTypeEnum} from '../../../../types/subscription';

interface ConfirmationModalProps {
  text: string;
  type: SubscriptionTypeEnum;
  entityId: string;
}

export const ConfirmSubscribeModal = ({text, type, entityId}: ConfirmationModalProps) => {
  const {t} = useLocalization();
  const modalInfo = useSelector(selectConfirmSubscribeModal);
  const dispatch = useToolkitDispatch();

  const onClose = useCallback(() => {
    dispatch(hideConfirmSubscribeModal());
  }, [dispatch]);

  return (
    <Dialog open={modalInfo?.showed === `${type}-${entityId}`} onClose={onClose}>
      <Box className="min-w-[300px] divide-y">
        <Box className="p-4 flex flex-row justify-between items-center">
          <Typography variant="subtitle1">{t('Subscribe for updates')}</Typography>
          <Box className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center" onClick={onClose}>
            <CloseIcon className="w-3 h-3" />
          </Box>
        </Box>
        <Box className="p-4 g-4 flex flex-col items-center gap-4">
          <CheckIcon className="w-6 h-6" />
          <Typography>{text}</Typography>
          <Button color="default" size="small" variant="outlined" onClick={onClose}>
            {t('Close')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
