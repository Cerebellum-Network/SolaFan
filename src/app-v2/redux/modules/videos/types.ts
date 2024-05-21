import {isUrl, Url} from '../../../branded-types/url';
import {isRecord} from '../../../utils/types/is-record';
import {isPositiveNumber} from '../../../utils/types/numbers';
import {isString} from '../../../utils/types/strings';

type CollectionType = 'Season' | 'Series';

const isCollectionType = (val: unknown): val is CollectionType => val === 'Season' || val === 'Series';

type Collection = {
  id: number;
  name: string;
  type: CollectionType;
};

const isCollection = (val: unknown): val is Collection =>
  isRecord(val) && isPositiveNumber(val.id) && isString(val.name) && isCollectionType(val.type);

export type SeriesCollection = {
  id: number;
  name: string;
  metadata: {
    coverCid: string;
    description: string;
  };
  seasons: unknown[];
};

export const isSeriesCollection = (val: unknown): val is SeriesCollection =>
  isRecord(val) &&
  isPositiveNumber(val.id) &&
  isString(val.name) &&
  isRecord(val.metadata) &&
  isString(val.metadata.coverCid) &&
  isString(val.metadata.description) &&
  Array.isArray(val.seasons);

export type VideoMetadata = {
  id: number;
  videoCid: string;
  coverCid: string;
  videoTitle: string;
  videoDescription: string;
  collections: Collection[];
};

export const isVideoMetadata = (val: unknown): val is VideoMetadata =>
  isRecord(val) &&
  isPositiveNumber(val.id) &&
  isString(val.videoCid) &&
  isString(val.coverCid) &&
  isString(val.videoTitle) &&
  isString(val.videoDescription) &&
  Array.isArray(val.collections) &&
  val.collections.every(isCollection);

export type DdcParams = {
  cdnUrl: Url;
  publicBucketId: number;
};

export const isDdcParams = (val: unknown): val is DdcParams =>
  isRecord(val) && isUrl(val.cdnUrl) && isPositiveNumber(val.publicBucketId);
