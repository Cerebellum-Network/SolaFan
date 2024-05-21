import {UsersNftCardInterface} from '../../../types/nft';
import {DownloadContentModal as Modal} from './download-content/DownloadContentModal';

type DownloadContentModalProps = {
  nft?: UsersNftCardInterface;
  onClose: () => void;
  onToggle: () => void;
};
export const DownloadContentModal = ({nft, onClose, onToggle}: DownloadContentModalProps) => {
  return <Modal isOpen={true} nft={nft} onClose={onClose} onToggle={onToggle} onOpen={() => {}} />;
};
