import {AnyAction, combineReducers} from 'redux';

import {Url} from '../../../branded-types/url';
import {
  SetVideoDdcParamsDocument,
  SetVideosDocument,
  SetVideoSeriesDocument,
  SetVideoSeriesErrorDocument,
  SetVideoSeriesLoadingDocument,
  SetVideosErrorDocument,
  SetVideosLoadingDocument,
} from './actions';
import {isDdcParams, SeriesCollection, VideoMetadata} from './types';

export const videos = (state: VideoMetadata[] = [], action: AnyAction): VideoMetadata[] => {
  if (action.type === SetVideosDocument.type) {
    return action.payload as VideoMetadata[];
  }
  return state;
};

export const loading = (state: boolean = false, action: AnyAction): boolean => {
  if (action.type === SetVideosLoadingDocument.type) {
    return Boolean(action.payload);
  }
  return state;
};

export const error = (state: Error | null = null, action: AnyAction): Error | null => {
  if (action.type === SetVideosErrorDocument.type) {
    return action.payload instanceof Error ? action.payload : null;
  }
  return state;
};

export const cdnUrl = (state: Url | null = null, action: AnyAction): Url | null => {
  if (action.type === SetVideoDdcParamsDocument.type) {
    const payload = action.payload;
    return isDdcParams(payload) ? payload.cdnUrl : null;
  }
  return state;
};

export const publicBucketId = (state: number = 0, action: AnyAction): number => {
  if (action.type === SetVideoDdcParamsDocument.type) {
    const payload = action.payload;
    return isDdcParams(payload) ? payload.publicBucketId : 0;
  }
  return state;
};

export const videoSeries = (state: SeriesCollection[] = [], action: AnyAction): SeriesCollection[] => {
  if (action.type === SetVideoSeriesDocument.type) {
    return action.payload;
  }
  return state;
};

export const videoSeriesLoading = (state: boolean = false, action: AnyAction): boolean => {
  if (action.type === SetVideoSeriesLoadingDocument.type) {
    return action.payload;
  }
  return state;
};

export const videoSeriesError = (state: Error | null = null, action: AnyAction): Error | null => {
  if (action.type === SetVideoSeriesErrorDocument.type) {
    return action.payload ?? null;
  }
  return state ?? null;
};

export const main = combineReducers({
  home: combineReducers({
    videos: combineReducers({
      list: videos,
      loading,
      error,
    }),
    series: combineReducers({
      list: videoSeries,
      loading: videoSeriesLoading,
      error: videoSeriesError,
    }),
  }),
  ddcParams: combineReducers({
    cdnUrl,
    publicBucketId,
  }),
});
