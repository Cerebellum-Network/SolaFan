import {Box, makeStyles} from '@material-ui/core';
import {getDdcCdnUrl, getDdcPublicBucket, State} from 'app-v2/redux/modules/videos/selectors';
import {memo} from 'react';
import {connect} from 'react-redux';

import {useDdcParams} from '../../../../api/video/use-ddc-params';
import {Url} from '../../../../branded-types/url';
import {AutoplayBanner} from '../../../../components/shared/AutoplayBanner';
import {VideoMetadata} from '../../../../redux/modules/videos/types';
import {buildIFileUrl} from '../../../../utils/helpers/ddc';
import {FeaturedVideoBannerItem} from './FeaturedVideoBannerItem';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      width: '652px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1200px',
    },
  },
  slide: {
    position: 'relative',
    height: '440px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      height: '375px',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    objectFit: 'cover',
  },
}));

type Props = {
  cdnUrl: Url;
  publicBucket: number;
  entities: VideoMetadata[];
};

const FeaturedVideosBannerComponent = memo(({entities, cdnUrl, publicBucket}: Props) => {
  const classes = useStyles();

  useDdcParams();

  return (
    <Box className={classes.root}>
      <AutoplayBanner>
        {entities.map((entity) => (
          <Box key={entity.id} className={classes.slide}>
            <img
              src={buildIFileUrl(cdnUrl, publicBucket, entity.coverCid)}
              alt={entity.videoTitle}
              className={classes.image}
            />
            <FeaturedVideoBannerItem video={entity} />
          </Box>
        ))}
      </AutoplayBanner>
    </Box>
  );
});

export const FeaturedVideosBanner = connect((state: State) => ({
  cdnUrl: getDdcCdnUrl(state) as Url,
  publicBucket: getDdcPublicBucket(state),
}))(FeaturedVideosBannerComponent);
