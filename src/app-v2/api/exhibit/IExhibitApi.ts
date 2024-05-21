import {ExhibitCardInterface} from '@cere/services-types';

import {CmsExhibit} from '../../types/exhibit';

export interface IExhibitApi {
  getEvent(slug: string, isPreviewMode: boolean, locale: string): Promise<CmsExhibit | undefined>;
  getCreatorExhibits(creatorId: string, locale: string): Promise<ExhibitCardInterface[] | undefined>;
}
