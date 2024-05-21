import {AnyAction} from 'redux';

import {UserLocaleDocument} from './actions';

export const userLocaleReducer = (state: string | null = null, action: AnyAction): string | null => {
  if (action.type === UserLocaleDocument.type) {
    return action.payload;
  }
  return state;
};
