import ical from 'ical-generator';
import {AnyAction, MiddlewareAPI} from 'redux';

import {attachFileForDownload} from '../../../../shared/lib/utils';
import {AddToCalendarCommand} from './actions';

export const addToCalendarMiddleware =
  (_: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction): Promise<void> => {
    next(action);
    if (action.type === AddToCalendarCommand.type) {
      const {startsAt, endsAt, title, description, id} = action.payload;
      try {
        const calendar = ical();
        if (!startsAt) {
          console.error(`Exhibition with ID=${id} don't have startsAt property`);
          return;
        }

        calendar.createEvent({
          start: startsAt,
          url: window.location.href,
          ...(endsAt ? {end: endsAt} : {}),
          ...(title ? {summary: title} : {}),
          ...(description ? {description} : {}),
        });

        attachFileForDownload(calendar.toURL(), 'event');
      } catch (error) {
        console.error(error);
      } finally {
        console.log('Done');
      }
    }
  };
