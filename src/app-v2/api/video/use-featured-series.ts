import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useSWR from 'swr';

import {
  SetVideoSeriesDocument,
  SetVideoSeriesErrorDocument,
  SetVideoSeriesLoadingDocument,
} from '../../redux/modules/videos/actions';
import {getVideoSeries} from './api';

export function useFeaturedSeries() {
  const dispatch = useDispatch();
  const {data: series, isLoading, error, mutate} = useSWR('video/video-collections/series', getVideoSeries);

  useEffect(() => {
    dispatch(SetVideoSeriesDocument.create(series || []));
    return () => {
      dispatch(SetVideoSeriesDocument.create([]));
    };
  }, [dispatch, series]);

  useEffect(() => {
    dispatch(SetVideoSeriesLoadingDocument.create(isLoading));
    return () => {
      dispatch(SetVideoSeriesLoadingDocument.create(false));
    };
  }, [dispatch, isLoading]);

  useEffect(() => {
    dispatch(SetVideoSeriesErrorDocument.create(error));
    return () => {
      dispatch(SetVideoSeriesErrorDocument.create(null));
    };
  }, [dispatch, error]);

  return mutate;
}
