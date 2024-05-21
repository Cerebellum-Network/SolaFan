import {UploadFile} from '@cere/services-types';

import {getNearestNonNull, useValueByResolution} from './use-resolution.hook';

export type ImageSize = 'thumb' | 'sm' | 'md' | 'lg' | 'xl';

export const getResponsiveImage = (image: UploadFile | undefined, size: ImageSize): string | undefined => {
  const images = [
    image?.formats?.thumbnail?.url,
    image?.formats?.small?.url,
    image?.formats?.medium?.url,
    image?.formats?.large?.url,
    image?.url,
  ];
  if (size === 'lg') {
    return getNearestNonNull(images, 3);
  }
  if (size === 'md') {
    return getNearestNonNull(images, 2);
  }
  if (size === 'sm') {
    return getNearestNonNull(images, 1);
  }

  return getNearestNonNull(images, 0);
};

export function useResponsiveImage(image?: UploadFile): string | undefined {
  return useValueByResolution({
    desktop: image?.formats?.large?.url,
    tablet: image?.formats?.medium?.url,
    mobile: image?.formats?.small?.url,
    fallback: image?.url,
  }).value;
}
