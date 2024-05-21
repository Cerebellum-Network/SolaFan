import {cx} from '@linaria/core';
import {Box, makeStyles, Theme} from '@material-ui/core';
import {memo} from 'react';

import {Skeleton} from '../Skeleton';

const useStyles = makeStyles<Theme, {borderRadius?: string}>(() => ({
  root: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
    overflow: 'hidden',
  },
  imageBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    objectFit: 'cover',
    borderRadius: ({borderRadius}) => borderRadius ?? '12px',
  },
  imageLoader: {
    height: '100%',
  },
}));

type Props = {
  image?: string;
  title?: string;
  borderRadius?: string;
  isLoading?: boolean;
  classes?: Partial<Record<'root' | 'imageBox' | 'image', string>>;
  onLoadImage?: () => void;
};

export const ImageSquare = memo(
  ({image, title, borderRadius = '12px', isLoading = false, classes, onLoadImage}: Props) => {
    const styles = useStyles({borderRadius});

    const handleImageLoad = () => {
      if (onLoadImage) {
        onLoadImage();
      }
    };

    return (
      <Box className={cx(styles.root, classes?.root)}>
        <Box className={cx(styles.imageBox, classes?.imageBox)}>
          {isLoading ? (
            <Skeleton variant="rect" className={styles.imageLoader} />
          ) : (
            <img className={cx(styles.image, classes?.image)} src={image} alt={title} onLoad={handleImageLoad} />
          )}
        </Box>
      </Box>
    );
  },
);

ImageSquare.displayName = 'ImageSquare';
