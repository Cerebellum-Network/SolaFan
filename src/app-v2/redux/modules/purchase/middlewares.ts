import isMobile from 'is-mobile';
import isWebview from 'is-ua-webview';
import PerfMate from 'perfmate';
import {AnyAction, MiddlewareAPI} from 'redux';

import {PURCHASE_VIA_EMAIL_POPUP} from '../../../../config/common';
import {delay} from '../../../../shared/lib/delay';
import analyticService, {AnalyticEventsEnum} from '../../../../shared/services/analytic.service';
import {NftsApi} from '../../../api/nfts/NftsApi';
import {IPaymentApi} from '../../../api/payment/IPaymentApi';
import {PaymentMode} from '../../../api/payment/types';
import {UserDataStorage} from '../../../models/auth/UserDataStorage';
import {UsersNftCardInterface} from '../../../types/nft';
import {getSessionIdFromUrl} from '../../../utils/helpers/get-session-id-from-url';
import {selectUserEmail} from '../auth/selectors';
import {HideLoaderCommand, ShowLoaderCommand} from '../loader/actions';
import {selectCurrentLocale} from '../localization/selectors';
import {CloseActiveModalCommand} from '../modals/actions';
import {UpdateNftDataCommand} from '../nft-page/actions';
import {LoadNftsArrayByIdsCommand, NftDocument} from '../nfts/actions';
import {selectNftById} from '../nfts/selectors';
import {WalletConnectedEvent, WalletsConnectionRestoredEvent} from '../wallets';
import {selectActiveWalletType, selectWalletAddress} from '../wallets/selectors';
import {
  CancelPurchaseCommand,
  NFTPurchaseStartedEvent,
  PurchaseNFTFailedEvent,
  PurchaseNFTForCryptoCommand,
  PurchaseNFTForFiatCommand,
  PurchaseNFTSuccessEvent,
  PurchaseWindowReplaceResultCommand,
  ShowBuyCollectibleModalCommand,
  ShowPurchaseFailedModalCommand,
  ShowPurchaseSuccessModalCommand,
  ShowStartPurchaseOnMarketplaceModalCommand,
  StartPrimaryNFTPurchaseCommand,
  StartSecondaryNFTPurchaseCommand,
} from './actions';

export const continuePurchaseMiddleware =
  (userDataStorage: UserDataStorage) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);

    if (action.type === WalletsConnectionRestoredEvent.type || action.type === WalletConnectedEvent.type) {
      const storedQuery = userDataStorage.getNftQuery();
      if (!storedQuery) {
        return;
      }
      const query = new URLSearchParams(storedQuery);
      const nftId = query.get('nftId');
      const orderId = query.get('orderId');
      if (!nftId || !orderId) {
        return;
      }
      dispatch(StartPrimaryNFTPurchaseCommand.create(nftId, orderId, 1));
    }
  };

const getNftWithAttemptsAndDelay = async (
  {getState}: MiddlewareAPI,
  nftId: string,
): Promise<UsersNftCardInterface | undefined> => {
  const MAX_ATTEMPTS = 5;
  const DELAY_MS = 2000;
  let nft;
  let attempts = 0;

  while (!nft && attempts < MAX_ATTEMPTS) {
    nft = selectNftById(getState(), nftId);
    if (nft) {
      break;
    }
    await delay(DELAY_MS);
    attempts++;
  }

  return nft;
};

