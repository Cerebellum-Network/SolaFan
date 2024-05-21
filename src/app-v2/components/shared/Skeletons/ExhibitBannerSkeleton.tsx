import {Box} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

export const ExhibitBannerSkeleton = () => {
  return (
    <Box className="flex flex-col sm:flex-row gap-2 w-full sm:px-0 px-4">
      <Box className="sm:w-full">
        <Skeleton variant="rect" height={416} />
      </Box>
      <Box className="sm:w-full">
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={200} />
      </Box>
    </Box>
  );
};
