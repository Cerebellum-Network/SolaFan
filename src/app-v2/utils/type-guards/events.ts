import {ExhibitCardInterface} from '@cere/services-types';

export const isEvent = (data: any): data is ExhibitCardInterface =>
  (typeof data?.id === 'string' || typeof data?.id === 'number') &&
  typeof data?.title === 'string' &&
  typeof data?.slug === 'string' &&
  typeof data?.subtitle === 'string' &&
  typeof data?.description === 'string' &&
  typeof data?.image?.url === 'string' &&
  typeof data?.creator?.id === 'string' &&
  typeof data?.creator?.avatar?.url === 'string';
