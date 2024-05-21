import {FullCreatorInterface} from '@cere/services-types';

import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {CREATORS_MODULE_NAME} from './constants';
import {CreatorsModuleStoreType} from './types';

export const selectAllCreators = (store: CreatorsModuleStoreType) => {
  if (!store[CREATORS_MODULE_NAME]) {
    throw new NoSuchModuleError(CREATORS_MODULE_NAME);
  }
  return store[CREATORS_MODULE_NAME].allCreators.ids
    .map((id: string | number) => store[CREATORS_MODULE_NAME].allCreators.creators[id])
    .filter((creator: FullCreatorInterface | undefined) => creator !== undefined) as FullCreatorInterface[];
};

export const selectCreatorById = (store: CreatorsModuleStoreType, creatorId: string) => {
  if (!store[CREATORS_MODULE_NAME]) {
    throw new NoSuchModuleError(CREATORS_MODULE_NAME);
  }
  return store[CREATORS_MODULE_NAME].allCreators.creators[creatorId];
};

export const selectCreatorsLoading = (store: CreatorsModuleStoreType): boolean => {
  if (!store[CREATORS_MODULE_NAME]) {
    throw new NoSuchModuleError(CREATORS_MODULE_NAME);
  }
  return store[CREATORS_MODULE_NAME].loading;
};

export const selectRandomCreator = (store: CreatorsModuleStoreType) => {
  const creators = selectAllCreators(store);
  const randomIndex = Math.floor(Math.random() * creators.length);
  return creators[randomIndex];
};
