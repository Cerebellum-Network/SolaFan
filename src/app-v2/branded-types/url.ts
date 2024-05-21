import {isString} from '../utils/types/strings';

export type Url = string & {
  __type__: 'Url';
};

export const isUrl = (val: unknown) => {
  try {
    new URL(isString(val) ? val : '');
    return true;
  } catch (e) {
    return false;
  }
};

export const toString = (url: Url): string => url as string;
