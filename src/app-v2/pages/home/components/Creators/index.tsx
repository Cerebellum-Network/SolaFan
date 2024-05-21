import {FullCreatorInterface} from '@cere/services-types';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {CuratedRow} from '../../../../components/shared/CuratedRow';
import {ROUTES} from '../../../../constants/routes';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import {CreatorCard} from './CreatorCard';

type Props = {
  creators: FullCreatorInterface[];
};

export const Creators = memo(({creators}: Props) => {
  const {t, i18n} = useTranslation();
  const {isDesktop, isMobile} = useThemeBreakpoints();

  return (
    <CuratedRow
      title={t('Creators')}
      subTitle={t(
        'Verified creators bringing transforming their best work in unique NFT experiences which are exclusively sold on DaVinci.',
      )}
      slidesPerView={isDesktop ? 3 : isMobile ? 1 : 2}
    >
      {creators.map((creator) => (
        <CreatorCard
          key={creator.id}
          link={generatePath(ROUTES.CREATOR, {locale: i18n.language, artistId: creator.id})}
          creatorName={creator.name}
          creatorAbout={creator.about}
          creatorAvatar={creator.avatar.url}
          desktopBackgroundImage={creator.desktopBackgroundImage}
          tabletBackgroundImage={creator.tabletBackgroundImage}
          mobileBackgroundImage={creator.mobileBackgroundImage}
        />
      ))}
    </CuratedRow>
  );
});
