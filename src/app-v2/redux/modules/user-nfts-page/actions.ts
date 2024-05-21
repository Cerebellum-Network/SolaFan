import {AllWallets} from 'shared/types/supported-wallet';

import {BaseAction} from '../../base/BaseAction';

const USER_NFTS_PAGE = `[USER NFTS PAGE]`;

export class UserNftsDocument {
  static type = `${USER_NFTS_PAGE} Nfts`;
  static create(nfts: any) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class FetchUserNftsCommand {
  static type = `${USER_NFTS_PAGE} Fetch user nfts`;
  static create(queryParam: string[]) {
    return {
      type: this.type,
      payload: queryParam,
    };
  }
}

export class FetchUserNftsStartedEvent extends BaseAction {
  static type = `${USER_NFTS_PAGE} Fetch user nfts started`;
}

export class FetchUserNftsFinishedEvent extends BaseAction {
  static type = `${USER_NFTS_PAGE} Fetch user nfts finished`;
}

export class UserNftsActiveWallet {
  static type = `${USER_NFTS_PAGE} set active wallet`;
  static create(wallet: AllWallets) {
    return {
      type: this.type,
      payload: wallet,
    };
  }
}
