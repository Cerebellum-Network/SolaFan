import {Condition, ConditionsList, Defaults} from 'app-v2/components/shared/Conditions';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {AppContainer} from './app-v2/components/connected/AppContainer';
import {ApplicationModalContainer} from './app-v2/components/connected/ApplicationModalContainer';
import {HistoryProvider} from './app-v2/components/connected/HistoryProvider';
import {PaymentHandlerConnected} from './app-v2/components/connected/PaymentHandler/PaymentHandler';
import {ErrorBoundary} from './app-v2/components/shared/ErrorBoundary';
import {ScrollRestoration} from './app-v2/components/shared/ScrollRestoration/ScrollRestoration';
import {WithSimpleLocalizedRedirection} from './app-v2/components/shared/WithSimpleLocalisedRedirection';
import {ROUTES} from './app-v2/constants/routes';
import {CompatibilityRedirect} from './app-v2/pages/compatibility-redirect';
import {CreatorPage} from './app-v2/pages/creator/creator-page';
import {CreatorsPage} from './app-v2/pages/creators/creators-page';
import {ExhibitPage} from './app-v2/pages/exhibit';
import {ExhibitsPage} from './app-v2/pages/exhibits/exhibits-page';
import {HomePage as HomePageV2} from './app-v2/pages/home/home-page';
import {InterstitialExhibitPage} from './app-v2/pages/interstitial-exhibit/interstitial-exhibit-page';
import {InterstitialNftPage} from './app-v2/pages/interstitial-nft/interstitial-nft-page';
import {MaintenancePage} from './app-v2/pages/maintenance';
import {MarketplacePage} from './app-v2/pages/marketplace';
import {NftMarketplacePage} from './app-v2/pages/nft-marketplace/nft-marketplace-page';
import {NotFoundPage} from './app-v2/pages/not-found';
import {NotificationsPage} from './app-v2/pages/notifications';
import {CollectorProfilePage, MyProfilePage} from './app-v2/pages/profile/profile-page';
import {ServiceCallback} from './app-v2/pages/service-callback/service-callback';
import {ThemeComponents} from './app-v2/pages/theme/ThemeComponents';
import {UserNftsPage} from './app-v2/pages/user-nfts';
import {VideoHome} from './app-v2/pages/video-home/video-home';
import {VideosPage} from './app-v2/pages/videos/videos-page';
import {WalletPage} from './app-v2/pages/wallet';
import {
  enableMarketplaceView,
  enableModernHomepage,
  enableVideoHome,
  HIDE_CREATORS_PAGE,
  HIDE_EVENTS_PAGE,
  HIDE_HOME_PAGE,
  HIDE_MARKETPLACE_PAGE,
  maintenanceMode,
  REACT_APP_HIDE_MY_COLLECTION_PAGE,
} from './config/common';

export const AppRouter = () => {
  if (maintenanceMode) {
    return (
      <Router>
        <MaintenancePage />
      </Router>
    );
  }

  return (
    <Router>
      <ScrollRestoration storageKey={'marketplace-scroll-position'} />
      <HistoryProvider />
      <ApplicationModalContainer />
      <ErrorBoundary>
        <PaymentHandlerConnected>
          <Switch>
            {process.env.REACT_APP_ENV === 'dev' && (
              <Route path="/components">
                <ThemeComponents />
              </Route>
            )}
            {/*TODO it here for backward compatibility, remove after change successURL in interstitial page */}
            <Route path="/:locale/home/artist/:artistId/event/:exhibitSlug">
              <ExhibitPage />
            </Route>
            <Route path={ROUTES.NFT_PAGE} exact>
              <InterstitialNftPage />
            </Route>
            {!HIDE_MARKETPLACE_PAGE && enableMarketplaceView() && (
              <Route path={ROUTES.NFT_MARKETPLACE} exact>
                <NftMarketplacePage />
              </Route>
            )}
            <Route path="/:locale/home/event/:exhibitSlug">
              <InterstitialExhibitPage />
            </Route>
            <Route path="/:locale/home/creator/:artistId">
              <CreatorPage />
            </Route>
            <Route path="/:locale/home/user/wallet">
              <WithSimpleLocalizedRedirection>
                <WalletPage />
              </WithSimpleLocalizedRedirection>
            </Route>
            {!REACT_APP_HIDE_MY_COLLECTION_PAGE && (
              <Route path="/:locale/home/user/nfts">
                <WithSimpleLocalizedRedirection>
                  <UserNftsPage />
                </WithSimpleLocalizedRedirection>
              </Route>
            )}

            <Route path={ROUTES.MY_PROFILE} exact>
              <WithSimpleLocalizedRedirection>
                <MyProfilePage />
              </WithSimpleLocalizedRedirection>
            </Route>

            <Route path={ROUTES.COLLECTOR_PROFILE}>
              <WithSimpleLocalizedRedirection>
                <CollectorProfilePage />
              </WithSimpleLocalizedRedirection>
            </Route>

            {!HIDE_CREATORS_PAGE && (
              <Route exact path="/:locale/creators">
                <WithSimpleLocalizedRedirection>
                  <AppContainer>
                    <CreatorsPage />
                  </AppContainer>
                </WithSimpleLocalizedRedirection>
              </Route>
            )}

            {!HIDE_HOME_PAGE && (
              <Route exact path="/:locale/home">
                <WithSimpleLocalizedRedirection>
                  <ConditionsList>
                    <Condition condition={enableVideoHome()}>
                      <AppContainer>
                        <VideoHome />
                      </AppContainer>
                    </Condition>
                    <Defaults>
                      <AppContainer>
                        <HomePageV2 />
                      </AppContainer>
                    </Defaults>
                  </ConditionsList>
                </WithSimpleLocalizedRedirection>
              </Route>
            )}
            {!HIDE_EVENTS_PAGE && (
              <Route exact path="/:locale/events">
                <WithSimpleLocalizedRedirection>
                  <ExhibitsPage />
                </WithSimpleLocalizedRedirection>
              </Route>
            )}
            {enableModernHomepage() && enableVideoHome() && (
              <Route exact path="/:locale/videos">
                <AppContainer>
                  <VideosPage />
                </AppContainer>
              </Route>
            )}
            {!HIDE_HOME_PAGE && (
              <Route exact path="/:locale/home">
                <WithSimpleLocalizedRedirection>
                  <ExhibitsPage />
                </WithSimpleLocalizedRedirection>
              </Route>
            )}
            {!HIDE_MARKETPLACE_PAGE && enableMarketplaceView() && (
              <Route path="/:locale/marketplace">
                <MarketplacePage />
              </Route>
            )}
            <Route path="/:locale/service/callback">
              <WithSimpleLocalizedRedirection>
                <ServiceCallback />
              </WithSimpleLocalizedRedirection>
            </Route>
            <Route path="/:locale/notifications">
              <WithSimpleLocalizedRedirection>
                <NotificationsPage />
              </WithSimpleLocalizedRedirection>
            </Route>
            <Route path="/:locale/not-found">
              <WithSimpleLocalizedRedirection>
                <NotFoundPage />
              </WithSimpleLocalizedRedirection>
            </Route>
            <Route>
              <CompatibilityRedirect />
            </Route>
          </Switch>
        </PaymentHandlerConnected>
      </ErrorBoundary>
    </Router>
  );
};

export default Router;
