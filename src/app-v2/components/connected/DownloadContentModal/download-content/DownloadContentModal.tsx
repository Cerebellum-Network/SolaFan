import {NftCardInterface} from '@cere/services-types/dist/types';
import {Dialog} from '@material-ui/core';

import {UseDisclosureReturn} from '../../../../../shared/hooks/use-disclosure';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {PurchaseModalBox} from '../../../shared/Modals/PurchaseModalBox';
import {ListContent} from '../list-content/ListContent';

export interface DownloadContentModalProps extends UseDisclosureReturn {
  nft?: NftCardInterface;
}

export const DownloadContentModal = ({nft, isOpen, onClose}: DownloadContentModalProps) => {
  const {t} = useLocalization();
  const collectionAddress = nft?.collectionAddress;
  const nftId = Number(nft?.address);

  if (!collectionAddress || !nftId) {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <div>Invalid NFT</div>
      </Dialog>
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <PurchaseModalBox
      title={t('View and Download Content')}
      onClose={onClose}
      subTitle={t('View and download content associated with this token')}
      dialogStyles={{maxWidth: 'xl', fullWidth: true}}
    >
      <ListContent collectionAddress={collectionAddress} nftId={nftId} />
    </PurchaseModalBox>
  );
};
