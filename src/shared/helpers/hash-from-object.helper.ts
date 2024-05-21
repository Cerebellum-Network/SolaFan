import crypto from 'crypto';

import {CmsExhibitionNft} from '../types/graphql';

export const hashFromObjectHelper = (nft: CmsExhibitionNft): string => {
  return crypto.createHash('sha256').update(JSON.stringify(nft)).digest('hex');
};
