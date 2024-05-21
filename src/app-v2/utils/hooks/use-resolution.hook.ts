import {Theme, useMediaQuery} from '@material-ui/core';

import {omitUndefined} from '../helpers/omit-undefined';

export type ValueByResolutionProp<T> = T | undefined;

export type ValueByResolutionResult<T> = {
  value: ValueByResolutionProp<T>;
};

type Params<T> = {
  desktop?: ValueByResolutionProp<T>;
  tablet?: ValueByResolutionProp<T>;
  mobile?: ValueByResolutionProp<T>;
  fallback?: ValueByResolutionProp<T>;
};

export const getNearestNonNull = <T>(values: ValueByResolutionProp<T>[], position: number): ValueByResolutionProp<T> =>
  values.slice(position).filter(omitUndefined)?.[0];

export function useValueByResolution<T>({desktop, mobile, tablet, fallback}: Params<T>): ValueByResolutionResult<T> {
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'));

  const images = [mobile, tablet, desktop, fallback];

  if (isDesktop) {
    return {value: getNearestNonNull(images, 2)};
  }
  if (isTablet) {
    return {value: getNearestNonNull(images, 1)};
  }

  return {value: getNearestNonNull(images, 0)};
}
