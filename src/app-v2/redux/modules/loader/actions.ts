import {BaseAction} from '../../base/BaseAction';

const LOADER = '[LOADER]';

export class ShowLoaderCommand {
  static type = `${LOADER} Show loader`;
  static create(text?: string) {
    return {
      type: this.type,
      payload: text,
    };
  }
}

export class HideLoaderCommand extends BaseAction {
  static type = `${LOADER} Hide loader`;
}
