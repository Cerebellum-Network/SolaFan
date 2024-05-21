import {generatePath} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import Share from '../../shared/Share';
import {getShareUrl} from '../../shared/Share/utils/get-share-url';

type ShareNftModalProps = {
  locale: string;
  appTitle: string;
  nftId: string;
  nftTitle?: string;
  nftDescription?: string;
  nftImage?: string;
  onClose: () => void;
};

export const PlainShareNftModal = ({
  locale,
  appTitle,
  nftId,
  nftTitle,
  nftDescription = '',
  nftImage = '',
  onClose,
}: ShareNftModalProps) => {
  const {t} = useLocalization();

  return nftTitle == null ? null : (
    <Share
      appTitle={appTitle}
      title={t('Share NFT')}
      description={nftDescription}
      imgSrc={nftImage}
      onClose={onClose}
      url={getShareUrl(generatePath(ROUTES.NFT_PAGE, {nftId, locale}), nftTitle, nftDescription, nftImage)}
    />
  );
};
