import {IRESTClient} from '../api-clients/IRESTClient';
import {CollectorProfile} from './types';

export class CollectorApi {
  constructor(private readonly client: IRESTClient) {}

  async getCollectedNftsExhibitionsCreators(locale: string, walletPublicKey?: string) {
    try {
      const data = await this.client.makeRequest<unknown>(
        'get',
        `/collected-nfts-exhibits-creators?locale=${locale}` +
          (walletPublicKey == null ? '' : `&walletPublicKey=${walletPublicKey}`),
        isCollectorProfile,
      );
      return (data ?? {}) as CollectorProfile;
    } catch (error) {
      console.error(error);
      throw new Error(`Profile fetch error: ${error.toString()}`);
    }
  }
}

export function createCollectorApi(client: IRESTClient) {
  return new CollectorApi(client);
}

function isCollectorProfile(data: unknown) {
  return (
    typeof data === 'object' &&
    data !== null &&
    'collectedNfts' in data &&
    'collectedExhibitions' in data &&
    'collectedCreators' in data
  );
}
