import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {CollectorsModuleState} from './reducers';

export const collectors = 'collectors';

export const selectCollectorsStore = (store: any) => {
  if (!store[collectors]) {
    throw new NoSuchModuleError(collectors);
  }
  return store[collectors] as CollectorsModuleState;
};

export const selectCollectorsProfile = (store: any, walletPublicKey: string) =>
  selectCollectorsStore(store).collectorProfiles[walletPublicKey];
export const selectCollectorsProfileLoadingState = (store: any, walletPublicKey: string) =>
  selectCollectorsStore(store).collectorProfilesLoadingState[walletPublicKey];

export const selectMyCollectorsProfile = (store: any) => selectCollectorsStore(store).myCollectorsProfile;
export const selectMyCollectorsProfileLoadingState = (store: any) =>
  selectCollectorsStore(store).myCollectorsProfileLoadingState;
