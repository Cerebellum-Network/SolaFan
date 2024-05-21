import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';

import {useViewportHeight} from '../../../shared/hooks/inner-height.hook';
import maintenance from '../../assets/svg/maintenance.svg';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: '8px',

    [theme.breakpoints.down('md')]: {
      marginTop: '40px',
    },
  },
  image: {
    margin: '0 auto auto',
    padding: '0 16px',
    maxWidth: '100%',

    [theme.breakpoints.up('md')]: {
      margin: '30px auto 145px',
      maxWidth: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '18px auto 105px',
      maxWidth: '730px',
    },
  },
  button: {
    width: '164px',
    marginBottom: '24px',
  },
  disableClick: {
    pointerEvents: 'none',
  },
}));

export const MaintenancePage = () => {
  const classes = useStyles();
  const height = useViewportHeight();
  const {t} = useLocalization();

  const onTryAgainClick = () => {
    window.location.reload();
  };

  return (
    <Box
      margin="0 auto"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      height={`${height}px`}
    >
      <Box flex="1 1 auto" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
        <Box maxWidth="512px" padding="0 16px">
          <Typography variant="h3" className={classes.title} align="center">
            {t('We’ll be right back!')}
          </Typography>
          <Typography align="center">
            {t(
              'We are experiencing some extra load and temporarily switched our service to maintenance mode. Please try again later',
            )}
          </Typography>
        </Box>

        <img src={maintenance} className={classes.image} alt="maintenance" />

        <Button color="primary" variant="contained" size="large" onClick={onTryAgainClick} className={classes.button}>
          {t('Try again')}
        </Button>
      </Box>
    </Box>
  );
};
