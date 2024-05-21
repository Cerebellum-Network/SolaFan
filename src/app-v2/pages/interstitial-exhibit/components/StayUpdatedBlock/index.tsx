import {FullCreatorInterface} from '@cere/services-types';
import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as DiscordIcon} from '../../../../assets/socialNetworks/discord.svg';
import {useValueByResolution} from '../../../../utils/hooks/use-resolution.hook';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '12px 12px 36px 36px',
    overflow: 'hidden',
    marginBottom: '24px',
    [theme.breakpoints.up('lg')]: {
      borderRadius: '12px 12px 30px 30px',
    },
  },
  imageBox: {
    width: '100%',
    height: '190px',
    [theme.breakpoints.up('lg')]: {
      height: '60px',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    objectFit: 'cover',
  },

  infoBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: theme.palette.grey[200],
    padding: '35px 16px 24px',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      padding: '35px 24px 24px',
    },
  },
  diskordLogo: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: `6px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.info.contrastText,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fill: theme.palette.common.white,
    },
    [theme.breakpoints.up('lg')]: {
      width: '66px',
      height: '66px',
    },
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    [theme.breakpoints.up('lg')]: {
      minWidth: '35%',
      fontSize: '28px',
      fontWeight: 800,
      lineHeight: '36px',
    },
  },
  quoteBlock: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '65%',
    },
  },
  quote: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    padding: '0 0 0 8px',
    marginBottom: '16px',
    borderLeft: `2px solid ${theme.palette.info.main}`,
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
      lineHeight: '24px',
      padding: '12px 0 12px 16px',
      marginBottom: '12px',
    },
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    fontSize: '14px',
    fontWeight: 600,
  },
  link: {
    textDecoration: 'none',
  },
}));

type Props = {
  creator: FullCreatorInterface;
};

export const StayUpdatedBlock = memo(({creator}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const {value: bgImageByResolution} = useValueByResolution({
    desktop: creator.desktopBackgroundImage,
    tablet: creator.tabletBackgroundImage,
    mobile: creator.mobileBackgroundImage,
  });

  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <img src={bgImageByResolution?.url} alt={creator.name} className={styles.image} />
      </Box>
      <Box className={styles.infoBox}>
        <Box className={styles.diskordLogo}>
          <DiscordIcon />
        </Box>
        <Typography className={styles.title}>{t('Stay updated by {{name}}', {name: creator.name})}</Typography>
        <Box className={styles.quoteBlock}>
          <Typography className={styles.quote}>{creator.about}</Typography>
          {creator.discordLink && (
            <Box className={styles.buttonBox}>
              <a target="_blank" rel="noopener noreferrer" className={styles.link} href={creator.discordLink}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={styles.button}
                  startIcon={<DiscordIcon />}
                >
                  {t('Discord channel')}
                </Button>
              </a>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});
