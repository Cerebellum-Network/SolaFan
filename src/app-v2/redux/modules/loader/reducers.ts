import {AnyAction, combineReducers} from 'redux';

import {HideLoaderCommand, ShowLoaderCommand} from './actions';

export interface LoaderStateInterface {
  visible: boolean;
  text?: string;
}

const defaultLoaderState: LoaderStateInterface = {
  visible: false,
  text: '',
};

const show = (state: LoaderStateInterface = defaultLoaderState, action: AnyAction) => {
  const text = (action?.payload as string) || undefined;
  switch (action.type) {
    case ShowLoaderCommand.type:
      return {
        ...state,
        visible: true,
        text: text,
      };
    case HideLoaderCommand.type:
      return {
        ...state,
        visible: false,
        text: '',
      };
    default:
      return state;
  }
};

export const loaderReducer = combineReducers({
  state: show,
});
