import {HOME_PAGE_MODULE_NAME} from './constants';
import {homePageModuleReducer} from './reducers';

export type HomePageStore = {[HOME_PAGE_MODULE_NAME]: ReturnType<typeof homePageModuleReducer>};
