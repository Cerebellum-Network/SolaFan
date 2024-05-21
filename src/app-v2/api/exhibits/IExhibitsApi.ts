import {ExhibitionStatus} from '@cere/services-types';

import {CmsExhibit} from '../../types/exhibit';
import {CmsSeo} from './types';

export interface IExhibitsApi {
  getAllExhibits(locale?: string, filter?: ExhibitionStatus): Promise<CmsExhibit[]>;
  getExhibitsSeo(limit: number, locale: string): Promise<CmsSeo[] | undefined>;
}