export const processWindowReplacePurchaseResult =
  (paymentApi: IPaymentApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);

    if (action.type === PurchaseWindowReplaceResultCommand.type) {
      const {nftId, orderId, qty, email, sessionId} = action.payload;
      const nft = await getNftWithAttemptsAndDelay({dispatch, getState}, nftId);
      let emailFromSession: string | undefined;
      if (!email) {
        if (sessionId) {
          emailFromSession = await paymentApi.getUserEmailBySessionId(sessionId);
        }
      }
      if (!nft) {
        dispatch(PurchaseNFTFailedEvent.create(nftId, 'NFT data not found'));
        return;
      }

      try {
        dispatch(PurchaseNFTSuccessEvent.create(nftId));
        analyticService.gtmTrack(AnalyticEventsEnum.COLLECTIBLE_PURCHASE, action.payload);
        dispatch(ShowPurchaseSuccessModalCommand.create(nftId, nft.priceUsd, qty, email || emailFromSession));
      } catch (e) {
        console.error(e);
        dispatch(PurchaseNFTFailedEvent.create(nftId, e.message));
        dispatch(ShowPurchaseFailedModalCommand.create(nftId, orderId, nft.price, qty));
      }
    }
  };

export const startPurchaseFromMinterMiddleware =
  (nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === StartPrimaryNFTPurchaseCommand.type) {
      const {nftId, orderId, qty} = action.payload;
      const state = getState();
      const nft = selectNftById(state, nftId);
      const locale = selectCurrentLocale(state);
      const userEmail = selectUserEmail(state);
      if (!userEmail) {
        PURCHASE_VIA_EMAIL_POPUP
          ? dispatch(ShowBuyCollectibleModalCommand.create({nftId, orderId, qty}))
          : dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId));
        return;
      }
      dispatch(ShowLoaderCommand.create('Redirecting to Payment Page...'));
      if (!nft) {
        try {
          const loadedNft = await nftApi.getNftById(nftId, locale);
          dispatch(NftDocument.create(loadedNft));
        } catch (e) {
          console.error(e);
          dispatch(PurchaseNFTFailedEvent.create(nftId, e.message));
          return;
        }
      }
      dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, qty));
    }
  };

export const startPurchaseOnMarketplaceMiddleware =
  (nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === StartSecondaryNFTPurchaseCommand.type) {
      const {nftId, orderId, sellerWalletAddress, price, qty} = action.payload;
      const state = getState();
      const nft = selectNftById(state, nftId);
      const locale = selectCurrentLocale(state);
      if (!nft) {
        try {
          const loadedNft = await nftApi.getNftById(nftId, locale);
          dispatch(NftDocument.create(loadedNft));
        } catch (e) {
          console.error(e);
          dispatch(PurchaseNFTFailedEvent.create(nftId, e.message));
          return;
        }
      }
      dispatch(ShowStartPurchaseOnMarketplaceModalCommand.create(nftId, orderId, sellerWalletAddress, price, qty));
    }
  };

export const purchaseNftForCryptoMiddleware =
  (userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === PurchaseNFTForCryptoCommand.type) {
      const {nftId, orderId, sellerWalletAddress, price, qty} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(PurchaseNFTFailedEvent.create(nftId, 'NFT data not found'));
        dispatch(ShowPurchaseFailedModalCommand.create(nftId, orderId, sellerWalletAddress, price, qty));
        return;
      }
      dispatch(NFTPurchaseStartedEvent.create());
      try {
        dispatch(PurchaseNFTSuccessEvent.create(nftId));
        dispatch(ShowPurchaseSuccessModalCommand.create(nftId, price, qty));
        userDataStorage.clearNftQuery();
      } catch (e) {
        console.error(e);
        userDataStorage.clearNftQuery();
        dispatch(PurchaseNFTFailedEvent.create(nftId, e.message));
        dispatch(ShowPurchaseFailedModalCommand.create(nftId, orderId, sellerWalletAddress, price, qty));
      }
    }
  };

