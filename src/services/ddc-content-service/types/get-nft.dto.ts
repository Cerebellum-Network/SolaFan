import {NftAsset} from '../../../shared/types/metadata';

export interface GetNftMetadataResponse {
  content: (NftAsset & {index?: number})[];
}

export interface GetContentResponse {
  content: Buffer;
  contentType: string;
}

export type ContentType = 'image/png' | 'image/jpeg' | 'application/json';
