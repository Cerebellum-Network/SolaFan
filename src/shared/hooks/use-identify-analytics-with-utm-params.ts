import {useCallback} from 'react';

import {utmRawToUtmMapper} from '../mappers/utm.mapper';
import analyticService, {saveUtmData} from '../services/analytic.service';
import {UtmDataRaw} from '../types/utm';

export const useIdentifyAnalyticsWithUtmParams = (jwtToken: string | undefined) => {
  return useCallback(
    async (email: string) => {
      if (!localStorage.getItem('UTM_TRACKED')) {
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;
        const utmData: UtmDataRaw = {
          utm_source: searchParams.get('utm_source') ?? '',
          utm_medium: searchParams.get('utm_medium') ?? '',
          utm_campaign: searchParams.get('utm_campaign') ?? '',
        };
        if (jwtToken) {
          await saveUtmData(jwtToken, utmRawToUtmMapper(utmData));
        } else {
          console.error('Failed to send utm data because jwtToken not found');
        }

        analyticService.identify({email}, utmData);
        localStorage.setItem('UTM_TRACKED', '1');
        searchParams.delete('utm_source');
        searchParams.delete('utm_medium');
        searchParams.delete('utm_campaign');
        window.history.replaceState({}, '', currentUrl.href);
      }
    },
    [jwtToken],
  );
};
