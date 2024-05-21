import {IOverlayApi} from '../../../api/overlay-nfts/IOverlayApi';
import {StoreModule} from '../../base/types';
import {OVERLAY_MODULE_NAME} from './constants';
import {overlayMiddleware} from './middlewares';
import {overlayModuleReducer} from './reducers';

export const createOverlayModule = (overlayApi: IOverlayApi): StoreModule => ({
  title: OVERLAY_MODULE_NAME,
  moduleReducer: overlayModuleReducer,
  middlewares: [overlayMiddleware(overlayApi)],
});
