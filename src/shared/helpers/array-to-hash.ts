export const arrayToHash = <T extends Object>(arr: T[], key: string): {[key: string]: T} => {
  return Object.fromEntries(
    // @ts-ignore
    arr.map((item: T) => [item[key], item]),
  );
};
