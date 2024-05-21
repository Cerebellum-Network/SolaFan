import {Grid} from '@material-ui/core';
import {memo} from 'react';
import {generatePath} from 'react-router-dom';

import {ConnectedCard} from '../../../../components/connected/ConnectedCard';
import {ROUTES} from '../../../../constants/routes';
import {useLocalization} from '../../../../hooks/use-locale.hook';

type Props = {
  ids: string[];
};

export const NftCollectibles = memo(({ids}: Props) => {
  const {locale} = useLocalization();

  return (
    <Grid container spacing={2}>
      {ids.map((id) => (
        <Grid item key={`key=${id}`} xs={12} md={6} lg={4}>
          <ConnectedCard nftId={id} cardLink={generatePath(ROUTES.NFT_MARKETPLACE, {nftId: id, locale})} />
        </Grid>
      ))}
    </Grid>
  );
});