export const purchaseNftForFiatMiddleware =
  (paymentApi: IPaymentApi, userDataStorage: UserDataStorage) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);

    if (action.type === PurchaseNFTForFiatCommand.type) {
      const perf = new PerfMate();
      dispatch(ShowLoaderCommand.create('Redirecting to Payment Page...'));
      const state = getState();
      const activeWalletType = selectActiveWalletType(state);
      const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
      const locale = selectCurrentLocale(state);
      const {nftId, orderId, qty, email} = action.payload;
      const userEmail = selectUserEmail(state) || email;
      dispatch(UpdateNftDataCommand.create(nftId));
      if (!userEmail && PURCHASE_VIA_EMAIL_POPUP) {
        dispatch(PurchaseNFTFailedEvent.create(nftId, 'User email not found'));
        return;
      }
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(PurchaseNFTFailedEvent.create(nftId, 'NFT data not found'));
        return;
      }
      if (!nft.exhibitionId) {
        dispatch(PurchaseNFTFailedEvent.create(nftId, 'NFT is not assign to an event'));
        return;
      }
      try {
        let paymentMode = PaymentMode.WINDOW_OPEN;

        // If the device is webview, it doesn't support window.open, this is why we use window.replace mode
        if (isWebview(window.navigator.userAgent) || isMobile()) {
          paymentMode = PaymentMode.WINDOW_REPLACE;
        }

        perf.log('purchase profile: before paymentApi.getFiatPaymentUrl');
        const url = await paymentApi.getFiatPaymentUrl(
          nft.address,
          orderId,
          nft.collectionAddress!,
          qty,
          Number(nft.exhibitionId),
          locale,
          paymentMode,
          nftId,
          userEmail,
          walletPublicKey,
        );
        perf.log('purchase profile: after paymentApi.getFiatPaymentUrl');
        if (paymentMode === PaymentMode.WINDOW_REPLACE) {
          // Cleaning local storage to avoid start purchase next time after user refreshed the page
          userDataStorage.clearNftQuery();
          window.location.replace(url);
          return;
        }

        perf.log('purchase profile: before promise open window');
        await new Promise((resolve) => {
          const win = window.open(url, 'Pay by card', 'left=100,top=100,width=800,height=600');
          dispatch(HideLoaderCommand.create());
          const handlePaymentResult = async (event: MessageEvent<any>) => {
            if (event.data?.paymentResult) {
              let emailFromSession: string | undefined;
              if (!userEmail) {
                const sessionId = getSessionIdFromUrl(win?.location.search);
                if (sessionId) {
                  emailFromSession = await paymentApi.getUserEmailBySessionId(sessionId);
                }
              }
              dispatch(PurchaseNFTSuccessEvent.create(nftId));
              analyticService.gtmTrack(AnalyticEventsEnum.COLLECTIBLE_PURCHASE, {userEmail});
              dispatch(ShowPurchaseSuccessModalCommand.create(nftId, nft.priceUsd, qty, email || emailFromSession));
              userDataStorage.clearNftQuery();
              window.removeEventListener('message', handlePaymentResult);
              win?.close();
              resolve(true);

              dispatch(LoadNftsArrayByIdsCommand.create([]));
              let attempt = 0;
              const intervalId = setInterval(() => {
                dispatch(LoadNftsArrayByIdsCommand.create([]));
                if (attempt++ > 10) {
                  clearInterval(intervalId);
                }
              }, 7000);
            }
          };

          window.addEventListener('message', handlePaymentResult);

          const timer = setInterval(() => {
            if (win?.closed) {
              clearInterval(timer);
              window.removeEventListener('message', handlePaymentResult);
              resolve(false);
            }
          }, 500);
        });
        perf.log('purchase profile: after promise open window');
        perf.end();
      } catch (e) {
        console.error(e);
        userDataStorage.clearNftQuery();
        dispatch(PurchaseNFTFailedEvent.create(nftId, e.message));
        dispatch(ShowPurchaseFailedModalCommand.create(nftId, orderId, nft.price, qty, userEmail));
        dispatch(HideLoaderCommand.create());
      }
    }
  };

export const cancelPurchaseMiddleware =
  (userDataStorage: UserDataStorage) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === CancelPurchaseCommand.type) {
      dispatch(CloseActiveModalCommand.create());
      userDataStorage.clearNftQuery();
    }
  };
