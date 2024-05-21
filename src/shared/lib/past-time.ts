import dayjs from 'dayjs';

import i18n from '../../i18n';

export const getPastTime = (data: string): string => {
  const sec = dayjs().diff(data, 'seconds');

  if (sec < 60) {
    return i18n.t(`{{count}} sec ago`, {count: sec});
  }

  const mins = dayjs().diff(data, 'minutes');

  if (mins < 60) {
    return i18n.t(`{{count}} mins ago`, {count: mins});
  }

  const hours = dayjs().diff(data, 'hours');

  if (hours < 24) {
    return i18n.t(`{{count}} hours ago`, {count: hours});
  }

  const days = dayjs().diff(data, 'days');

  return i18n.t(`{{count}} days ago`, {count: days});
};
