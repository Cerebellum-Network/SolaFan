import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {memo} from 'react';
import {generatePath} from 'react-router-dom';

import {ConnectedNftCard} from '../../../../components/connected/ConnectedNftCard';
import {CuratedRow} from '../../../../components/shared/CuratedRow';
import {ROUTES} from '../../../../constants/routes';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100vw - 32px)',
    overflow: 'visible',
    [theme.breakpoints.up('md')]: {
      width: 'calc(50vw - 32px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: '332px',
    },
  },
}));

type Props = {
  ids: string[];
  userWalletAddress: string | null;
};

export const TrendingListings = memo(({ids, userWalletAddress}: Props) => {
  const {t} = useLocalization();
  const {isDesktop, isMobile} = useThemeBreakpoints();

  const styles = useStyles();

  return (
    <CuratedRow
      title={t('Trending listings')}
      slidesPerView={isDesktop ? 3 : isMobile ? 1 : 2}
      gap={isMobile ? 8 : isDesktop ? 24 : 16}
    >
      {ids.map((id) => (
        <Box className={styles.card} key={`key=${id}`}>
          <ConnectedNftCard
            key={id}
            nftId={id}
            linkTo={(nftId, locale) => generatePath(ROUTES.NFT_MARKETPLACE, {nftId, locale})}
            userWalletAddress={userWalletAddress}
          />
        </Box>
      ))}
    </CuratedRow>
  );
});
