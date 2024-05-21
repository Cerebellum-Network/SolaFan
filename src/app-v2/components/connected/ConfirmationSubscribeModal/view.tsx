import {useLocalization} from '../../../hooks/use-locale.hook';
import {ConfirmationModalContent} from '../../shared/ConfirmationModalContent';
import {SimpleModal} from '../../shared/Modals/SimpleModal';

export type SubscribeModalProps = {
  onClose: () => void;
};

export const PlainConfirmationSubscribeModal = ({onClose}: SubscribeModalProps) => {
  const {t} = useLocalization();
  return (
    <SimpleModal onClose={onClose} open title={t('Subscribe for updates')}>
      <ConfirmationModalContent onClick={onClose} />
    </SimpleModal>
  );
};
