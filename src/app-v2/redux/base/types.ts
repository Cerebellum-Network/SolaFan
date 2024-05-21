import {AnyAction, Middleware} from 'redux';

export type StoreModule = {
  title: string;
  moduleReducer?: (store: any, action: AnyAction) => any;
  middlewares?: Middleware[];
};
