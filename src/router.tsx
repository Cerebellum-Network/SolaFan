import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {ApplicationModalContainer} from './app-v2/components/connected/ApplicationModalContainer';
import {HistoryProvider} from './app-v2/components/connected/HistoryProvider';
import {PaymentHandlerConnected} from './app-v2/components/connected/PaymentHandler/PaymentHandler';
import {ErrorBoundary} from './app-v2/components/shared/ErrorBoundary';
import {ScrollRestoration} from './app-v2/components/shared/ScrollRestoration/ScrollRestoration';
import {WithSimpleLocalizedRedirection} from './app-v2/components/shared/WithSimpleLocalisedRedirection';
import {ROUTES} from './app-v2/constants/routes';
import {CompatibilityRedirect} from './app-v2/pages/compatibility-redirect';
import {CreatorPage} from './app-v2/pages/creator/creator-page';
import {InterstitialExhibitPage} from './app-v2/pages/interstitial-exhibit/interstitial-exhibit-page';
import {InterstitialNftPage} from './app-v2/pages/interstitial-nft/interstitial-nft-page';
import {MaintenancePage} from './app-v2/pages/maintenance';
import {NotFoundPage} from './app-v2/pages/not-found';
import {MyProfilePage} from './app-v2/pages/profile/profile-page';
import {ServiceCallback} from './app-v2/pages/service-callback/service-callback';
import {ThemeComponents} from './app-v2/pages/theme/ThemeComponents';
import {
  maintenanceMode,
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

            <Route path={ROUTES.NFT_PAGE} exact>
              <InterstitialNftPage />
            </Route>
            <Route path="/:locale/home/event/:exhibitSlug">
              <InterstitialExhibitPage />
            </Route>
            <Route path="/:locale/home/creator/:artistId">
              <CreatorPage />
            </Route>

            <Route path={ROUTES.MY_PROFILE} exact>
              <WithSimpleLocalizedRedirection>
                <MyProfilePage />
              </WithSimpleLocalizedRedirection>
            </Route>

            <Route path="/:locale/service/callback">
              <WithSimpleLocalizedRedirection>
                <ServiceCallback />
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
