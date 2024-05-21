import {AxiosInstance} from 'axios';
import {VipEventType} from 'shared/types/vipEvent';

export const createRealLifeEventApi = (api: AxiosInstance) => {
  const getRealLifeEvents = async (locale: string): Promise<VipEventType[] | undefined> => {
    const {data: response} = await api.get(`/real-life-events/for-user?locale=${locale}`);
    return response.data;
  };

  return {
    getRealLifeEvents,
  };
};
