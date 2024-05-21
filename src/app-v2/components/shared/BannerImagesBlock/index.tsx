import {Box, makeStyles} from '@material-ui/core';

import {isVideoUrl} from '../../../utils/helpers/checkIsImageUrl';

const useStyles = makeStyles(() => ({
  images: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image1: {
    height: '201px',
    width: '201px',
    objectFit: 'cover',
    position: 'absolute',
    zIndex: 7,
    top: '137px',
  },
  image2: {
    height: '255px',
    width: '255px',
    objectFit: 'cover',
    position: 'absolute',
    zIndex: 5,
    top: '30px',
    left: '82px',
  },
  image3: {
    height: '233px',
    width: '233px',
    objectFit: 'cover',
    position: 'absolute',
    zIndex: 7,
    top: '137px',
    left: '271px',
  },
}));

interface BannerImagesBlockProps {
  url1?: string;
  url2?: string;
  url3?: string;
}

export const BannerImagesBlock = ({url1, url2, url3}: BannerImagesBlockProps) => {
  const styles = useStyles();

  return (
    <Box className={styles.images}>
      {url1 &&
        (isVideoUrl(url1) ? (
          <video className={styles.image1} src={url1} />
        ) : (
          <img className={styles.image1} src={url1} alt="img1" />
        ))}

      {url2 &&
        (isVideoUrl(url2) ? (
          <video className={styles.image2} src={url2} />
        ) : (
          <img className={styles.image2} src={url2} alt="img2" />
        ))}

      {url3 &&
        (isVideoUrl(url3) ? (
          <video className={styles.image3} src={url3} />
        ) : (
          <img className={styles.image3} src={url3} alt="img3" />
        ))}
    </Box>
  );
};
