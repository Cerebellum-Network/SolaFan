import {APP_APN, APP_IBI, APP_ISI, DYNAMIC_LINK_URL, webAppUrl} from '../../../../../config/common';

export const getShareUrl = (
  url: string,
  title: string,
  description: string,
  imageUrl: string,
  params?: {[key: string]: any},
) => {
  const searchParams = !params ? '' : `/${new URLSearchParams(params).toString()}`;
  const queryString = new URLSearchParams({
    link: `${webAppUrl()}${url}/${searchParams}`,
    apn: APP_APN(),
    ibi: APP_IBI(),
    isi: APP_ISI(),
    st: title,
    sd: description,
    si: imageUrl,
  }).toString();

  return `${DYNAMIC_LINK_URL()}?${queryString}`;
};
