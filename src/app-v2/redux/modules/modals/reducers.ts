import {ComponentType} from 'react';
import {AnyAction} from 'redux';

import {CloseActiveModalCommand} from './actions';

type ActiveModalState = {
  component: ComponentType;
  props: any;
};

export const activeModalReducer = (
  state: ActiveModalState | null = null,
  action: AnyAction,
): ActiveModalState | null => {
  if (action.type === CloseActiveModalCommand.type) {
    return null;
  }

  if (action.type.startsWith('[MODAL]')) {
    return {
      component: action.component,
      props: action.payload,
    };
  }

  return state;
};
