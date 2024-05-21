import {createSelector} from 'reselect';

import {main} from './reducers';

export type State = Record<'videos', ReturnType<typeof main>>;

const videos = (state: State) => state.videos;
const home = createSelector(videos, (videos) => videos.home);

const getVideos = createSelector(home, (root) => root.videos);
export const getVideosList = createSelector(getVideos, (videos) => videos.list);
export const getVideosListIsLoading = createSelector(getVideos, (videos) => videos.loading);

const getParams = createSelector(videos, (videos) => videos.ddcParams);
export const getDdcCdnUrl = createSelector(getParams, (params) => params.cdnUrl);
export const getDdcPublicBucket = createSelector(getParams, (params) => params.publicBucketId);

export const getSeries = createSelector(home, (home) => home.series);
export const getSeriesList = createSelector(getSeries, (series) => series.list);
export const getSeriesIsLoading = createSelector(getSeries, (series) => series.loading);
