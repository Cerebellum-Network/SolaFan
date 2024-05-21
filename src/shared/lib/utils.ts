import dayjs from 'dayjs';

import {ENV} from '../../config/common';

const cropHexAddress = (address: string, startSymbols = 7, endSymbols = 3): string => {
  const start = address.substring(0, startSymbols);
  const end = address.slice(-1 * endSymbols);

  return `${start}...${end}`;
};

const pad = (n: number, zeros: number = 2): string => {
  return ('00' + n).slice(-zeros || 2);
};

const format = (s: number): string => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

const formatDate = (s: string) => {
  const date = new Date(s);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};

export const formatDateShort = (date: Date) => `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})}`;

const getLocaleShortDay = (date: string) => {
  return new Date(date).toLocaleString('en-us', {
    month: 'short',
    day: '2-digit',
  });
};

const getLocaleMonth = (date: string) => {
  return new Date(date).toLocaleString('en-us', {month: 'short'});
};

const getLocaleDay = (date: string) => {
  return new Date(date).toLocaleString('en-us', {day: '2-digit'});
};

const getDottedDate = (date: string) => {
  return dayjs(new Date(date)).format('MM.DD.YYYY');
};

const getDottedDateAndTime = (date: string) => {
  return dayjs(new Date(date)).format('MM.DD.YYYY, h:mm:ss A');
};

const getFutureDate = (days: number = 0, hours: number = 0, mins: number = 0) => {
  const startsAt = new Date();
  startsAt.setDate(startsAt.getDate() + days);
  startsAt.setHours(startsAt.getHours() + hours);
  startsAt.setMinutes(startsAt.getMinutes() + mins);

  return startsAt;
};

const valueByEnv = (envValueMap: Record<string, unknown>) => {
  if (typeof envValueMap !== 'object' || envValueMap === null) {
    throw new Error('Should be an object!');
  }

  if (!envValueMap[ENV]) {
    throw new Error(`Unknown ENV: ${ENV}`);
  }

  return envValueMap[ENV];
};

const copyToClipboard = (
  event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement> | React.MouseEvent<SVGSVGElement>,
  input: string,
  cb: Function,
) => {
  event.preventDefault();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input).then(
      () => {
        console.log('Copied to clipboard successfully.');
        cb();
      },
      (err) => {
        console.log('Failed to copy the text to clipboard.', err);
      },
    );
  }
};

export const attachFileForDownload = (url: string, name = 'cere'): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};

export const getNumberFromString = (value: string): number => Number(value.replace(/[^0-9.,]/g, ''));

export const roundNumber = (value: number, digits = 2) =>
  Math.round((value + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);

export const getQuerySearchParam = (search: string = '', name: string = '') => new URLSearchParams(search).get(name);

export {
  copyToClipboard,
  cropHexAddress,
  format,
  formatDate,
  getDottedDate,
  getDottedDateAndTime,
  getFutureDate,
  getLocaleDay,
  getLocaleMonth,
  getLocaleShortDay,
  pad,
  valueByEnv,
};
