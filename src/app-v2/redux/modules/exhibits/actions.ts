import {ExhibitCardInterface} from '@cere/services-types';

import {CmsExhibit} from '../../../types/exhibit';

const EXHIBITS = '[EXHIBITS]';
export class ExhibitsDocument {
  static type = `${EXHIBITS} Load exhibits`;

  static create(exhibits: ExhibitCardInterface[] | CmsExhibit | undefined) {
    return {
      type: this.type,
      payload: exhibits,
    };
  }
}

export class ExhibitDocument {
  static type = `${EXHIBITS} Load exhibit`;
  static create(exhibit: ExhibitCardInterface) {
    return {
      type: this.type,
      payload: exhibit,
    };
  }
}

export class LoadExhibitsArrayByIdsCommand {
  static type = `${EXHIBITS} Load NFTs array by ids`;

  static create(slugs: string[]) {
    return {
      type: this.type,
      payload: slugs,
    };
  }
}
