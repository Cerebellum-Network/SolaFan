import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useSWR from 'swr';

import {SetVideosDocument, SetVideosErrorDocument, SetVideosLoadingDocument} from '../../redux/modules/videos/actions';
import {getVideos} from './api';

export function useFeaturedVideos(limit: number = 0) {
  const dispatch = useDispatch();
  const {
    data: videos,
    isLoading,
    error,
    mutate,
  } = useSWR(limit > 0 ? `video/metadata?take=${limit}` : 'video/metadata', getVideos);

  useEffect(() => {
    dispatch(SetVideosDocument.create(videos || []));
    return () => {
      dispatch(SetVideosDocument.create([]));
    };
  }, [dispatch, videos]);

  useEffect(() => {
    dispatch(SetVideosLoadingDocument.create(isLoading));
    return () => {
      dispatch(SetVideosLoadingDocument.create(false));
    };
  }, [dispatch, isLoading]);

  useEffect(() => {
    dispatch(SetVideosErrorDocument.create(error));
    return () => {
      dispatch(SetVideosErrorDocument.create(null));
    };
  }, [dispatch, error]);

  return mutate;
}
