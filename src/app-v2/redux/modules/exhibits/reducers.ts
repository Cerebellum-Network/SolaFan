import {AnyAction} from 'redux';

import {CmsExhibit} from '../../../types/exhibit';
import {ExhibitDocument, ExhibitsDocument} from './actions';

interface ExhibitsStore {
  ids: string[];
  exhibits: {[key: string | number]: CmsExhibit};
}

const defaultState = {
  ids: [],
  exhibits: {},
};

export const ExhibitReducer = (store: ExhibitsStore = defaultState, action: AnyAction): ExhibitsStore => {
  switch (action.type) {
    case ExhibitsDocument.type: {
      const ids = store.ids;
      const exhibits = store.exhibits;
      const documentExhibit: CmsExhibit[] = action.payload;
      const exhibitsIds = documentExhibit.map((exhibit) => exhibit.id);
      const normalizedExhibits = documentExhibit.reduce((acc, exhibit) => {
        acc[exhibit.slug] = exhibit;
        return acc;
      }, {} as ExhibitsStore['exhibits']);
      exhibitsIds.forEach((id) => {
        if (!ids.includes(id as string)) {
          ids.push(id as string);
        }
      });
      return {
        ids,
        exhibits: {...exhibits, ...normalizedExhibits},
      };
    }
    case ExhibitDocument.type: {
      const ids = store.ids;
      const exhibits = store.exhibits;
      const exhibit: CmsExhibit = action.payload;
      if (!ids.includes(exhibit.id as string)) {
        ids.push(exhibit.id as string);
      }
      exhibits[exhibit.slug] = exhibit;
      return {
        ids,
        exhibits,
      };
    }
    default:
      return store;
  }
};
