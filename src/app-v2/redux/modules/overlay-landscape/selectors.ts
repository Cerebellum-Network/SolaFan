import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {OVERLAY_MODULE_NAME} from './constants';
import {OverlayStore} from './types';

export const selectOverlay = (store: OverlayStore) => {
  if (!store[OVERLAY_MODULE_NAME]) {
    throw new NoSuchModuleError(OVERLAY_MODULE_NAME);
  }
  return store[OVERLAY_MODULE_NAME];
};

export const selectOverlayNfts = (store: OverlayStore) => selectOverlay(store).overlayNfts;
export const selectOverlayNftsLoading = (store: OverlayStore) => selectOverlay(store).overlayNftsLoading;
