import {useEffect} from 'react';

import {sendEvent} from '../lib/event-dispatcher';

const pageLoadedEvent = sendEvent.bind(null, {
  eventType: 'PAGE_LOADED',
  eventData: {},
});

// TODO write tests

const usePageLoaded = () => {
  useEffect(() => {
    pageLoadedEvent();
  }, []);
};

export {pageLoadedEvent, usePageLoaded};
