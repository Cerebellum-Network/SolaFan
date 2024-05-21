import i18next from 'i18next';

import {EventTypeEnum} from '../../types/exhibit';

export function eventTypeLocalized(eventType: EventTypeEnum, t: typeof i18next.t): string {
  if (eventType === 'content_drop') {
    return t('Content drop');
  }
  if (eventType === 'live_stream') {
    return t('Live stream');
  }
  if (eventType === 'in_person') {
    return t('In person');
  }
  return '';
}
