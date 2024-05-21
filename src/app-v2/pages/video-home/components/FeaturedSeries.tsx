import {makeStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createTheme';
import {connect} from 'react-redux';

import {Url} from '../../../branded-types/url';
import {getDdcCdnUrl, getDdcPublicBucket, State} from '../../../redux/modules/videos/selectors';
import {SeriesCollection} from '../../../redux/modules/videos/types';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {buildIFileUrl} from '../../../utils/helpers/ddc';
import bluePlayIcon from './blue-play-icon.svg';
import wishlistIcon from './wishlist-icon.svg';

type Props = {
  series: SeriesCollection[];
  cdnUrl: Url | null;
  publicBucket: number;
};

const getPostfix = (num: number) => (num % 10 === 1 ? 'season' : 'seasons');

const useStyles = makeStyles<Theme, {count: number}>((theme) => ({
  box: {
    display: 'grid',
    paddingTop: 16,
    gap: 32,
    gridTemplateColumns: ({count}) => `repeat(${count}, 1fr)`,

    [theme.breakpoints.down('md')]: {
      gap: 16,
      paddingTop: 8,
      margin: '0 auto',
    },
  },
  item: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 100,
    boxSizing: 'border-box',
    boxShadow: '0 4px 20px rgba(0, 0, 0, .12)',
  },
  content: {
    padding: '16px 12px',

    '& > h4': {
      fontSize: 18,
      margin: 0,
      color: theme.palette.grey['700'],
    },

    '& > p': {
      margin: 0,
      fontSize: 16,
      color: theme.palette.grey['500'],
    },
  },
  imageBox: {
    position: 'relative',
    aspectRatio: '16 / 9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > img': {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  play: {
    border: 'none',
    position: 'relative',
    zIndex: 5,
    background: 'transparent',
    cursor: 'pointer',
  },
  wishlist: {
    border: 'none',
    zIndex: 5,
    background: 'transparent',
    cursor: 'pointer',
    position: 'absolute',
    top: 12,
    right: 12,
  },
}));

function FeaturedSeriesComponent({series, cdnUrl, publicBucket}: Props) {
  const {isMobile, isTablet} = useThemeBreakpoints();
  const count = isMobile ? 1 : isTablet ? 2 : 3;

  const styles = useStyles({count});

  return (
    <div className={styles.box}>
      {series.map((collection) => (
        <div className={styles.item} key={collection.id}>
          <div className={styles.imageBox}>
            <img src={buildIFileUrl(cdnUrl, publicBucket, collection.metadata.coverCid)} alt={collection.name} />
            <button className={styles.play}>
              <img width={56} height={56} alt="" src={bluePlayIcon} />
            </button>
            <button className={styles.wishlist}>
              <img width={30} height={30} alt="" src={wishlistIcon} />
            </button>
          </div>
          <div className={styles.content}>
            <h4>{collection.name}</h4>
            <p>
              {collection.seasons.length} {getPostfix(collection.seasons.length)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const FeaturedSeries = connect((state: State) => ({
  cdnUrl: getDdcCdnUrl(state),
  publicBucket: getDdcPublicBucket(state),
}))(FeaturedSeriesComponent);
