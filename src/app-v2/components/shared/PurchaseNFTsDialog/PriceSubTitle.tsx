import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '12px',
    lineHeight: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
      lineHeight: '21px',
    },
  },
  white: {
    color: theme.palette.primary.light,
  },
  grey: {
    color: theme.palette.grey[700],
  },
}));

type Props = {
  isAuction: boolean;
  bidsLength?: number;
};

export const PriceSubTitle = memo(({isAuction, bidsLength}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  if (isAuction && bidsLength) {
    return (
      <Box>
        <Typography component="span" className={clsx(styles.text, styles.white)}>
          {t('Highest bid')}
        </Typography>{' '}
        <Typography component="span" className={clsx(styles.text, styles.grey)}>
          {t('({{count}} bids)', {count: bidsLength})}
        </Typography>
      </Box>
    );
  }

  if (isAuction) {
    return <Typography className={clsx(styles.text, styles.white)}>{t('Starting price')}</Typography>;
  }

  return (
    <Typography component="span" className={clsx(styles.text, styles.white)}>
      {t('Price')}
    </Typography>
  );
});
