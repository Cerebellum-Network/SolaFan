import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {BannerTypes} from '../../api/home-page/types';
import {ROUTES} from '../../constants/routes';
import {
  ConnectWalletClickEvent,
  LoadHomePageDataCommand,
  SellNftsClickEvent,
} from '../../redux/modules/home-page/actions';
import {
  selectBannerItems,
  selectCollectableNftsIds,
  selectFeaturedCreators,
  selectFeaturedEvents,
  selectFeaturedNftsIds,
  selectHomePageLoadingState,
} from '../../redux/modules/home-page/selectors';
import {selectCurrentLocale} from '../../redux/modules/localization/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {HomePageView} from './home-page-view';

const mapStateToProps = (state: any) => {
  const locale = selectCurrentLocale(state);
  const loadingState = selectHomePageLoadingState(state);
  const bannerItems = selectBannerItems(state).map((item) => {
    let link = generatePath(ROUTES.NFT_PAGE, {locale, nftId: item.id});
    if (item.type === BannerTypes.Exhibit) {
      link = generatePath(ROUTES.EVENT, {locale, exhibitSlug: item?.slug});
    }
    return {
      ...item,
      link,
    };
  });

  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();

  return {
    isBannerLoading: loadingState.bannerLoading,
    isFeaturedListingsLoading: loadingState.featuredLoading,
    isNftCollectiblesLoading: loadingState.collectablesLoading,
    isExhibitsLoading: loadingState.eventsLoading,
    isCreatorsLoading: loadingState.creatorsLoading,
    collectableNftsIds: selectCollectableNftsIds(state),
    featuredNftsIds: selectFeaturedNftsIds(state),
    creators: selectFeaturedCreators(state),
    exhibits: selectFeaturedEvents(state),
    bannerItems,
    userWalletAddress: walletPublicKey || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadPageData: () => dispatch(LoadHomePageDataCommand.create()),
  onGetStartedSellNfts: () => dispatch(SellNftsClickEvent.create()),
  onGetStartedOpenProfile: () => dispatch(ConnectWalletClickEvent.create()),
});

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageView);

HomePage.displayName = 'HomePageV2';
