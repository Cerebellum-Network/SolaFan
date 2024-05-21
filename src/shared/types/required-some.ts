export type RequiredSome<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  {
    [P in K]-?: T[P];
  };
