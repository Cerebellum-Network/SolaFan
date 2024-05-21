import {Box, Button} from '@material-ui/core';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {useDdcParams} from '../../api/video/use-ddc-params';
import {useFeaturedSeries} from '../../api/video/use-featured-series';
import {useFeaturedVideos} from '../../api/video/use-featured-videos';
import {Url} from '../../branded-types/url';
import {Condition, ConditionsList, Defaults} from '../../components/shared/Conditions';
import {NftFilters} from '../../components/shared/NftFilters';
import {CuratedRowHeaderSkeloton, HomePageBannerSkeleton, NftsListSkeleton} from '../../components/shared/Skeletons';
import {VideoCollectionsListSkeleton} from '../../components/shared/Skeletons/VideoCollectionsListSkeleton';
import {SortByButton} from '../../components/shared/SortByButton';
import {
  getDdcCdnUrl,
  getSeriesIsLoading,
  getSeriesList,
  getVideosList,
  getVideosListIsLoading,
  State,
} from '../../redux/modules/videos/selectors';
import {SeriesCollection, VideoMetadata} from '../../redux/modules/videos/types';
import {GetStarted} from '../home/components/GetStarted';
import {FeaturedSeries} from './components/FeaturedSeries';
import {FeaturedVideosBanner} from './components/FeaturedVideos/FeaturedVideosBanner';
import {useStyles} from './styles';

type Props = {
  featuredVideos: VideoMetadata[];
  isLoadingVideos: boolean;
  cdnUrl: Url | null;
  series: SeriesCollection[];
  seriesIsLoading: boolean;
};

function VideoHomeComponent({featuredVideos, isLoadingVideos, cdnUrl, seriesIsLoading, series}: Props) {
  const styles = useStyles();
  const {t} = useTranslation();
  const rightFilterElement = useMemo(() => <SortByButton setSortingOrder={() => null} />, []);

  useFeaturedVideos();
  useDdcParams();
  useFeaturedSeries();

  return (
    <Box>
      <Box className={styles.bannerBox}>
        {isLoadingVideos || cdnUrl == null ? (
          <HomePageBannerSkeleton />
        ) : (
          <FeaturedVideosBanner entities={featuredVideos} />
        )}
      </Box>
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
            rightButton={rightFilterElement}
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

export const VideoHome = connect((state: State) => ({
  featuredVideos: getVideosList(state),
  cdnUrl: getDdcCdnUrl(state),
  isLoadingVideos: getVideosListIsLoading(state),
  series: getSeriesList(state),
  seriesIsLoading: getSeriesIsLoading(state),
}))(VideoHomeComponent);
