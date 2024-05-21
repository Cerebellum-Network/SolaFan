import {isRecord} from './is-record';
import {isString, isStringUrl} from './string';

/**
 * Defines the asset to be retrieved
 * - preview: The 'preview' asset in the NFT metadata
 * - asset: The 'encrypted' asset in the NFT metadata
 * - number: The index of the attached 'asset' in the NFT metadata
 */
export type AssetIdentifier = 'preview' | 'asset' | `preview-${number}` | `asset-${number}`;

export type NftAsset = {
  name: string;
  description: string;
  asset: string;
  preview: string;
  contentType?: string;
};

export const isNftAsset = (val: unknown): val is NftAsset =>
  isRecord(val) && isString(val.name) && isString(val.description) && isStringUrl(val.preview);

export type NftMetadata = Omit<NftAsset, 'asset' | 'contentType'> & {
  assets: NftAsset[];
};

export const isNftMetadata = (val: unknown): val is NftMetadata =>
  isRecord(val) && Array.isArray(val.assets) && val.assets.every(isNftAsset) && isNftAsset(val);
