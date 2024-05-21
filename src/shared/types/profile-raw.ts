import {isRecord} from './is-record';

export type ProfileRaw = {
  address: string;
  name: string;
  avatarBase64Img: string;
  about: string;
  customFields: string[];
};

export const isProfileRaw = (val: unknown): val is ProfileRaw =>
  isRecord(val) &&
  val.address !== undefined &&
  val.name !== undefined &&
  val.avatarBase64Img !== undefined &&
  val.about !== undefined &&
  typeof val.customFields === 'object';
