import {UploadFile} from '@cere/services-types';

export interface CmsSeo {
  seoCanonical?: string;
  seoDescription?: string;
  seoImage?: UploadFile;
  seoTitle?: string;
}
