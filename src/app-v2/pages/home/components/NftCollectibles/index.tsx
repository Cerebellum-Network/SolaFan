import {Grid} from '@material-ui/core';
import {memo} from 'react';

import {ConnectedCard} from '../../../../components/connected/ConnectedCard';

type Props = {
  nftsIds: string[];
};

export const NftCollectibles = memo(({nftsIds}: Props) => {
  return (
    <Grid container spacing={2}>
      {nftsIds.map((nftId) => (
        <Grid key={nftId} item xs={6} md={6} lg={3}>
          <ConnectedCard nftId={nftId} />
        </Grid>
      ))}
    </Grid>
  );
});
