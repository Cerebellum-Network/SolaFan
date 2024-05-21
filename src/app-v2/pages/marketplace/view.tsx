import {Box, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {memo, useCallback, useMemo, useState} from 'react';

import {AppContainer} from '../../components/connected/AppContainer';
import {NftFilters} from '../../components/shared/NftFilters';
import type {FilterParams} from '../../components/shared/NftFilters/types';
import {PageContainer} from '../../components/shared/PageContainer';
import {CuratedRowHeaderSkeloton, NftCollectiblesSkeleton, NftsListSkeleton} from '../../components/shared/Skeletons';
import {SortByButton} from '../../components/shared/SortByButton';
import {useThemeBreakpoints} from '../../styles/useThemeBreakpoints';
import {SortingOrder, SortingVariants} from '../../types/filters';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {EmptyNftCollectibles} from './components/EmptyNftCollectibles';
import {NftCollectibles} from './components/NftCollectibles';
import {TrendingListings} from './components/TrendingListings';
import {useStyles} from './styles';

type Props = {
  featuredNftsLoading: boolean;
  featuredNftIds: string[];
  collectableNftsLoading: boolean;
  collectableNftIds: string[];
  loadData: () => void;
  userWalletAddress: string | null;
};

export const MarketplacePageView = memo(
  ({
    featuredNftsLoading,
    featuredNftIds,
    collectableNftsLoading,
    collectableNftIds,
    loadData,
    userWalletAddress,
  }: Props) => {
    const {t} = useLocalization();
    const styles = useStyles();

    useOnComponentRendered(loadData);

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

    const rightFilterElement = useMemo(() => <SortByButton setSortingOrder={setSortingOrder} />, [setSortingOrder]);
    const {isDesktop} = useThemeBreakpoints();

    const hideFilters = true || featuredNftsLoading;

    return (
      <AppContainer>
        <PageContainer>
          <Box maxWidth="1000px" width="100%" margin="0 auto" px={isDesktop ? 0 : 2}>
            <Box className={styles.titlesBox}>
              <Typography variant="h1">{t('Marketplace')}</Typography>
            </Box>

            <Box className={styles.trendingListingsBox}>
              {featuredNftsLoading ? (
                <>
                  <CuratedRowHeaderSkeloton title={t('Trending listings')} />
                  <NftsListSkeleton />
                </>
              ) : featuredNftIds.length === 0 ? (
                <></>
              ) : (
                <TrendingListings ids={featuredNftIds} userWalletAddress={userWalletAddress} />
              )}
            </Box>

            <Box className={styles.nftCollectiblesBox}>
              <NftFilters
                title={t('Collectibles')}
                hideFilters={hideFilters}
                rightButton={rightFilterElement}
                creators={[]}
                filterParams={filterParams}
                setCreatorFilter={setCreatorFilter}
                setFromFilter={setFromFilter}
                setToFilter={setToFilter}
                setDateFilter={setDateFilter}
                clearFilters={clearFilters}
                applyFilters={onApplyFilters}
              />

              {collectableNftsLoading ? (
                <NftCollectiblesSkeleton xs={12} md={6} lg={4} />
              ) : collectableNftIds.length ? (
                <NftCollectibles ids={collectableNftIds} />
              ) : (
                <EmptyNftCollectibles />
              )}
            </Box>
          </Box>
        </PageContainer>
      </AppContainer>
    );
  },
);
