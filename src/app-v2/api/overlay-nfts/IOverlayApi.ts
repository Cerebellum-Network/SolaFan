import {NftCardInterface} from '@cere/services-types';

export interface IOverlayApi {
  getNfts(slug: string, locale: string): Promise<NftCardInterface[] | unknown>;
}
