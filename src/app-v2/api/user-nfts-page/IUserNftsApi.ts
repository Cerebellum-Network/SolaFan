import {UserWalletNftResult} from './types';

export interface IUserNftsApi {
  getNfts(queryParam: string[], locale: string): Promise<UserWalletNftResult[]>;
}
