import fnv from 'fnv-lite';

import {EXHIBITION_PREVIEW_KEY} from '../../config/common';

export const checkPreviewKey = (slug: string, previewKey: string): boolean => {
  if (!slug || !previewKey) {
    return false;
  }
  return previewKey === fnv.hex(`${slug}+${EXHIBITION_PREVIEW_KEY()}`);
};
