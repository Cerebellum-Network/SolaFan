import {OVERLAY_MODULE_NAME} from './constants';
import {overlayModuleReducer} from './reducers';

export type OverlayStore = {[OVERLAY_MODULE_NAME]: ReturnType<typeof overlayModuleReducer>};
