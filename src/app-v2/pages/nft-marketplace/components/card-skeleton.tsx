import {Box} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';

export const CardSkeleton = () => {
  const {isMobile} = useThemeBreakpoints();

  return (
    <Box display="flex" flexDirection="column" gridGap="8px" style={{borderRadius: '12px', overflow: 'hidden'}}>
      <Box display="flex" gridGap="4px">
        <Box flex={1}>
          <Skeleton variant="rect" height="325px" />
        </Box>
        {!isMobile && (
          <Box flex={1}>
            <Skeleton variant="rect" height="325px" />
          </Box>
        )}
      </Box>
      <Skeleton height="200px" />
    </Box>
  );
};
