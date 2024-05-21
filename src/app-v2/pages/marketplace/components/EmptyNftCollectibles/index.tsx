import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {StyledLink} from '../../../../components/primitives/StyledLink';
import {ROUTES} from '../../../../constants/routes';
import emptyNftCollectibles from './emptyNftCollectibles.png';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '34px',
    borderRadius: '28px',
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.up('md')]: {
      padding: '32x 48px',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      gap: '60px',
      padding: '48px',
      borderRadius: '32px',
    },
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '400px',
      maxWidth: '400px',
    },
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    paddingBottom: '12px',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '26px',
    },
  },
  subTitle: {
    fontSize: '14px',
    lineHeight: '21px',
    paddingBottom: '24px',
  },
  buttonsBox: {
    display: 'flex',
    gap: '12px',
    [theme.breakpoints.up('md')]: {
      gap: '16px',
    },
  },
  buttonLink: {
    width: '50%',
    height: '36px',
    [theme.breakpoints.up('lg')]: {
      width: '160px',
    },
  },
  button: {
    width: '100%',
    textTransform: 'none',
  },
}));

export const EmptyNftCollectibles = memo(() => {
  const {t, i18n} = useTranslation();
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <img className={styles.image} src={emptyNftCollectibles} alt={t('Placeholder')} />

      <Box>
        <Typography className={styles.title}>{t('All marketplace listings are currently sold out')}</Typography>
        <Typography className={styles.subTitle}>
          {t(
            'Check out the available collectibles which are sold directly by the original creator. Or sell your owned collectibles and it will show here for all potential buyers!',
          )}
        </Typography>
        <Box className={styles.buttonsBox}>
          <StyledLink to={generatePath(ROUTES.HOME, {locale: i18n.language})} className={styles.buttonLink}>
            <Button variant="contained" color="primary" className={styles.button}>
              {t('Discover')}
            </Button>
          </StyledLink>
          <StyledLink to={generatePath(ROUTES.USER_NFTS, {locale: i18n.language})} className={styles.buttonLink}>
            <Button variant="outlined" color="secondary" className={styles.button}>
              {t('Sell')}
            </Button>
          </StyledLink>
        </Box>
      </Box>
    </Box>
  );
});
