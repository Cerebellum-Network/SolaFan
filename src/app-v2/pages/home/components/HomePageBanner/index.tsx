import {Box, makeStyles} from '@material-ui/core';
import {memo} from 'react';

import {BannerItem, BannerTypes, EventBanner} from '../../../../api/home-page/types';
import {AutoplayBanner} from '../../../../components/shared/AutoplayBanner';
import {BannerEvent} from './BannerEvent';
import {BannerNft} from './BannerNft';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      width: '652px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1200px',
    },
  },
  slide: {
    position: 'relative',
    height: '440px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      height: '375px',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    objectFit: 'cover',
  },
}));

type Props = {
  entities: Array<BannerItem & {link: string}>;
  handleOpenNftInfo: (nftId: string) => void;
  handleOpenExhibitInfo: (nftId: string) => void;
};

export const HomePageBanner = memo(({entities, handleOpenNftInfo, handleOpenExhibitInfo}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AutoplayBanner>
        {entities.map((entity) => (
          <Box className={classes.slide}>
            <img src={(entity as EventBanner).image.url ?? entity.image} alt={entity.title} className={classes.image} />
            {entity.type === BannerTypes.NFT ? (
              <BannerNft
                link={entity.link}
                title={entity.title}
                description={entity.description}
                // TODO - add images from BFF
                additionalImages={[]}
                creatorName={entity.creatorName}
                creatorLogo={entity.creatorLogo}
                priceUSD={entity.priceUSD}
                handleOpenInfo={handleOpenNftInfo.bind(null, entity.id)}
              />
            ) : (
              <BannerEvent
                link={entity.link}
                title={entity.title}
                description={entity.description}
                // TODO - add images from BFF
                additionalImages={[]}
                startsAt={entity.startsAt}
                endsAt={entity.endsAt}
                handleOpenInfo={handleOpenExhibitInfo.bind(null, entity.id)}
              />
            )}
          </Box>
        ))}
      </AutoplayBanner>
    </Box>
  );
});
