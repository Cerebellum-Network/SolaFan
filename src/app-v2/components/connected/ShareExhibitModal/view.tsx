import {useLocalization} from '../../../hooks/use-locale.hook';
import Share from '../../shared/Share';
import {getShareUrl} from '../../shared/Share/utils/get-share-url';

type ShareNftModalProps = {
  locale: string;
  appTitle: string;
  exhibitId: string;
  exhibitTitle: string;
  exhibitDescription: string;
  exhibitImage: string;
  onClose: () => void;
};

export const PlainShareExhibitModal = ({
  locale,
  appTitle,
  exhibitId,
  exhibitTitle,
  exhibitDescription,
  exhibitImage,
  onClose,
}: ShareNftModalProps) => {
  const {t} = useLocalization();
  return (
    <Share
      appTitle={appTitle}
      title={t('Share exhibit')}
      description={exhibitDescription}
      imgSrc={exhibitImage}
      onClose={onClose}
      url={getShareUrl(`/${locale}/home/exhibit/${exhibitId}`, exhibitTitle, exhibitDescription, exhibitImage)}
    />
  );
};
