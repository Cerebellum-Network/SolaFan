import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {EXHIBITS_MODULE_NAME} from './constants';
import {ExhibitsStore} from './types';

export const selectExhibits = (store: ExhibitsStore) => {
  if (!store[EXHIBITS_MODULE_NAME]) {
    throw new NoSuchModuleError(EXHIBITS_MODULE_NAME);
  }

  return store[EXHIBITS_MODULE_NAME].exhibits;
};

export const selectExhibitBySlug = (store: ExhibitsStore, slug: string) => selectExhibits(store)[slug];

export const selectExhibitById = (store: ExhibitsStore, id: string) =>
  Object.values(selectExhibits(store))
    // eslint-disable-next-line eqeqeq
    .find((exhibit) => exhibit.id == id);

export const selectExhibitsBySlugs = (store: ExhibitsStore, slugList: string[]) =>
  Object.values(selectExhibits(store)).filter((exhibit) => slugList.includes(exhibit.slug));

export const selectExhibitsByCreatorId = (store: ExhibitsStore, creatorId: string) =>
  Object.values(selectExhibits(store)).filter((exhibit) => creatorId === exhibit.creator.id);
