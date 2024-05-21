import {
  appConfigApi,
  auctionsApi,
  collectorsApi,
  creatorApi,
  creatorsApi,
  eventsApi,
  exhibitApi,
  exhibitsApi,
  homePageApi,
  nftsApi,
  notificationsApi,
  ordersApi,
  overlayApi,
  transfersApi,
  userNftsApi,
} from '../api';
import {authApi} from '../api/auth';
import {paymentApi} from '../api/payment';
import {walletsApi} from '../api/wallet';
import {auctionSCApi} from '../models/auction';
import {AuctionService} from '../models/auction/AuctionService';
import {authService, userDataStorage} from '../models/auth';
import {walletsBalanceService} from '../models/balance';
import {localizationService} from '../models/localization';
import {sellNftApi} from '../models/selling';
import {walletConnectionService} from '../models/wallet';
import {AppStore} from './AppStore';
import {createAddToCalendarModule} from './modules/add-to-calendar';
import {createAppConfigModule} from './modules/app-config';
import {createAuctionsModule} from './modules/auctions';
import {createAuthModule} from './modules/auth';
import {createProfilePageModule} from './modules/collectors';
import {createCreatorDetailsModule} from './modules/creator-page';
import {createCreatorsModule} from './modules/creators';
import {createExhibitPageModule} from './modules/exhbit-page';
import {createExhibitsModule} from './modules/exhibits';
import {createExhibitsPageModule} from './modules/exhibits-page';
import {createHomePageModule} from './modules/home-page';
import {createLoaderModule} from './modules/loader';
import {createLocalizationModule} from './modules/localization';
import {createMarketplaceModule} from './modules/marketplace';
import {createModalsModule} from './modules/modals';
import {createNavigationModule} from './modules/navigation';
import {createNftDetailsPageModule} from './modules/nft-page';
import {createNftsModule} from './modules/nfts';
import {createNftsMapModule} from './modules/nfts-map';
import {createNotificationsModule} from './modules/notifications';
import {createOverlayModule} from './modules/overlay-landscape';
import {createPurchaseModule} from './modules/purchase';
import {createSellingModule} from './modules/selling';
import {createUserNftsPageModule} from './modules/user-nfts-page';
import {videoModule} from './modules/videos/module';
import {createUserWalletsModule} from './modules/wallets';

const appStore = new AppStore(process.env.NODE_ENV === 'development');

const appConfigNodule = createAppConfigModule(appConfigApi);
const authModule = createAuthModule(walletsApi, authApi, authService, userDataStorage, walletConnectionService);
const navigationModule = createNavigationModule();
const walletsModule = createUserWalletsModule(walletsApi, walletConnectionService, walletsBalanceService);
const nftsModule = createNftsModule(nftsApi);
const purchaseModule = createPurchaseModule(nftsApi, paymentApi, userDataStorage);
const sellingModule = createSellingModule(nftsApi, sellNftApi);
const auctionModule = createAuctionsModule(auctionsApi, auctionSCApi, new AuctionService());
const modalsModule = createModalsModule();
const localizationModule = createLocalizationModule(localizationService);
const creatorsModule = createCreatorsModule(creatorsApi);

const homePageModule = createHomePageModule(homePageApi, creatorsApi, eventsApi);
const marketplaceModule = createMarketplaceModule(nftsApi);
const exhibitsPageModule = createExhibitsPageModule(exhibitsApi);
const userNftsPageModule = createUserNftsPageModule(userNftsApi);
const exhibitPageModule = createExhibitPageModule(exhibitApi);
const addToCalendar = createAddToCalendarModule();
const exhibitsModule = createExhibitsModule(exhibitApi);
const overlay = createOverlayModule(overlayApi);
const nftDetailsPageModule = createNftDetailsPageModule(nftsApi, creatorsApi, ordersApi, transfersApi);
const creatorDetailsPageModule = createCreatorDetailsModule(creatorApi, creatorsApi, nftsApi);
const nftsMapModule = createNftsMapModule();
const profilePageModule = createProfilePageModule(collectorsApi);
const loaderModule = createLoaderModule();
const notificationsModule = createNotificationsModule(notificationsApi);

appStore.addModule(appConfigNodule);
appStore.addModule(localizationModule);
appStore.addModule(navigationModule);
appStore.addModule(modalsModule);
appStore.addModule(authModule);
appStore.addModule(walletsModule);
appStore.addModule(nftsModule);
appStore.addModule(purchaseModule);
appStore.addModule(sellingModule);
appStore.addModule(auctionModule);
appStore.addModule(creatorsModule);
appStore.addModule(homePageModule);
appStore.addModule(marketplaceModule);
appStore.addModule(exhibitPageModule);
appStore.addModule(nftDetailsPageModule);
appStore.addModule(creatorDetailsPageModule);
appStore.addModule(videoModule);
appStore.addModule(exhibitsPageModule);
appStore.addModule(userNftsPageModule);
appStore.addModule(addToCalendar);
appStore.addModule(exhibitsModule);
appStore.addModule(overlay);
appStore.addModule(nftsMapModule);
appStore.addModule(profilePageModule);
appStore.addModule(loaderModule);
appStore.addModule(notificationsModule);
appStore.init();

export const oldStore = appStore.store;
