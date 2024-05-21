import {NftCardInterface} from '@cere/services-types';

import {isRecord} from '../../../shared/types/is-record';
import {isNotEmptyString} from '../../../shared/types/string';
import {isPositiveNumber} from '../types/numbers';

export const isNftCardInterface = (data: unknown): data is NftCardInterface =>
  isRecord(data) &&
  isNotEmptyString(data.id) &&
  isNotEmptyString(data.address) &&
  isNotEmptyString(data.creatorId) &&
  isNotEmptyString(data.creatorName) &&
  isNotEmptyString(data.minter) &&
  isNotEmptyString(data.auctionStatus) &&
  isNotEmptyString(data.nftType) &&
  isNotEmptyString(data.title) &&
  isNotEmptyString(data.description) &&
  isPositiveNumber(data.price) &&
  isPositiveNumber(data.priceUsd) &&
  isNotEmptyString(data.priceType) &&
  isNotEmptyString(data.availability);
