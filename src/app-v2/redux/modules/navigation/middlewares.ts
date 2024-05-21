import {AnyAction, MiddlewareAPI} from 'redux';

import {RedirectCommand} from './actions';
import {selectHistoryObject} from './selectors';

export const redirectMiddleware =
  ({getState}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === RedirectCommand.type) {
      const {path, state} = action.payload;
      const history = selectHistoryObject(getState());
      if (history) {
        history.push(path, state);
      }
    }
  };
