import {History} from 'history';
import {AnyAction} from 'redux';

import {HistoryObjectDocument} from './actions';

export const historyReducer = (state: History | null = null, action: AnyAction): History | null => {
  if (action.type === HistoryObjectDocument.type) {
    return action.payload;
  }
  return state;
};
