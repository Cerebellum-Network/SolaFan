import {Button} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles} from '@material-ui/core';
import {Skeleton} from 'app-v2/components/primitives/Skeleton';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';

import {Typography} from './Typography';

const useStyles = makeStyles((theme) => ({
  description: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.grey[700],
  },
  actionButton: {
    minHeight: '28px',
    padding: '4px 6px',
  },
  buttonStyle: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
    fontSize: '12px',
    lineHeight: '20px',
  },
  loadingButton: {
    width: '100px',
    height: '28px',
    borderRadius: '14px',
  },
}));

type Props = {
  onViewAll: () => void;
  loading?: boolean;
};

export const NotificationsControls = ({onViewAll, loading = false}: Props) => {
  const {t} = useLocalization();
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Typography className={styles.description}>Latest</Typography>
      {loading ? (
        <Skeleton variant="rect" className={styles.loadingButton} />
      ) : (
        <Button variant="text" onClick={onViewAll} className={clsx(styles.actionButton, styles.buttonStyle)}>
          {t('Mark all as read')}
        </Button>
      )}
    </Box>
  );
};
