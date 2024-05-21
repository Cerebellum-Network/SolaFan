import {Grid, GridSize} from '@material-ui/core';
import {memo} from 'react';

import {CardSkeleton} from './CardSkeleton';

type Props = {
  xs?: GridSize;
  md?: GridSize;
  lg?: GridSize;
};

export const NftCollectiblesSkeleton = memo(({xs, md, lg}: Props) => {
  return (
    <Grid container spacing={2}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Grid key={`key=${index}`} item xs={xs ?? 6} md={md ?? 6} lg={lg ?? 3}>
            <CardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
});
