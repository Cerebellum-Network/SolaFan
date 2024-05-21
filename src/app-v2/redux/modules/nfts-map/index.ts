import {StoreModule} from '../../base/types';
import {reducer} from './reducer';

export const createNftsMapModule = (): StoreModule => ({
  title: 'nfts-map',
  moduleReducer: reducer as any,
});
