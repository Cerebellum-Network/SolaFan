import {AxiosInstance} from 'axios';

export const createTranslationsApi = (api: AxiosInstance) => {
  const getTranslationsByLocale = async (locale: string): Promise<Record<string, string>> => {
    try {
      const {data: response} = await api.get(`/translations?locale=${locale}`);
      const translations = response.data;
      return translations ?? {};
    } catch (e) {
      console.error('Error loading translations:', e);
      return {};
    }
  };

  return {
    getTranslationsByLocale,
  };
};
