import {NftCardInterface} from '@cere/services-types';
import {Grid, makeStyles} from '@material-ui/core';
import {memo, Ref} from 'react';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {byNftAvailability, nftWillBeAvailableLater} from '../../../utils/helpers/nft-availability';
import {ConnectedCard} from '../../connected/ConnectedCard';

type Props = {
  nfts: NftCardInterface[];
  onShareNft: (nftId: string) => void;
  onLikeNft: (nftId: string) => void;
  nftsEventBlockRef: Ref<HTMLDivElement> | null;
};

const useStyles = makeStyles(() => ({
  disabled: {
    opacity: 0.2,
  },
}));

export const NftsEventBlock = memo(({nfts, nftsEventBlockRef}: Props) => {
  const sortedNfts = nfts.sort(byNftAvailability);
  const styles = useStyles();
  return (
    <Grid container spacing={2} ref={nftsEventBlockRef}>
      {sortedNfts.map((nft) => (
        <Grid
          key={nft.id}
          item
          xs={12}
          md={6}
          lg={4}
          className={nftWillBeAvailableLater(nft) ? styles.disabled : undefined}
        >
          <ConnectedCard nftId={nft.id} buyBtnEvent={GoogleAnalyticsId.CollectibleBuyBtn} />
        </Grid>
      ))}
    </Grid>
  );
});
