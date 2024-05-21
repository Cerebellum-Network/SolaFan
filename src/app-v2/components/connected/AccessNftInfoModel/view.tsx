import {Modal} from '@cere/rxb-template-ui-kit';

import {AccessNftInfoModal} from '../../shared/Modals/AccessNftInfoModal/AccessNftInfoModal';

export type AccessNftInfoModalProps = {
  onClose: () => void;
  appTitle: string;
  accessTokenType: boolean;
  title: string;
};
export const PlainAccessNftInfoModal = ({appTitle, onClose, accessTokenType, title}: AccessNftInfoModalProps) => {
  return (
    <Modal open onClose={onClose} title={title} maxWidth="sm">
      <AccessNftInfoModal handleButtonClick={onClose} appTitle={appTitle} accessTokenType={accessTokenType} />
    </Modal>
  );
};
