import {combineReducers} from 'redux';

import {allCreatorsReducer, creatorsLoadingReducer} from './reducers/page';

export const creatorsModuleReducer = combineReducers({
  allCreators: allCreatorsReducer,
  loading: creatorsLoadingReducer,
});
