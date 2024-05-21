export type PromiseResolve<T = undefined> = (value: T) => void;
export type PromiseReject<E = unknown> = (value: E) => void;

export type AsyncResult<T = unknown, E = unknown> = {
  resolve: PromiseResolve<T>;
  reject: PromiseReject<E>;
  promise: Promise<T>;
};

export const createAsyncResult = <T = unknown>(): AsyncResult<T> => {
  let resolve: PromiseResolve<T> = () => null;
  let reject: PromiseReject = () => null;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
};
