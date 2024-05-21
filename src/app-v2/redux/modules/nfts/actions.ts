import {NftCardInterface} from '@cere/services-types';

import {ShareNftModal} from '../../../components/connected/ShareNftModal';
import {BaseAction} from '../../base/BaseAction';

const NFTS = '[NFTS]';

export class LoadNftByIdCommand {
  static type = `${NFTS} Load NFT by id`;
  static create(id: string) {
    return {
      type: this.type,
      payload: id,
    };
  }
}

export class LoadNftsArrayByIdsCommand {
  static type = `${NFTS} Load NFTs array by ids`;

  static create(ids: string[]) {
    return {
      type: this.type,
      payload: ids,
    };
  }
}

export class LoadAllNftsCommand extends BaseAction {
  static type = `${NFTS} Load all NFTs`;
}

export class AddManyNftsCommand {
  static type = `${NFTS} Add many NFT`;
  static create(nfts: NftCardInterface[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class UpdateNftCommand {
  static type = `${NFTS} Update NFT`;
  static create(id: string, partialNftData: Partial<Omit<NftCardInterface, 'id'>>) {
    return {
      type: this.type,
      payload: {
        id,
        partialNftData,
      },
    };
  }
}

export class NftDocument {
  static type = `${NFTS} NFT document`;
  static create(nft: NftCardInterface) {
    return {
      type: this.type,
      payload: nft,
    };
  }
}

export class NftsDocument {
  static type = `${NFTS} NFTs document`;
  static create(nfts: NftCardInterface[] | undefined) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class ShowShareNftModalCommand {
  static type = `[MODAL] Share`;
  static create(nftId: string) {
    return {
      type: this.type,
      payload: {nftId},
      component: ShareNftModal,
    };
  }
}
