import {isDdcParams, isSeriesCollection, isVideoMetadata} from '../../redux/modules/videos/types';
import {GuardType} from '../../utils/types/guard-type';
import {videoRestClient} from './video-rest-client';

export async function getVideos(url: string) {
  const response = await videoRestClient.makeRequest<GuardType<typeof isVideoMetadata>[]>('get', url, isVideoMetadata);
  if (response) {
    return response;
  }
  throw Error(`Empty response ${url}`);
}

export async function getDdcParams(url: string) {
  const response = await videoRestClient.makeRequest<GuardType<typeof isDdcParams>>('get', url, isDdcParams);
  if (response) {
    return response;
  }
  throw Error(`Empty response ${url}`);
}

export async function getVideoSeries(url: string) {
  const response = await videoRestClient.makeRequest<GuardType<typeof isSeriesCollection>[]>(
    'get',
    url,
    isSeriesCollection,
  );
  if (response) {
    return response;
  }
  throw Error(`Empty response ${url}`);
}
