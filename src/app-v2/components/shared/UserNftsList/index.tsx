import {NftType} from '@cere/services-types';
import {FullCreatorInterface} from '@cere/services-types';
import {Box, Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {useLocalization} from '../../../hooks/use-locale.hook';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {UsersNftCardInterface} from '../../../types/nft';
import {useRenderCardPriceBadge} from '../Card/useRenderCardElements';
import {CardSmall} from '../CardSmall';
import {ReactComponent as EmptyList} from './emptyNfts.svg';

const useStyles = makeStyles((theme) => ({
  ownedCount: {
    width: 'fit-content',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.info.light,
    padding: '0 4px',
    borderRadius: '4px',
  },
  emptyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 16px 60px',
  },
  emptyText: {
    fontSize: '14px',
    color: theme.palette.grey[700],
    textAlign: 'center',
    padding: '27px 0 32px',
  },
  button: {
    width: '160px',
    height: '36px',
  },
  exploreButton: {
    textTransform: 'none',
    height: '48px',
    width: '100%',
    maxWidth: '311px',
  },
}));

type Props = {
  nfts: UsersNftCardInterface[];
  randomCreator: FullCreatorInterface;
};

export const UserNftsList = memo(({nfts, randomCreator}: Props) => {
  const {t, locale} = useLocalization();
  const styles = useStyles();
  const {isMobile} = useThemeBreakpoints();
  const history = useHistory();

  const renderPrice = useRenderCardPriceBadge();

  const handleButtonClick = useCallback(() => {
    if (!randomCreator) return;
    history.push(`/${locale}/home/creator/${randomCreator.id}`);
  }, [history, locale, randomCreator]);

  if (nfts.length === 0) {
    return (
      <Box className={styles.emptyBox}>
        <EmptyList />
        <Typography className={styles.emptyText}>
          {t('You do not yet own any collectibles.')}
          <br />
          {t(
            'Discover the ongoing exhibits and buy an access collectible to gain access to more exclusive collectibles',
          )}
        </Typography>
        <Button variant="contained" color="default" className={styles.exploreButton} onClick={handleButtonClick}>
          {t('Explore Artists')}
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={isMobile ? 2 : 4}>
      {nfts.map((nft) => (
        <Grid key={nft.id} item xs={6} lg={3}>
          <CardSmall
            nftId={nft.id}
            title={nft.title}
            description={
              nft.nftType === NftType.AUCTIONED ? (
                <Typography variant="caption" color="textSecondary" style={{fontWeight: 500}}>
                  {t('1 Auctioned Original')}
                </Typography>
              ) : (
                <Box display="flex" alignItems="flex-end" gridGap={2}>
                  <Typography variant="caption" color="textSecondary" style={{lineHeight: '15px'}}>
                    {nft.balance || 0}
                  </Typography>
                  <Typography variant="overline" color="textSecondary">
                    {' '}
                    / {nft.supply || 0} left
                  </Typography>
                </Box>
              )
            }
            priceElement={renderPrice(nft.auctionStatus, nft.priceUsd)}
          />
        </Grid>
      ))}
    </Grid>
  );
});
