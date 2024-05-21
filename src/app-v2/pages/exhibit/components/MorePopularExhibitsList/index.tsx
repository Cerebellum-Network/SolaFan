import {Box, Theme, useMediaQuery} from '@material-ui/core';
import {memo} from 'react';

import {GoogleAnalyticsId} from '../../../../../analytics-ids';
import {ConnectedEventCard} from '../../../../components/connected/ConnectedEventCard';
import {EventCardSmall} from '../../../../components/shared/EventCardSmall';
import {CmsExhibit} from '../../../../types/exhibit';

type Props = {
  exhibits: CmsExhibit[];
  onShareExhibit: (eventId: string) => void;
  variant: 'mobile' | 'desktop';
};

export const MorePopularExhibitsList = memo(({exhibits, variant}: Props) => {
  const isDesktopFromScreenSize = useMediaQuery<Theme>((theme) => `${theme.breakpoints.up('md')}`);
  const isDesktop = variant === 'desktop' || isDesktopFromScreenSize;

  if (!isDesktop) {
    return (
      <div className="flex flex-col w-full">
        {exhibits.map((exhibit) => (
          <EventCardSmall
            key={exhibit.slug}
            title={exhibit.title}
            image={exhibit.image.url}
            slug={exhibit.slug}
            id={exhibit.id}
            isEventLocked={!exhibit?.eventHiddenLocation || !exhibit.streamUrl}
            analyticEventId={GoogleAnalyticsId.UnlockEventBtn}
          />
        ))}
      </div>
    );
  }
  return (
    <Box className="whitespace-nowrap overflow-x-scroll no-scrollbar w-full">
      <Box className="flex flex-row gap-2.5 w-fit">
        {exhibits.map((exhibit, index) => (
          <Box key={`${exhibit.id}-${index}`}>
            <ConnectedEventCard slug={exhibit.slug} analyticEventId={GoogleAnalyticsId.UnlockEventBtn} />
          </Box>
        ))}
      </Box>
    </Box>
  );
});
