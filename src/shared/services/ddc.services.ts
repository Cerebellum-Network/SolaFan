import * as Sentry from '@sentry/react';

import {DDC_MEDIA_API_URL} from '../../config/common';
import {get} from '../lib/request';
import {isRecord} from '../types/is-record';
import {Signer} from '../types/signer';

type Params = {
  minter: string;
  owner: string;
  cid: string;
  signer: Signer;
};

export const getNftContent = async ({minter, cid, signer, owner}: Params): Promise<[string, Blob]> => {
  const parts = [`Confirm identity:`, `Minter: ${minter}`, `CID: ${cid}`, `Address: ${owner}`];
  const metaData = await get(`/assets/v1/${minter}/${cid}`, {base: DDC_MEDIA_API_URL()});
  let contentType = '';
  if (
    isRecord(metaData) &&
    isRecord(metaData.contentMetadata) &&
    typeof metaData.contentMetadata.contentType === 'string'
  ) {
    contentType = metaData.contentMetadata.contentType;
  } else {
    Sentry.captureException(Error(`Invalid metadata for asset, ${JSON.stringify(metaData)}`));
  }

  try {
    const signature = await signer.signMessage(parts.join('\n'));
    const response = await get(`/assets/v1/${minter}/${cid}/content`, {
      base: DDC_MEDIA_API_URL(),
      type: 'blob',
      headers: {
        'X-DDC-Signature': signature,
        'X-DDC-Address': owner,
      },
    });
    if (response instanceof Blob) {
      return [contentType, response];
    }
  } catch (e) {
    Sentry.captureException(e);
  }
  throw Error('Invalid response for asset');
};
