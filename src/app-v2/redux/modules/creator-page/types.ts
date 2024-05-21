import {CREATOR_PAGE_MODULE_NAME} from './constants';
import {creatorDetailsPageReducer} from './reducers';

export type CreatorDetailsPageStore = {[CREATOR_PAGE_MODULE_NAME]: ReturnType<typeof creatorDetailsPageReducer>};
