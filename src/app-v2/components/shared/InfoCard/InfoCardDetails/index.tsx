import {Typography} from '@cere/rxb-template-ui-kit';
import {NftType} from '@cere/services-types';
import {Box} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';

import {useStyles, useStylesNftDetails} from './styles';

type CollectionsProps = {
  title: string;
  qtyOwned: number;
  nftType?: NftType;
  isNftDetails?: boolean;
  priceUsd?: number;
  hasBids?: boolean;
};

export const InfoCardDetails = ({
  title,
  nftType,
  isNftDetails = false,
  qtyOwned,
  priceUsd,
  hasBids,
}: CollectionsProps) => {
  const {t} = useLocalization();
  const classes = useStyles();
  const nftDetailsClasses = useStylesNftDetails();
  return (
    <Box>
      <Box>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
      </Box>
      <Box className={clsx(classes.infoWrapper, {[nftDetailsClasses.infoWrapper]: isNftDetails})}>
        <Box className={classes.qtyOwnedLabel}>{t('{{count}} owned by you', {count: qtyOwned})}</Box>
        {nftType && nftType === NftType.AUCTIONED ? (
          <Typography variant="caption1">
            <Typography variant="h4" component="span" className={clsx(nftDetailsClasses.priceText)}>
              {hasBids ? t('Top bid') : t('Starting price')}&nbsp;
            </Typography>
            <Typography variant="h4" component="span" className={clsx(nftDetailsClasses.price)}>
              {priceUsd}
            </Typography>
          </Typography>
        ) : (
          priceUsd && (
            <Typography variant="h4" className={nftDetailsClasses.price}>
              {priceUsd}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};
