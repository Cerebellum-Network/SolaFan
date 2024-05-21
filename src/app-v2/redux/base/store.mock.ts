import {Middleware} from 'redux';

export const mockMiddleware = (middleware: Middleware) => {
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({})),
  };

  const next = jest.fn();

  const invoke = async (action: any) => await middleware(store)(next)(action);

  return {invoke, store, next};
};
