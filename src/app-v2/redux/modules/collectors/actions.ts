import {CollectorProfile} from '../../../api/collector/types';
import {BaseAction} from '../../base/BaseAction';

const collectors = '[COLLECTORS]';

export class FetchProfileStarted extends BaseAction {
  static readonly type = `${collectors} Fetch profile started`;
  static create(walletPublicKey?: string) {
    return {
      type: this.type,
      payload: walletPublicKey,
    };
  }
}

export class FetchProfileFinished extends BaseAction {
  static readonly type = `${collectors} Fetch profile finished`;
  static create(walletPublicKey?: string) {
    return {
      type: this.type,
      payload: walletPublicKey,
    };
  }
}

export class ProfileDocument {
  static readonly type = `${collectors} Profile document`;
  static create(collectorProfile: CollectorProfile, walletPublicKey?: string) {
    return {
      type: this.type,
      payload: {collectorProfile, walletPublicKey},
    };
  }
}

export class FetchProfileCommand {
  static readonly type = `${collectors} Fetch profile`;
  static create(walletPublicKey?: string) {
    return {
      type: this.type,
      payload: walletPublicKey,
    };
  }
}
