import {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from '../../../config/common';
import {LocalizationService} from './LocalizationService';
import {UserLocaleStorage} from './UserLocaleStorage';

export const localizationService = new LocalizationService(
  new UserLocaleStorage(),
  DEFAULT_LANGUAGE,
  AVAILABLE_LANGUAGES(),
);
