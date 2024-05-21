import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {memo} from 'react';

import {ConnectedCard} from '../../../../components/connected/ConnectedCard';
import {CuratedRow} from '../../../../components/shared/CuratedRow';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '85vw',
    maxWidth: '300px',
    [theme.breakpoints.up('lg')]: {
      width: '360px',
      maxWidth: '360px',
    },
  },
}));

type Props = {
  featuredNftsIds: string[];
};

export const FeaturedListings = memo(({featuredNftsIds}: Props) => {
  const {t} = useLocalization();
  const {isDesktop, isMobile} = useThemeBreakpoints();

  const styles = useStyles();

  return (
    <CuratedRow title={t('Featured listings')} slidesPerView={isDesktop ? 3 : isMobile ? 1 : 2}>
      {featuredNftsIds.map((nftId) => (
        <Box key={nftId} className={styles.card}>
          <ConnectedCard nftId={nftId} />
        </Box>
      ))}
    </CuratedRow>
  );
});
