import {AnyAction, applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {InitAppCommand} from './base/actions';
import {StoreModule} from './base/types';
import {APP_CONFIG_MODULE_NAME} from './modules/app-config/constants';
import {appConfigReducer} from './modules/app-config/reducers';

type ReducersConfig = {
  [key: string]: Reducer;
};

export class AppStore {
  public readonly store: Store;
  private reducers: ReducersConfig = {[APP_CONFIG_MODULE_NAME]: appConfigReducer};
  private middlewares: Middleware[] = [];

  constructor(isDevMode: boolean) {
    const reducer = combineReducers(this.reducers);
    let middleware = applyMiddleware(this.applyDynamicMiddleware.bind(this));
    if (isDevMode) {
      middleware = composeWithDevTools(middleware);
    }
    this.store = createStore(reducer, middleware);
  }

  init() {
    this.store.dispatch(InitAppCommand.create());
  }

  addModule(module: StoreModule): void {
    if (module.moduleReducer) {
      this.reducers = {
        ...this.reducers,
        [module.title]: module.moduleReducer,
      };
      this.store.replaceReducer(combineReducers(this.reducers));
    }
    if (module.middlewares && module.middlewares.length) {
      this.middlewares.push(...module.middlewares);
    }
  }

  private applyDynamicMiddleware() {
    return (next: any) => (action: AnyAction) => {
      // @ts-ignore
      compose(...this.middlewares.map((m) => m(this.store)))(next)(action);
    };
  }
}
