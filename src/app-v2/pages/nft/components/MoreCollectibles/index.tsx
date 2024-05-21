import {NftCardInterface} from '@cere/services-types';
import {Grid, makeStyles} from '@material-ui/core';
import {shuffle} from 'lodash';
import {memo, useMemo} from 'react';

import {ConnectedCardHorizontal} from '../../../../components/connected/ConnectedCardHorizontal';
import {byNftAvailability, nftWillBeAvailableLater} from '../../../../utils/helpers/nft-availability';

type Props = {
  nftList: NftCardInterface[];
  limit?: number;
  userWalletAddress: string | null;
};

const useStyles = makeStyles(() => ({
  disabled: {
    opacity: 0.2,
  },
}));

export const MoreCollectibles = memo(({nftList, limit = 3, userWalletAddress}: Props) => {
  const renderList = useMemo(
    () => (nftList?.length <= limit ? nftList : shuffle(nftList).slice(0, limit)).sort(byNftAvailability),
    [nftList, limit],
  );
  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      {renderList.map((nft) => (
        <Grid key={nft.id} item xs={12} lg={4} className={nftWillBeAvailableLater(nft) ? styles.disabled : undefined}>
          <ConnectedCardHorizontal
            nftId={nft.id}
            userWalletAddress={userWalletAddress}
            hidePrice={nftWillBeAvailableLater(nft)}
          />
        </Grid>
      ))}
    </Grid>
  );
});

MoreCollectibles.displayName = 'MoreCollectibles';
