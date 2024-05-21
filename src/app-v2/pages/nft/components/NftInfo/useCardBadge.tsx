import {NftType} from '@cere/services-types';
import {makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  text: {
    width: 'fit-content',
    height: '22px',
    borderRadius: '11px',
    padding: '0 12px',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  unique: {
    backgroundColor: theme.palette.secondary.main,
  },
  ticket: {
    backgroundColor: theme.palette.info.main,
  },
  limited: {
    backgroundColor: theme.palette.info.contrastText,
  },
}));

export const useCardBadge = (nftType: NftType) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return useMemo(() => {
    if (nftType === NftType.AUCTIONED) {
      return <Typography className={clsx(styles.text, styles.unique)}>{t('UNIQUE')}</Typography>;
    }

    if (nftType === NftType.ACCESS) {
      return <Typography className={clsx(styles.text, styles.ticket)}>{t('Ticket')}</Typography>;
    }

    return <Typography className={clsx(styles.text, styles.limited)}>{t('LIMITED')}</Typography>;
  }, [nftType, styles, t]);
};
