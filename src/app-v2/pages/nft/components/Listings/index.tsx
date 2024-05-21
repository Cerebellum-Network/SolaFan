import {Box, Divider, Grid, GridSize, makeStyles, Typography} from '@material-ui/core';
import {Fragment, memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {NftOrder} from '../../../../api/orders/types';
import {AvatarWithName} from '../../../../components/primitives/AvatarWithName/avatar-with-name';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import {getDottedDate, getTime} from '../../../../utils/helpers/time';
import {ReactComponent as NotFoundImage} from './assets/notFound.svg';
import {ReactComponent as USDC} from './assets/usdc.svg';
import {useRenderListingActionButton} from './useRenderListingActionButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 12px',
  },
  mobileBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
    gap: '12px',
    [theme.breakpoints.up('md')]: {
      padding: '24px 0',
    },
  },
  mobileListingValue: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '14px',
    },
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  creatorBox: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%',
    },
  },
  greyText: {
    color: theme.palette.grey[700],
  },
}));

type Props = {
  nfts: NftOrder[];
};

export const Listings = memo(({nfts}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();

  const renderActionButton = useRenderListingActionButton();

  const renderedOptions = useMemo(
    () => [
      {
        title: <Typography className={styles.title}>{t('Price')}</Typography>,
        renderData: (nft: NftOrder) => (
          <Typography className={styles.priceBox}>
            <USDC />
            <span>
              <span>{nft.price}</span>
              <span className={styles.greyText}>{t('USDC')}</span>
            </span>
          </Typography>
        ),
        desktopGridSize: 2 as GridSize,
      },
      {
        title: <Typography className={styles.title}>{t('USD price')}</Typography>,
        renderData: (nft: NftOrder) => <Typography className={styles.greyText}> ${nft.price}</Typography>,
        desktopGridSize: 2 as GridSize,
      },
      {
        title: <Typography className={styles.title}>{t('Seller')}</Typography>,
        renderData: (nft: NftOrder) => (
          <Box className={styles.creatorBox}>
            <AvatarWithName creator={nft.creator as any} />
          </Box>
        ),
        desktopGridSize: 2 as GridSize,
      },
      {
        title: <Typography className={styles.title}>{t('Qty')}</Typography>,
        renderData: (nft: NftOrder) => <Typography className={styles.greyText}> {nft.quantity}</Typography>,
        desktopGridSize: 1 as GridSize,
      },
      {
        title: <Typography className={styles.title}>{t('Timestamp')}</Typography>,
        renderData: (nft: NftOrder) => (
          <Typography className={styles.greyText}>{`${getDottedDate(nft.timestamp)}, ${getTime(
            nft.timestamp,
          )}`}</Typography>
        ),
        desktopGridSize: 3 as GridSize,
      },
      {
        title: <></>,
        renderData: () => renderActionButton(),
        desktopGridSize: 2 as GridSize,
      },
    ],
    [renderActionButton, styles, t],
  );

  if (nfts.length === 0) {
    return <NotFoundImage />;
  }

  if (isDesktop) {
    return (
      <Box className={styles.root}>
        <Grid container spacing={2}>
          {renderedOptions.map(({title, desktopGridSize}, index) => (
            <Grid key={index} item xs={desktopGridSize}>
              {title}
            </Grid>
          ))}

          {nfts.map((nft) => (
            <Fragment key={nft.timestamp}>
              {renderedOptions.map(({renderData, desktopGridSize}, index) => (
                <Grid key={index} item xs={desktopGridSize}>
                  {renderData(nft)}
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box className={styles.root}>
      {nfts.map((nft, index) => (
        <Fragment key={nft.timestamp}>
          {index !== 0 && <Divider />}
          <Box className={styles.mobileBox}>
            {renderedOptions.map(({title, renderData}, index) => (
              <Box key={index} className={styles.mobileListingValue}>
                {title}
                {renderData(nft)}
              </Box>
            ))}
          </Box>
        </Fragment>
      ))}
    </Box>
  );
});
