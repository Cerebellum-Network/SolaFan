import {ExhibitionStatus} from '@cere/services-types';

import {CmsSeo} from '../../../api/exhibits/types';
import {ShareExhibitModal} from '../../../components/connected/ShareExhibitModal';
import {EXHIBITS_FILTERS} from '../../../pages/exhibits/types';
import {CmsExhibit} from '../../../types/exhibit';
import {BaseAction} from '../../base/BaseAction';

const EXHIBITS_PAGE = '[EXHIBITS PAGE]';

export class ExhibitsDocument {
  static type = `${EXHIBITS_PAGE} Exhibits`;
  static create(exhibits: CmsExhibit[]) {
    return {
      type: this.type,
      payload: exhibits,
    };
  }
}

export class ExhibitsSeoDocument {
  static type = `${EXHIBITS_PAGE} Exhibits seo`;
  static create(seo: CmsSeo[] | undefined) {
    return {
      type: this.type,
      payload: seo,
    };
  }
}

export class ExhibitsFiltersDocument {
  static type = `${EXHIBITS_PAGE} Exhibits filters`;

  static create(filter: ExhibitionStatus) {
    return {
      type: this.type,
      payload: filter,
    };
  }
}

export class ShowShareExhibitModalCommand {
  static type = `[MODAL] Share`;
  static create(exhibitId: string) {
    return {
      type: this.type,
      payload: {exhibitId},
      component: ShareExhibitModal,
    };
  }
}

export class FetchExhibitsSeoCommand extends BaseAction {
  static type = `${EXHIBITS_PAGE} Fetch exhibits seo`;
}

export class FetchExhibitsSeoStartedEvent extends BaseAction {
  static type = `${EXHIBITS_PAGE} Fetch exhibits seo started`;
}

export class FetchExhibitsSeoFinishedEvent extends BaseAction {
  static type = `${EXHIBITS_PAGE} Fetch exhibits seo finished`;
}

export class FetchExhibitsCommand {
  static type = `${EXHIBITS_PAGE} Fetch exhibits`;
  static create(filter?: EXHIBITS_FILTERS) {
    return {
      type: this.type,
      payload: filter,
    };
  }
}

export class FetchExhibitsStartedEvent extends BaseAction {
  static type = `${EXHIBITS_PAGE} Fetch exhibits started`;
}

export class FetchExhibitsFinishedEvent extends BaseAction {
  static type = `${EXHIBITS_PAGE} Fetch exhibits finished`;
}
