import {detectTenant, saveTenantParams} from './tenant-utils';

export type TenantParams = {
  enableMarketplaceView: string;
  enableFiatDepositPage: string;
  enableModernHomepage: string;
  enableAppV2: string;
  isInterstitialPageList: string;
  application: string;
  availableLanguages: string;
  auctionServiceWallets: string;
  gtmId: string;
  webAppUrl: string;
  externalAuthUrl: string;
  isExternalAuthEnabled: string;
  exhibitionPreviewKey: string;
  identityApiUrl: string;
  freeportApiUrl: string;
  ddcMediaApiUrl: string;
  rxbAppId: string;
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseAppId: string;
  cereWalletDisableBiconomy: string;
  cereWalletPopupMode: string;
  appApn: string;
  appIbi: string;
  appIsi: string;
  dynamicLinkUrl: string;
  marketplaceAuctionsEnabled: string;
  cmsApiUrl: string;
};

const TEMP_SERVICE_TENANTS_PARAMS = process.env.REACT_APP_TEMP_SERVICE_TENANTS_PARAMS;

export const getTenantServicePropertyByKey = async <T>(tenantId: string, propertyName: string): Promise<T> => {
  // TODO: Implement fetch once config service ready instead of get from ENV params
  const temporaryParams = JSON.parse(TEMP_SERVICE_TENANTS_PARAMS!);
  const tenantConfig = temporaryParams[tenantId];

  if (!tenantConfig) {
    throw new Error(`No config for tenant: ${tenantId}`);
  }

  return tenantConfig[propertyName];
};

export const loadTenantConfig = async () => {
  try {
    const tenantId = detectTenant();
    const [
      enableMarketplaceView,
      enableFiatDepositPage,
      enableModernHomepage,
      enableAppV2,
      isInterstitialPageList,
      application,
      availableLanguages,
      auctionServiceWallets,
      gtmId,
      webAppUrl,
      externalAuthUrl,
      isExternalAuthEnabled,
      exhibitionPreviewKey,
      identityApiUrl,
      freeportApiUrl,
      ddcMediaApiUrl,
      rxbAppId,
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseAppId,
      cereWalletDisableBiconomy,
      cereWalletPopupMode,
      appApn,
      appIbi,
      appIsi,
      dynamicLinkUrl,
      marketplaceAuctionsEnabled,
      cmsApiUrl,
    ] = await Promise.all(
      [
        'enableMarketplaceView',
        'enableFiatDepositPage',
        'enableModernHomepage',
        'enableAppV2',
        'isInterstitialPageList',
        'application',
        'availableLanguages',
        'auctionServiceWallets',
        'gtmId',
        'webAppUrl',
        'externalAuthUrl',
        'isExternalAuthEnabled',
        'exhibitionPreviewKey',
        'identityApiUrl',
        'freeportApiUrl',
        'ddcMediaApiUrl',
        'rxbAppId',
        'firebaseApiKey',
        'firebaseAuthDomain',
        'firebaseProjectId',
        'firebaseAppId',
        'cereWalletDisableBiconomy',
        'cereWalletPopupMode',
        'appApn',
        'appIbi',
        'appIsi',
        'dynamicLinkUrl',
        'marketplaceAuctionsEnabled',
        'cmsApiUrl',
      ].map((param) => getTenantServicePropertyByKey<string>(tenantId, param)),
    );
    saveTenantParams({
      enableMarketplaceView,
      enableFiatDepositPage,
      enableModernHomepage,
      enableAppV2,
      isInterstitialPageList,
      application,
      availableLanguages,
      auctionServiceWallets,
      gtmId,
      webAppUrl,
      externalAuthUrl,
      isExternalAuthEnabled,
      exhibitionPreviewKey,
      identityApiUrl,
      freeportApiUrl,
      ddcMediaApiUrl,
      rxbAppId,
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseAppId,
      cereWalletDisableBiconomy,
      cereWalletPopupMode,
      appApn,
      appIbi,
      appIsi,
      dynamicLinkUrl,
      marketplaceAuctionsEnabled,
      cmsApiUrl,
    });
  } catch (e) {
    console.error(e);
  }
};
