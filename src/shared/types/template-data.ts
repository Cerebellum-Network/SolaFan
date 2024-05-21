import {isRecord} from './is-record';
import {NftTemplate} from './nftTemplate';

export type TemplateData = {
  nfts: NftTemplate[];
  artistId: 'string';
  userId?: 'string';
  eventId?: 'string';
  templateParams?: 'string';
  paymentStatus?: 'string';
};

export const isTemplateData = (val: unknown): val is TemplateData => isRecord(val) && val.artistId !== undefined;
