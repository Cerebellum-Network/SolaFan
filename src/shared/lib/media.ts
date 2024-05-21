import {UploadFile, UploadFileFormats, UploadFileInterface} from '@cere/services-types';

export type UploadFileVariants = keyof UploadFileFormats;

export const getMediaUrl = (
  uploadFile: UploadFile | UploadFileInterface | undefined,
  uploadVariants: UploadFileVariants | 'original' = 'small',
): string => {
  if (!uploadFile) {
    return '';
  }

  switch (uploadVariants) {
    case 'small':
      return uploadFile.formats?.small?.url || uploadFile.url || '';
    case 'medium':
      return uploadFile.formats?.medium?.url || uploadFile.url || '';
    case 'thumbnail':
      return uploadFile.formats?.thumbnail?.url || uploadFile.url || '';
    case 'large':
      return uploadFile.formats?.large?.url || uploadFile.url || '';
    case 'original':
      return uploadFile.url || '';

    default: {
      return uploadFile.url || '';
    }
  }
};

export const parseMediaAlternativeText = (
  alternativeText?: string,
): {ddcUrl: string | undefined; mime: string | undefined} => {
  let ddcUrl: string | undefined;
  let mime: string | undefined;
  try {
    const data = JSON.parse(alternativeText ?? '');
    ddcUrl = data?.ddcUrl;
    mime = data?.mime;
  } catch (e) {}
  return {ddcUrl, mime};
};
