import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '140px',
    height: '36px',
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      width: '160px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '90px',
      height: '28px',
    },
  },
  buy: {
    color: theme.palette.info.main,
    borderColor: theme.palette.info.main,
  },
}));

export const useRenderListingActionButton = () => {
  const {t} = useTranslation();
  const styles = useStyles();

  // TODO - specify this render callback for Listings
  return useCallback(
    () => (
      <Button variant="outlined" className={clsx(styles.button, styles.buy)}>
        {t('Buy')}
      </Button>
    ),
    [styles, t],
  );
};
