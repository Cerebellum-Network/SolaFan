import {Box, Dialog, DialogProps, makeStyles, Paper, PaperProps, styled, Theme, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactElement} from 'react';

import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';
import {CloseButton} from '../../primitives/CloseButton';

const StyledPaper = styled(Paper)<Theme>(({theme}) => ({
  borderRadius: theme.spacing(2),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '24px 23.5px 0',
    backgroundColor: '#F8F8FA',
    borderRadius: '12px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      minHeight: '100%',
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
    gap: '10px',
    padding: '4px 16px 24px',
    borderBottom: '1px solid #E0E0E7',

    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '16px 16px 8px',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    [theme.breakpoints.up('sm')]: {
      right: '39.5px',
      top: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      right: '16px',
      top: '16px',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '22px',
    fontFamily: 'inherit',
    letterSpacing: 'inherit',
  },
  subTitle: {
    fontSize: '11px',
    lineHeight: '20px',
    textAlign: 'center',
    color: theme.palette.grey[700],
    paddingLeft: '16px',
    paddingBottom: '16px',
    fontFamily: 'inherit',
    letterSpacing: 'inherit',

    [mobileLandscapeMediaQuery(theme)]: {
      textAlign: 'start',
      paddingBottom: '8px',
    },
  },
  container: {
    padding: '40px 0',
    [theme.breakpoints.up('sm')]: {
      padding: '40px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 0 24px',
    },
  },
}));

type Props = {
  icon?: ReactElement;
  title: string;
  subTitle?: string;
  onClose: (event?: any) => void;
  children: ReactElement;
  classes?: Partial<Record<'root' | 'header' | 'headerTitle' | 'container' | 'closeBtn', string>>;
  dialogStyles?: Partial<DialogProps>;
};

export const UpdatedPurchaseModalBox = memo(
  ({icon, title, subTitle, onClose, children, classes, dialogStyles}: Props) => {
    const styles = useStyles();

    return (
      <Dialog
        PaperComponent={(props: PaperProps) => <StyledPaper {...props} />}
        open
        onClose={onClose}
        {...dialogStyles}
      >
        <Box className={clsx(styles.root, classes?.root)}>
          <Box className={clsx(styles.header, classes?.header)}>
            {icon && <Box>{icon}</Box>}
            <Typography className={clsx(styles.title, classes?.headerTitle)} variant="h3">
              {title}
            </Typography>
          </Box>
          {subTitle && <Typography className={styles.subTitle}>{subTitle}</Typography>}

          <Box className={clsx(styles.closeButton, classes?.closeBtn)}>
            <CloseButton onClick={onClose} />
          </Box>
          <Box className={clsx(styles.container, classes?.container)}>{children}</Box>
        </Box>
      </Dialog>
    );
  },
);
