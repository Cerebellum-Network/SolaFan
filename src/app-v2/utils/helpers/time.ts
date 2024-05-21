import dayjs from 'dayjs';

export const getDottedDate = (date: string) => {
  return dayjs(new Date(date)).format('MM.DD.YYYY');
};

export const getTime = (date: string) => {
  return dayjs(new Date(date)).format('h:mm:ss A');
};
