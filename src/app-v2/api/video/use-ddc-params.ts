import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useSWR from 'swr';

import {SetVideoDdcParamsDocument} from '../../redux/modules/videos/actions';
import {getDdcParams} from './api';

export function useDdcParams() {
  const dispatch = useDispatch();
  const {data: params, mutate} = useSWR('video/ddc/params', getDdcParams, {
    revalidateOnFocus: false,
    errorRetryCount: 5,
    errorRetryInterval: 1000,
  });
  useEffect(() => {
    if (params) {
      dispatch(SetVideoDdcParamsDocument.create(params));
    }
  }, [dispatch, params]);
  return mutate;
}
