import {FullCreatorInterface} from '@cere/services-types';

export interface ICreatorsApi {
  getAllCreators(locale?: string): Promise<FullCreatorInterface[]>;
  getCreatorById(creatorId: string, locale?: string): Promise<FullCreatorInterface | undefined>;
  getFeaturedCreators(locale?: string): Promise<FullCreatorInterface[]>;
}
