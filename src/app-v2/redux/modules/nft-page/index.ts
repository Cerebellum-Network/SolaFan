import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {NftsApi} from '../../../api/nfts/NftsApi';
import {IOrdersApi} from '../../../api/orders/IOrdersApi';
import {ITransfersApi} from '../../../api/transfers/ITransfersApi';
import {StoreModule} from '../../base/types';
import {NFT_PAGE_MODULE_NAME} from './constants';
import {loadNftTransfers} from './middlewares';
import {loadNftPageDataMiddleware, subscribeToCreatorDropsMiddleware, updateNftDataMiddleware} from './middlewares';
import {nftDetailsPageReducer} from './reducers';

export const createNftDetailsPageModule = (
  nftsApi: NftsApi,
  creatorsApi: ICreatorsApi,
  ordersApi: IOrdersApi,
  transfersApi: ITransfersApi,
): StoreModule => ({
  title: NFT_PAGE_MODULE_NAME,
  moduleReducer: nftDetailsPageReducer,
  middlewares: [
    loadNftPageDataMiddleware(nftsApi, creatorsApi, ordersApi),
    updateNftDataMiddleware(nftsApi),
    subscribeToCreatorDropsMiddleware(),
    loadNftTransfers(transfersApi),
  ],
});
