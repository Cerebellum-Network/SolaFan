import {UploadFileFormatsInterface} from '@cere/services-types';
import {useMemo} from 'react';

import {UploadedImageFormat} from '../../../types/uploaded-image-format';

type Props = {
  formats?: Record<string, UploadedImageFormat> | UploadFileFormatsInterface;
  size?: number;
  fallbackUrl: string | undefined | null;
  alt?: string;
  className?: string;
  onLoadImage?: () => void;
};

export function ResponsiveImage({formats, fallbackUrl, alt, size, className, onLoadImage}: Props) {
  const sortedFormats = useMemo(() => {
    const sizesCopy = Object.values(formats ?? {}).slice();
    sizesCopy.sort((a, b) => b.width - a.width);
    return sizesCopy;
  }, [formats]);

  const srcSet = sortedFormats.map(({width, url}) => `${url} ${width}w`).join(',');

  const handleImageLoad = () => {
    if (onLoadImage) {
      onLoadImage();
    }
  };

  return (
    <img
      className={className}
      alt={alt}
      srcSet={srcSet}
      sizes={size ? `${size}px` : undefined}
      src={fallbackUrl ?? undefined}
      onLoad={handleImageLoad}
    />
  );
}
