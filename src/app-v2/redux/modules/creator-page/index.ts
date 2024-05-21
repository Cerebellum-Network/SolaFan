import {ICreatorApi} from '../../../api/creator/ICreatorApi';
import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {NftsApi} from '../../../api/nfts/NftsApi';
import {StoreModule} from '../../base/types';
import {CREATOR_PAGE_MODULE_NAME} from './constants';
import {loadCreatorPageDataMiddleware} from './middlewares';
import {creatorDetailsPageReducer} from './reducers';

export * from './actions';

export const createCreatorDetailsModule = (
  creatorApi: ICreatorApi,
  creatorsApi: ICreatorsApi,
  nftApi: NftsApi,
): StoreModule => ({
  title: CREATOR_PAGE_MODULE_NAME,
  moduleReducer: creatorDetailsPageReducer,
  middlewares: [loadCreatorPageDataMiddleware(creatorApi, creatorsApi, nftApi)],
});
