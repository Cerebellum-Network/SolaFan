import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {IEventsApi} from '../../../api/events/IEventsApi';
import {IHomePageNftsApi} from '../../../api/home-page/IHomePageNftsApi';
import {StoreModule} from '../../base/types';
import {HOME_PAGE_MODULE_NAME} from './constants';
import {getStartedEventsMiddleware, invalidateHomePageNftsMiddleware, loadHomePageDataMiddleware} from './middlewares';
import {homePageModuleReducer} from './reducers';

export const createHomePageModule = (
  homePageApi: IHomePageNftsApi,
  creatorsApi: ICreatorsApi,
  eventsApi: IEventsApi,
): StoreModule => ({
  title: HOME_PAGE_MODULE_NAME,
  moduleReducer: homePageModuleReducer,
  middlewares: [
    loadHomePageDataMiddleware(homePageApi, creatorsApi, eventsApi),
    getStartedEventsMiddleware(),
    invalidateHomePageNftsMiddleware,
  ],
});
