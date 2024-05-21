import {UtmData, UtmDataRaw} from '../types/utm';

export const utmRawToUtmMapper = (utmData: UtmDataRaw): UtmData => ({
  utmSource: utmData.utm_source,
  utmMedium: utmData.utm_medium,
  utmCampaign: utmData.utm_campaign,
});
