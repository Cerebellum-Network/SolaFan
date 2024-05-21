import {Profile} from '../types/profile';
import {ProfileRaw} from '../types/profile-raw';

export const eventRawToProfileMapper = (event: ProfileRaw): Profile => ({
  address: event.address,
  name: event.name,
  avatarBase64Img: event.avatarBase64Img,
  about: event.about,
  customFields: event.customFields,
});
