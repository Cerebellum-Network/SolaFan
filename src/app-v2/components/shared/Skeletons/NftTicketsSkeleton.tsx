import {Grid, GridSize} from '@material-ui/core';
import {memo} from 'react';

import {CardTicketSkeleton} from './CardTicketSkeleton';

type Props = {
  xs?: GridSize;
  md?: GridSize;
  lg?: GridSize;
};

export const NftTicketsSkeleton = memo(({xs, md, lg}: Props) => {
  return (
    <Grid container spacing={2}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Grid key={`key=${index}`} item xs={xs ?? 6} md={md ?? 6} lg={lg ?? 3}>
            <CardTicketSkeleton />
          </Grid>
        ))}
    </Grid>
  );
});
