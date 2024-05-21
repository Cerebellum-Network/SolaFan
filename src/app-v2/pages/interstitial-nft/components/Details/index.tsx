import {NftCardInterface} from '@cere/services-types';
import {Box, Grid, Link, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {getMaticNetworkUrl} from '../../../../utils/helpers/getMaticNetworkUrl';
import {getSmartContractAddress} from '../../../../utils/helpers/getSmartContractAddress';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '16px 24px',
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
  },
  value: {
    display: 'inline-block',
    width: '100%',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      textAlign: 'end',
    },
  },
  link: {
    textDecoration: 'underline',
  },
  greyColor: {
    color: theme.palette.grey[700],
  },
  blackColor: {
    color: theme.palette.text.primary,
  },
}));

type Props = {
  nft: NftCardInterface;
};

export const Details = memo(({nft}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const networkUrl = getMaticNetworkUrl();
  const contractAddress = getSmartContractAddress();

  const link = useMemo(
    () => `${networkUrl}token/${contractAddress}?a=${nft.id}`,
    [contractAddress, networkUrl, nft.id],
  );

  const collectionLink = useMemo(
    () => `${networkUrl}token/${nft.collectionAddress}`,
    [networkUrl, nft.collectionAddress],
  );

  const renderData = useMemo(
    () => [
      {
        title: t('Contract adress'),
        data: (
          <Link href={link} className={clsx(styles.value, styles.link)}>
            {contractAddress}
          </Link>
        ),
      },
      {
        title: t('Collectible ID'),
        data: (
          <Link href={link} className={clsx(styles.value, styles.link)}>
            {nft.address}
          </Link>
        ),
      },
      {
        title: t('Token standard'),
        data: <Typography className={clsx(styles.value, styles.greyColor)}>{t('ERC-1155')}</Typography>,
      },
      {
        title: t('Blockchain'),
        data: <Typography className={clsx(styles.value, styles.greyColor)}>{t('Polygon')}</Typography>,
      },
      {
        title: t('Total quantity'),
        data: <Typography className={clsx(styles.value, styles.greyColor)}>{nft.supply}</Typography>,
      },
      {
        title: t('Collection'),
        data: (
          <Link href={collectionLink} className={clsx(styles.value, styles.link)}>
            {nft.collectionAddress}
          </Link>
        ),
      },
    ],
    [contractAddress, collectionLink, link, nft.collectionAddress, nft.address, nft.supply, styles, t],
  );

  return (
    <Box className={styles.root}>
      {renderData.map(({title, data}) => (
        <Grid key={title} container spacing={2}>
          <Grid item xs={6} md={3} lg={2}>
            <Typography className={styles.title}>{title}</Typography>
          </Grid>
          <Grid item xs={6} md={5} lg={5}>
            {data}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
});
