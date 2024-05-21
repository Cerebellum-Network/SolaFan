import {Box, Dialog, DialogProps, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactElement} from 'react';

import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';
import {CloseButton} from '../../primitives/CloseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      minHeight: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
      borderRadius: '12px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      position: 'relative',
      top: 0,
      left: 0,
      transform: 'unset',
      width: 'unset',
      borderRadius: '0',
      minWidth: '100%',
      minHeight: '100%',
    },
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '55px 16px 8px',

    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '16px 16px 8px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    [theme.breakpoints.up('sm')]: {
      right: '24px',
      top: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      right: '16px',
      top: '16px',
    },
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    fontFamily: 'inherit',
    letterSpacing: 'inherit',
  },
  subTitle: {
    marginBottom: '24px',
  },
  container: {
    padding: '8px 24px 24px',
  },
}));

type Props = {
  icon?: ReactElement;
  title: string;
  subTitle?: string;
  onClose: (event?: any) => void;
  children: ReactElement;
  classes?: Partial<Record<'root' | 'header', string>>;
  dialogStyles?: Partial<DialogProps>;
};

export const PurchaseModalBox = memo(({icon, title, subTitle, onClose, children, classes, dialogStyles}: Props) => {
  const styles = useStyles();

  return (
    <Dialog open onClose={onClose} {...dialogStyles}>
      <Box className={clsx(styles.root, classes?.root)}>
        <Box className={clsx(styles.header, classes?.header)}>
          {icon && <Box>{icon}</Box>}
          <Typography className={styles.title} variant="h6">
            {title}
          </Typography>
        </Box>
        {subTitle && (
          <Typography variant="body2" className={styles.subTitle} align="center">
            {subTitle}
          </Typography>
        )}

        <Box className={styles.closeButton}>
          <CloseButton onClick={onClose} />
        </Box>
        <Box className={styles.container}>{children}</Box>
      </Box>
    </Dialog>
  );
});
