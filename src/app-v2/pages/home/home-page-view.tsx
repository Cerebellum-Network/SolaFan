import {ExhibitCardInterface, FullCreatorInterface} from '@cere/services-types';
import {Box, Button} from '@material-ui/core';
import {memo, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {HIDE_CREATORS_PAGE} from '../../../config/common';
import {BannerItem} from '../../api/home-page/types';
import {SubTitle, Title} from '../../components/primitives/Title';
import {Condition, ConditionsList} from '../../components/shared/Conditions';
import {NftFilters} from '../../components/shared/NftFilters';
import type {FilterParams} from '../../components/shared/NftFilters/types';
import {PageContainer} from '../../components/shared/PageContainer';
import {
  CreatorsRowSkeleton,
  CuratedRowHeaderSkeloton,
  ExhibitsRowSkeleton,
  HomePageBannerSkeleton,
  NftCollectiblesSkeleton,
  NftsListSkeleton,
} from '../../components/shared/Skeletons';
import {SortByButton} from '../../components/shared/SortByButton';
import {SortingOrder, SortingVariants} from '../../types/filters';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {Creators} from './components/Creators';
import {ExhibitsList} from './components/ExhibitsList';
import {FeaturedListings} from './components/FeaturedListings';
import {GetStarted} from './components/GetStarted';
import {HomePageBanner} from './components/HomePageBanner';
import {NftCollectibles} from './components/NftCollectibles';
import {ValueProposition} from './components/ValueProposition';
import {useStyles} from './styles';

type Props = {
  onGetStartedSellNfts: () => void;
  onGetStartedOpenProfile: () => void;
  loadPageData: () => void;
  isBannerLoading: boolean;
  bannerItems: Array<BannerItem & {link: string}>;
  isFeaturedListingsLoading: boolean;
  featuredNftsIds: string[];
  isExhibitsLoading: boolean;
  exhibits: ExhibitCardInterface[];
  isCreatorsLoading: boolean;
  creators: FullCreatorInterface[];
  isNftCollectiblesLoading: boolean;
  collectableNftsIds: string[];
};

export const HomePageView = memo(
  ({
    onGetStartedSellNfts,
    onGetStartedOpenProfile,
    loadPageData,
    isBannerLoading,
    bannerItems,
    isFeaturedListingsLoading,
    featuredNftsIds,
    isExhibitsLoading,
    exhibits,
    isCreatorsLoading,
    creators,
    isNftCollectiblesLoading,
    collectableNftsIds,
  }: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    useOnComponentRendered(loadPageData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onShareExhibit = useCallback((eventId: string) => {
      // TODO and remove comments for unused variable
    }, []);

    const onShowMoreClick = useCallback(() => {
      // TODO
    }, []);

    const [filterParams, setFilterParams] = useState<FilterParams>({});

    const setCreatorFilter = useCallback((creator: string) => setFilterParams((prev) => ({...prev, creator})), []);
    const setFromFilter = useCallback((from: string) => setFilterParams((prev) => ({...prev, from})), []);
    const setToFilter = useCallback((to: string) => setFilterParams((prev) => ({...prev, to})), []);
    const setDateFilter = useCallback((date: number) => setFilterParams((prev) => ({...prev, date})), []);

    const clearFilters = useCallback(() => setFilterParams({}), []);
    const onApplyFilters = useCallback(() => {
      // TODO
    }, []);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setSortingOrder = useCallback((variant: SortingVariants, order: SortingOrder) => {
      // TODO and remove comments for unused variable
    }, []);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleOpenNftInfo = useCallback((nftId: string) => {
      // TODO
    }, []);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleOpenExhibitInfo = useCallback((exhibitId: string) => {
      // TODO
    }, []);

    const rightFilterElement = useMemo(() => <SortByButton setSortingOrder={setSortingOrder} />, [setSortingOrder]);

    return (
      <PageContainer>
        <Box className={styles.bannerBox}>
          {isBannerLoading ? (
            <HomePageBannerSkeleton />
          ) : (
            <HomePageBanner
              entities={bannerItems}
              handleOpenNftInfo={handleOpenNftInfo}
              handleOpenExhibitInfo={handleOpenExhibitInfo}
            />
          )}
        </Box>
        <PageContainer>
          {isFeaturedListingsLoading ? (
            <>
              <CuratedRowHeaderSkeloton title={t('Featured listings')} />
              <NftsListSkeleton />
            </>
          ) : (
            <FeaturedListings featuredNftsIds={featuredNftsIds} />
          )}

          <Box className={styles.exhibitsBox}>
            <Title>{t('Exhibits')}</Title>
            <SubTitle>
              {t(
                'Indulge in hand-curated and exclusive artist events. Explore, participate, and bid on unforgettable experiences in DaVinci.',
              )}
            </SubTitle>
            <Box pt="24px">
              {isExhibitsLoading ? (
                <ExhibitsRowSkeleton />
              ) : (
                <ExhibitsList exhibits={exhibits} onShareExhibit={onShareExhibit} />
              )}
            </Box>
          </Box>
          <ConditionsList>
            <Condition condition={!HIDE_CREATORS_PAGE}>
              <Box className={styles.creatorsBox}>
                {isCreatorsLoading ? (
                  <>
                    <CuratedRowHeaderSkeloton
                      title={t('Creators')}
                      subTitle={t(
                        'Verified creators bringing transforming their best work in unique NFT experiences which are exclusively sold on DaVinci.',
                      )}
                    />
                    <CreatorsRowSkeleton />
                  </>
                ) : (
                  <Creators creators={creators} />
                )}
              </Box>
            </Condition>
          </ConditionsList>
          <Box className={styles.valuePropositionBox}>
            <ValueProposition />
          </Box>

          <Box className={styles.nftCollectiblesBox}>
            <NftFilters
              title={t('Collectibles')}
              subTitle={t('Exclusive and verified digital collectibles which unlock unseen experiences of creators')}
              hideFilters={isNftCollectiblesLoading || collectableNftsIds.length === 0}
              rightButton={rightFilterElement}
              creators={creators}
              filterParams={filterParams}
              setCreatorFilter={setCreatorFilter}
              setFromFilter={setFromFilter}
              setToFilter={setToFilter}
              setDateFilter={setDateFilter}
              clearFilters={clearFilters}
              applyFilters={onApplyFilters}
            />
            {isNftCollectiblesLoading ? <NftCollectiblesSkeleton /> : <NftCollectibles nftsIds={collectableNftsIds} />}

            <Box className={styles.showMoreBox}>
              <Button
                variant="contained"
                color="default"
                className={styles.showMoreButton}
                disabled={isNftCollectiblesLoading}
                onClick={onShowMoreClick}
              >
                {t('Show more NFTs')}
              </Button>
            </Box>
          </Box>

          <Box className={styles.getStartedBox}>
            <GetStarted onSellNfts={onGetStartedSellNfts} onOpenProfile={onGetStartedOpenProfile} />
          </Box>
        </PageContainer>
      </PageContainer>
    );
  },
);
