import {cx} from '@linaria/core';
import {Box, makeStyles, Theme} from '@material-ui/core';

import {UsersNftCardInterface} from '../../../types/nft';
import {ResponsiveImage} from '../ResponsiveImage/responsive-image';
import {Skeleton} from '../Skeleton';

const useStyles = makeStyles<Theme, {borderRadius?: string}>(() => ({
  image: {
    borderRadius: ({borderRadius}) => (borderRadius !== '' ? borderRadius : '12px'),
  },
}));

type Props = {
  nft: UsersNftCardInterface;
  size?: number;
  borderRadius?: string;
  isLoading?: boolean;
  onLoadImage?: () => void;
};

export const ImageSquareResponsive = ({nft, size, borderRadius = '', isLoading = false, onLoadImage}: Props) => {
  const styles = useStyles({borderRadius});

  return (
    <Box className="relative w-full aspect-square overflow-hidden">
      <Box className="w-full h-full absolute">
        {isLoading ? (
          <Skeleton variant="rect" className="h-full" height="100%" />
        ) : (
          <ResponsiveImage
            size={size}
            className={cx(styles.image, 'w-full', 'h-full', 'bg-no-repeat', 'bg-auto', 'object-cover')}
            alt={nft.title}
            formats={nft.formats}
            fallbackUrl={nft.image ?? ''}
            onLoadImage={onLoadImage}
          />
        )}
      </Box>
    </Box>
  );
};
