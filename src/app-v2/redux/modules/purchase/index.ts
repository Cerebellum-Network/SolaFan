import {NftsApi} from '../../../api/nfts/NftsApi';
import {IPaymentApi} from '../../../api/payment/IPaymentApi';
import {UserDataStorage} from '../../../models/auth/UserDataStorage';
import {StoreModule} from '../../base/types';
import {PURCHASE_MODULE_NAME} from './constants';
import {
  cancelPurchaseMiddleware,
  continuePurchaseMiddleware,
  processWindowReplacePurchaseResult,
  purchaseNftForCryptoMiddleware,
  purchaseNftForFiatMiddleware,
  startPurchaseFromMinterMiddleware,
  startPurchaseOnMarketplaceMiddleware,
} from './middlewares';

export const createPurchaseModule = (
  nftApi: NftsApi,
  paymentApi: IPaymentApi,
  userDataStorage: UserDataStorage,
): StoreModule => ({
  title: PURCHASE_MODULE_NAME,
  middlewares: [
    startPurchaseFromMinterMiddleware(nftApi),
    startPurchaseOnMarketplaceMiddleware(nftApi),
    purchaseNftForCryptoMiddleware(userDataStorage),
    purchaseNftForFiatMiddleware(paymentApi, userDataStorage),
    continuePurchaseMiddleware(userDataStorage),
    cancelPurchaseMiddleware(userDataStorage),
    processWindowReplacePurchaseResult(paymentApi),
  ],
});
