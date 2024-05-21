import {Box, Button} from '@material-ui/core';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {useDdcParams} from '../../api/video/use-ddc-params';
import {useFeaturedSeries} from '../../api/video/use-featured-series';
import {Url} from '../../branded-types/url';
import {Condition, ConditionsList, Defaults} from '../../components/shared/Conditions';
import {NftFilters} from '../../components/shared/NftFilters';
import {CuratedRowHeaderSkeloton, NftsListSkeleton} from '../../components/shared/Skeletons';
import {VideoCollectionsListSkeleton} from '../../components/shared/Skeletons/VideoCollectionsListSkeleton';
import {SortByButton} from '../../components/shared/SortByButton';
import {getDdcCdnUrl, getSeriesIsLoading, getSeriesList, State} from '../../redux/modules/videos/selectors';
import {SeriesCollection} from '../../redux/modules/videos/types';
import {GetStarted} from '../home/components/GetStarted';
import {FeaturedSeries} from '../video-home/components/FeaturedSeries';
import {useStyles} from './styles';

type Props = {
  cdnUrl: Url | null;
  series: SeriesCollection[];
  seriesIsLoading: boolean;
};

function VideosComponent({series, seriesIsLoading}: Props) {
  const {t} = useTranslation();
  const styles = useStyles();

  useDdcParams();
  useFeaturedSeries();

  return (
    <Box mt={4}>
      <PageContainer>
        <CuratedRowHeaderSkeloton showButtons={series.length === 0} title={t('Watch movies')} />
        <ConditionsList>
          <Condition condition={seriesIsLoading || series.length === 0}>
            <VideoCollectionsListSkeleton />
          </Condition>
          <Defaults>
            <FeaturedSeries series={series} />
          </Defaults>
        </ConditionsList>
        <Box className={styles.nftCollectiblesBox}>
          <NftFilters
            title={t('Collectibles')}
            subTitle={t('Exclusive and verified digital collectibles which unlock unseen experiences of creators')}
            hideFilters={false}
            rightButton={<SortByButton setSortingOrder={() => null} />}
            creators={[]}
            filterParams={{}}
            setCreatorFilter={() => null}
            setFromFilter={() => null}
            setToFilter={() => null}
            setDateFilter={() => null}
            clearFilters={() => null}
            applyFilters={() => null}
          />
          <NftsListSkeleton />
          <Box className={styles.showMoreBox}>
            <Button
              variant="contained"
              color="default"
              className={styles.showMoreButton}
              disabled={true}
              onClick={() => null}
            >
              {t('Show more NFTs')}
            </Button>
          </Box>
        </Box>
        <Box className={styles.getStartedBox}>
          <GetStarted onSellNfts={() => null} onOpenProfile={() => null} />
        </Box>
      </PageContainer>
    </Box>
  );
}

export const VideosPage = connect((state: State) => ({
  series: getSeriesList(state),
  cdnUrl: getDdcCdnUrl(state),
  seriesIsLoading: getSeriesIsLoading(state),
}))(VideosComponent);
