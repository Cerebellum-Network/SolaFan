import {ApplicationEnum, Deployment} from '@cere/freeport-sdk';

import {getTenantId, getTenantParams} from '../shared/services/tenant-utils';

// global
export const POPUP_TIMEOUT_BEFORE_CLOSE = 5000;
export const BALANCE_UPDATE_DELAY_TIMEOUT = 60000;
export const AUCTION_UPDATE_DELAY_TIMEOUT = 5000;
export const DELAY_BETWEEN_FREEPORT_AND_CMS = 50000;
export const maintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';
export const ENV = process.env.REACT_APP_ENV!;
export const CONTRACTS_DEPLOYMENT = (ENV ?? 'dev') as Deployment;
export const DEFAULT_LANGUAGE = 'en';
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const HTTP_PROVIDER_URL = process.env.REACT_APP_HTTP_PROVIDER_URL!; // required
export const GAS_LIMIT = Number(process.env.REACT_APP_GAS_LIMIT);
export const GAS_PRICE = Number(process.env.REACT_APP_GAS_PRICE);
export const TOKEN_DECIMALS_POW = Number(process.env.REACT_APP_TOKEN_DECIMALS_POW);
export const BICONOMY_API_KEY = process.env.REACT_APP_BICONOMY_API_KEY;
export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID); // required
export const DEPLOYMENT = String(process.env.REACT_APP_DEPLOYMENT); // required
export const CMS_PROXY_URL = process.env.REACT_APP_CMS_PROXY_URL!; // required
export const PAYMENT_SERVICE_API_URL = process.env.REACT_APP_PAYMENT_SERVICE_API_URL;
export const DAVINCI_API_URL = process.env.REACT_APP_DAVINCI_API_URL;
export const NOTIFICATION_SERVICE_API_URL = process.env.REACT_APP_NOTIFICATION_SERVICE_API_URL;
export const FACEBOOK_PIXEL_ID = process.env.REACT_APP_FACEBOOK_PIXEL_ID;
export const WEBSOCKET_SERVICE_URL = process.env.REACT_APP_WEBSOCKET_SERVICE_URL;
export const BUY_ONLY_ONE_NFT_AT_TIME = process.env.REACT_APP_BUY_ONLY_ONE_NFT_AT_TIME === 'true';
export const FREEPORT_VIDEO_API = process.env.REACT_APP_FREEPORT_VIDEO_API
  ? new URL(process.env.REACT_APP_FREEPORT_VIDEO_API).href
  : '';

// tenant specific
export const enableVideoHome = () => Number(localStorage.video) === 1;
export const enableAppV2 = () => getTenantParams().enableAppV2 === 'true';
export const enableMarketplaceView = () => getTenantParams().enableMarketplaceView === 'true';
export const enableFiatDepositPage = () => getTenantParams().enableFiatDepositPage === 'true';
export const enableModernHomepage = () => getTenantParams().enableModernHomepage === 'true';
export const isInterstitialPageList = () => getTenantParams().isInterstitialPageList === 'true';

export const APPLICATION = () => (getTenantParams().application ?? 'DAVINCI') as ApplicationEnum;
export const AVAILABLE_LANGUAGES: () => string[] = () =>
  (getTenantParams().availableLanguages || DEFAULT_LANGUAGE).split(',');

export const AUCTION_SERVICE_WALLETS: () => string[] = () => (getTenantParams().auctionServiceWallets ?? '').split(',');

export const tenantId = () => getTenantId();

export const gtmId = () => getTenantParams().gtmId || '';
export const webAppUrl = () => getTenantParams().webAppUrl!;

export const externalAuthUrl = () => getTenantParams().externalAuthUrl;
export const isExternalAuthEnabled = () => getTenantParams().isExternalAuthEnabled === 'true';

export const EXHIBITION_PREVIEW_KEY = () => getTenantParams().exhibitionPreviewKey;

export const IDENTITY_API_URL = () => getTenantParams().identityApiUrl;
export const FREEPORT_API_URL = () => getTenantParams().freeportApiUrl;
export const CMS_URL = () => getTenantParams().cmsApiUrl;

export const DDC_MEDIA_API_URL = () => getTenantParams().ddcMediaApiUrl;

export const APP_ID = () => getTenantParams().rxbAppId;

export const FIREBASE_API_KEY = () => getTenantParams().firebaseApiKey;
export const FIREBASE_AUTH_DOMAIN = () => getTenantParams().firebaseAuthDomain;
export const FIREBASE_PROJECT_ID = () => getTenantParams().firebaseProjectId;
export const FIREBASE_APP_ID = () => getTenantParams().firebaseAppId;

export const CERE_WALLET_DISABLE_BICONOMY = () => getTenantParams().cereWalletDisableBiconomy === 'true';

export const CERE_WALLET_POPUP_MODE = () => getTenantParams().cereWalletPopupMode;

export const APP_APN = () => getTenantParams().appApn!; // required
export const APP_IBI = () => getTenantParams().appIbi!; // required
export const APP_ISI = () => getTenantParams().appIsi!; // required
export const DYNAMIC_LINK_URL = () => getTenantParams().dynamicLinkUrl;

export const MARKETPLACE_AUCTIONS_ENABLED = () => getTenantParams().marketplaceAuctionsEnabled === 'true';

export const HIDE_MARKETPLACE_PAGE = process.env.REACT_APP_HIDE_MARKETPLACE_PAGE === 'true';
export const HIDE_CREATORS_PAGE = process.env.REACT_APP_HIDE_CREATORS_PAGE === 'true';
export const HIDE_INTERSTITIAL_PAGE = process.env.REACT_APP_HIDE_INTERSTITIAL_PAGE === 'true';
export const HIDE_FEED_PAGE = process.env.REACT_APP_HIDE_FEED_PAGE === 'true';
export const HIDE_HOME_PAGE = process.env.REACT_APP_HIDE_HOME_PAGE === 'true';
export const HIDE_EVENTS_PAGE = process.env.REACT_APP_HIDE_EXHIBITS_PAGE === 'true';
export const REACT_APP_HIDE_MY_COLLECTION_PAGE = process.env.REACT_APP_HIDE_MY_COLLECTION_PAGE === 'true';
export const REACT_APP_SHOW_COLLECTION_PROGRESS = process.env.REACT_APP_SHOW_COLLECTION_PROGRESS === 'true';

export const PURCHASE_VIA_EMAIL_POPUP = process.env.REACT_APP_PURCHASE_VIA_EMAIL_POPUP === 'true';
