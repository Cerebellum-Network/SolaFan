import {Grid} from '@material-ui/core';

import {CardHorizontalSkeleton} from './CardHorizontalSkeleton';

export const CardsHorizontalListSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Grid key={`key=${i}`} item xs={12} lg={4}>
            <CardHorizontalSkeleton />
          </Grid>
        ))}
    </Grid>
  );
};
