import {NftType} from '@cere/services-types';

import i18n from '../../i18n';
import {CmsExhibitionNftRelType} from '../types/graphql';

export const getNftRelTypeTitle = (relType?: string): string => {
  if (relType === CmsExhibitionNftRelType.ACCESS || relType === NftType.ACCESS) {
    return i18n.t('TICKET');
  }
  if (relType === CmsExhibitionNftRelType.AUCTIONED || relType === NftType.AUCTIONED) {
    return i18n.t('UNIQUE');
  }

  return i18n.t('LIMITED');
};
