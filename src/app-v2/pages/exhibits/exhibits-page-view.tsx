import {ExhibitionStatus} from '@cere/services-types';
import {Box, Button} from '@material-ui/core';
import {useEffect, useMemo} from 'react';

import {AVAILABLE_LANGUAGES} from '../../../config/common';
import {CmsSeo} from '../../api/exhibits/types';
import {AppContainer} from '../../components/connected/AppContainer';
import {SubTitle} from '../../components/primitives/Title';
import {ChipsFilter} from '../../components/shared/ChipsFilter/chips-filter';
import {PageContainerV2} from '../../components/shared/PageContainerV2/PageContainerV2';
import {AppMetaTags} from '../../components/shared/SeoHeaders/seo-headers.component';
import {ExhibitsRowSkeleton} from '../../components/shared/Skeletons';
import {useLocalization} from '../../hooks/use-locale.hook';
import {CmsExhibit} from '../../types/exhibit';
import {ExhibitsList} from './components/ExhibitsList/ExhibitsList';
import {useStyles} from './styles';

type Props = {
  hideShowMoreButton: boolean;
  isLoadingExhibits: boolean;
  exhibits: CmsExhibit[];
  loadExhibits: () => void;
  loadExhibitsSeo: () => void;
  exhibitsFilter: ExhibitionStatus;
  setExhibitsFilter: (value: ExhibitionStatus | null) => void;
  exhibitsSeo: CmsSeo;
  onShareClick: (exhibitId: string) => void;
};

export const ExhibitsPageView = ({
  hideShowMoreButton,
  isLoadingExhibits,
  exhibits,
  exhibitsFilter,
  setExhibitsFilter,
  loadExhibits,
  loadExhibitsSeo,
  exhibitsSeo,
  onShareClick,
}: Props) => {
  const {t} = useLocalization();
  const styles = useStyles();

  useEffect(() => {
    loadExhibitsSeo();
    loadExhibits();
  }, [loadExhibits, loadExhibitsSeo]);

  const filterOptions = useMemo(
    () => [
      {value: ExhibitionStatus.NOT_STARTED, label: t('Upcoming')},
      {value: ExhibitionStatus.STARTED, label: t('Unlocked')},
      {value: ExhibitionStatus.FINISHED, label: t('Past')},
    ],
    [t],
  );

  const localizations = AVAILABLE_LANGUAGES().map((language) => ({
    locale: language,
    link: `/${language}/events`,
  }));

  return (
    <AppContainer>
      <AppMetaTags
        title={exhibitsSeo?.seoTitle || t('Davinci - NFT Experience & Marketplace Platform')}
        description={
          exhibitsSeo?.seoDescription ||
          t(
            'Innovative NFT Experience & Marketplace Platform - World-class artists, hyper-personalized NFT experiences, and decentralized ownership',
          )
        }
        canonical={exhibitsSeo?.seoCanonical}
        image={exhibitsSeo?.seoImage?.url}
        localizations={localizations}
      />
      <PageContainerV2>
        <div className="pt-8 mb-6 w-3/4">
          <h1 className="text-[28px] font-bold mb-1">{t('Events')}</h1>
          <SubTitle clipped={false}>
            {t(
              'Indulge in hand-curated and exclusive artist events. Explore, participate, and bid on unforgettable experiences in DaVinci.',
            )}
          </SubTitle>
        </div>
        <div className="pb-6">
          <ChipsFilter options={filterOptions} filter={exhibitsFilter} setFilter={setExhibitsFilter} />
        </div>
        <Box>
          {isLoadingExhibits ? (
            <ExhibitsRowSkeleton />
          ) : (
            <ExhibitsList exhibits={exhibits} onShareClick={onShareClick} />
          )}
        </Box>

        {!hideShowMoreButton && (
          <Box className={styles.showMoreBox}>
            <Button variant="contained" color="default" className={styles.showMoreButton} disabled={isLoadingExhibits}>
              {t('Show more NFTs')}
            </Button>
          </Box>
        )}
      </PageContainerV2>
    </AppContainer>
  );
};
