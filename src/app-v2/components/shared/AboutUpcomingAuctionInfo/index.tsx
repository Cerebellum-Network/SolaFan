import {Box, makeStyles, Typography} from '@material-ui/core';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import defaultUpcomingAuction from './assets/defaultUpcomingAuction.png';
import {ReactComponent as Hammer} from './assets/hammer.svg';
import {ReactComponent as ShoppingCart} from './assets/shoppingCart.svg';
import {ReactComponent as View} from './assets/view.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '16px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      padding: '24px',
      gap: '12px',
    },
    [theme.breakpoints.up('lg')]: {
      gap: '24px',
      padding: '32px',
    },
  },
  imageContent: {
    minHeight: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '40%',
      maxWidth: '40%',
    },

    [theme.breakpoints.up('lg')]: {
      minWidth: '45%',
      maxWidth: '45%',
    },
  },
  image: {
    width: '100%',
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    paddingBottom: '8px',

    [theme.breakpoints.up('md')]: {
      fontSize: '28px',
      fontWeight: 800,
      lineHeight: '36px',
      paddingBottom: '4px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '40px',
      lineHeight: '48px',
      paddingBottom: '22px',
    },
  },
  item: {
    display: 'flex',
    marginTop: '20px',
    gap: '20px',
    [theme.breakpoints.up('lg')]: {
      gap: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      gap: '32px',
    },
  },
  subTitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    marginBottom: '4px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '8px',
    },
    [theme.breakpoints.up('lg')]: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '26px',
      marginBottom: '10px',
    },
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    color: theme.palette.text.disabled,
  },
  icon: {
    minWidth: '36px',
    width: '36px',
    height: '36px',
    [theme.breakpoints.up('lg')]: {
      minWidth: '60px',
      width: '60px',
      height: '60px',
    },
  },
}));

export const AboutUpcomingAuctionInfo = () => {
  const {t} = useTranslation();
  const styles = useStyles();

  const options = useMemo(
    () => [
      {
        subTitle: t('View unseen video'),
        text: t('Сontent from the Creator, only visible to NFT ticket holders.'),
        icon: <View className={styles.icon} />,
      },
      {
        subTitle: t('Auction NFTs to bid'),
        text: t('Unique NFTs that can be purchased with the winning auction bid'),
        icon: <Hammer className={styles.icon} />,
      },
      {
        subTitle: t('Limited NFTs to buy'),
        text: t('Limited items available for direct purchase'),
        icon: <ShoppingCart className={styles.icon} />,
      },
    ],
    [styles, t],
  );
  return (
    <Box className={styles.container}>
      <Box className={styles.imageContent}>
        <img src={defaultUpcomingAuction} alt="" width="100%" />
      </Box>

      <Box className={styles.infoContent}>
        <Typography className={styles.title}>{t('About the upcoming live auction')}</Typography>

        {options.map(({subTitle, text, icon}, index) => (
          <Box key={index} className={styles.item}>
            {icon}
            <Box>
              <Typography className={styles.subTitle}>{subTitle}</Typography>
              <Typography className={styles.text}>{text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
