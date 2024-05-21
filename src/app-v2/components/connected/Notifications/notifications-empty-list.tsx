import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import colors from 'styles/colors';

import {ReactComponent as BellIcon} from '../../../assets/svg/grey-bell.svg';
import {Typography} from './Typography';

const useStyles = makeStyles({
  description: {
    paddingTop: '4px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    verticalAlign: 'center',
    color: colors.lightGrey,
  },
  icon: {
    width: '100px',
    height: '100px',
  },
});

export const NotificationsEmptyList = () => {
  const {t} = useLocalization();
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <BellIcon className={styles.icon} />
      <Typography className={styles.description}>{t("You don't have any notifications yet")}</Typography>
    </Box>
  );
};
