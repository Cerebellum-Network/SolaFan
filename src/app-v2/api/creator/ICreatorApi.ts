import {ExhibitCardInterface} from '@cere/services-types/dist/types';

import {Nft} from './types';

export interface ICreatorApi {
  getExhibitsByCreatorId(creatorId: string, locale?: string): Promise<ExhibitCardInterface[]>;
  getNftsByCreatorId(creatorId: string, locale?: string): Promise<Nft[]>;
}
