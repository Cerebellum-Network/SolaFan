import {cx} from '@linaria/core';
import {Box, makeStyles, Theme} from '@material-ui/core';

import {REACT_APP_SHOW_COLLECTION_PROGRESS} from '../../../../config/common';
import {CmsExhibit} from '../../../types/exhibit';
import {ConnectedEventUnlockProgress} from '../../connected/EventUnlockProgress';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';

export const useStyles = makeStyles<Theme>((theme) => ({
  backgroundImage: {
    padding: '0 20%',
    '& > .event-banner-image': {
      objectFit: 'cover',
      height: 'inherit',
    },
    [theme.breakpoints.down('md')]: {
      height: '258px',
      borderRadius: '12px 12px 0 0',
    },
  },
  image: {
    height: '416px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      maxHeight: '258px',
    },
  },
}));
export const EventBanner = ({event}: {event: CmsExhibit}) => {
  const styles = useStyles();
  return (
    <div className={cx(styles.backgroundImage, 'relative', 'w-full', 'h-full')}>
      <ResponsiveImage
        className="absolute top-0 left-0 w-full h-full z-0 object-cover"
        formats={event.live_theme?.background?.formats}
        fallbackUrl={event.live_theme?.background?.url}
      />
      <ResponsiveImage
        size={500}
        formats={event.image.formats}
        fallbackUrl={event.image.url}
        alt="Exhibit"
        className={cx(styles.image, 'event-banner-image', 'relative', 'z-1')}
      />
      {REACT_APP_SHOW_COLLECTION_PROGRESS && (
        <Box className="absolute z-1 bottom-2 left-2 right-2">
          <ConnectedEventUnlockProgress eventSlug={event.slug} />
        </Box>
      )}
    </div>
  );
};
