import {TransfersWithParams} from '../../types/transfer';
import {IRESTClient} from '../api-clients/IRESTClient';
import {TransfersNotFoundError} from './TransfersNotFoundError';

export const createTransfersApi = (restClient: IRESTClient) => {
  const getNftTransfers = async (
    collectionAddress: string,
    nftId: string,
  ): Promise<TransfersWithParams[] | undefined> => {
    const transfers = await restClient.makeRequest<TransfersWithParams[]>(
      'get',
      `/transfers/${collectionAddress}/${nftId}`,
      () => true,
    );
    if (!transfers) {
      throw new TransfersNotFoundError();
    }
    return transfers;
  };

  return {
    getNftTransfers,
  };
};
