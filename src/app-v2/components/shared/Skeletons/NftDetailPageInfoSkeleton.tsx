import {Box, Divider, makeStyles, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

import {Skeleton} from '../../primitives/Skeleton';
import {SocialNetworksInfoSkeleton} from './SocialNetworksInfoSkeleton';

const useStyles = makeStyles((theme) => ({
  rootInfo: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  imageBox: {
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      overflow: 'hidden',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '308px',
      height: '308px',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '480px',
      height: '480px',
    },
  },
  image: {
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
    width: '100%',
    height: '100%',
  },
  infoBox: {
    position: 'relative',
    width: '100%',
    padding: '12px',
    [theme.breakpoints.up('md')]: {
      padding: '24px 24px 0 24px',
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 2,
      padding: '32px 32px 0 32px',
    },
  },
  title: {
    width: '100%',
    height: '26px',
    borderRadius: '4px',
    marginBottom: '12px',
    [theme.breakpoints.up('md')]: {
      borderRadius: '8px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40px',
      borderRadius: '12px',
    },
  },
  title2: {
    width: '80px',
    height: '22px',
    borderRadius: '11px',
    marginBottom: '12px',
  },
  avatarBox: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    [theme.breakpoints.up('md')]: {
      gap: '4px',
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '24px',
    },
  },
  avatar: {
    minWidth: '24px',
    height: '24px',
    borderRadius: '50%',
  },
  avatarTitle: {
    width: '150px',
    height: '24px',
    borderRadius: '4px',
    marginBottom: '8px',
    [theme.breakpoints.up('md')]: {
      borderRadius: '8px',
    },
  },
  divider: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    marginBottom: '24px',
  },
  title3: {
    height: '26px',
    borderRadius: '4px',
    marginBottom: '8px',
    [theme.breakpoints.up('md')]: {
      height: '36px',
      borderRadius: '8px',
      marginBottom: '12px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '130px',
      height: '40px',
      borderRadius: '12px',
      marginBottom: '24px',
    },
  },
  desktopPrice: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    width: '170px',
    height: '22px',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  button: {
    height: '48px',
    borderRadius: '24px',
    [theme.breakpoints.up('lg')]: {
      width: '270px',
    },
  },
  exhibitLinkBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '18px',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  exhibitLink: {
    width: '160px',
    height: '24px',
    borderRadius: '4px',
  },
  additionalInfoBox: {
    padding: '24px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '24px 16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '24px',
    },
  },
  subTitle: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    marginBottom: '18px',
  },
  additionalInfoTextBox: {
    height: '96px',
    borderRadius: '12px',
    marginBottom: '24px',
    [theme.breakpoints.up('md')]: {
      height: '80px',
    },
  },
  creatorBox: {
    width: '190px',
    height: '36px',
    borderRadius: '4px',
    marginBottom: '12px',
    [theme.breakpoints.up('md')]: {
      borderRadius: '8px',
    },
  },
}));

export const NftDetailPageInfoSkeleton = () => {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <>
      <Box className={styles.rootInfo}>
        <Box className={styles.imageBox}>
          <Skeleton variant="rect" className={styles.image} />
        </Box>
        <Box className={styles.infoBox}>
          <Skeleton variant="rect" className={styles.title} />
          <Skeleton variant="rect" className={styles.title2} />
          <Box className={styles.avatarBox}>
            <Skeleton variant="circle" className={styles.avatar} />
            <Skeleton variant="rect" className={styles.title} />
          </Box>
          <Divider className={styles.divider} />
          <Skeleton variant="rect" className={styles.desktopPrice} />
          <Skeleton variant="rect" className={styles.title3} />
          <Skeleton variant="rect" className={styles.button} />
          <Box className={styles.exhibitLinkBox}>
            <Skeleton variant="circle" className={styles.exhibitLink} />
          </Box>
        </Box>
      </Box>
      <Box className={styles.additionalInfoBox}>
        <Typography className={styles.subTitle}>{t('Description')}</Typography>
        <Skeleton variant="rect" className={styles.additionalInfoTextBox} />
        <Typography className={styles.subTitle}>{t('Creator')}</Typography>
        <Skeleton variant="rect" className={styles.additionalInfoTextBox} />
        <Skeleton variant="rect" className={styles.creatorBox} />
        <SocialNetworksInfoSkeleton />
      </Box>
    </>
  );
};
