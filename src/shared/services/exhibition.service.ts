import * as Sentry from '@sentry/react';

import {CMS_URL} from '../../config/common';
import i18n from '../../i18n';
import {get} from '../lib/request';
import {isRecord} from '../types/is-record';

type FindExhibitionResult = {
  id: number;
  slug: string;
};

const isFindExhibitionResult = (value: unknown): value is FindExhibitionResult =>
  isRecord(value) && !isNaN(Number(value.id)) && Number(value.id) > 0;

export function findExhibitionByAttachedNft(nftId: string, collectionAddress: string): Promise<FindExhibitionResult> {
  const url = new URL(CMS_URL());
  url.pathname = 'freeport-nfts/cms-exhibitions';
  url.searchParams.set('nft_id', nftId);
  url.searchParams.set('collection_id', collectionAddress);
  return get(`${url.pathname}${url.search}`, {base: url.origin})
    .catch((error) => {
      Sentry.captureException(error);
      throw error;
    })
    .then((response) => {
      const result = Array.isArray(response) ? response.filter((item) => item?.published_at != null)[0] : null;
      if (isFindExhibitionResult(result)) {
        return result;
      }
      throw Error(i18n.t(`There are no exhibitions with attached {{nftId}} found`, {nftId}));
    });
}
