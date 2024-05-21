import {Box, Dialog, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import colors from '../../../../styles/colors'; // TODO move to v2 folder
import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';
import {CloseButton} from '../../primitives/CloseButton';

export interface SimpleModalProps {
  open: boolean;
  title?: string;
  classes?: Partial<Record<'title' | 'message' | 'modalContainer', string>>;
  onClose: (event?: any) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      padding: '24px 0',
      background: colors.light,
      borderRadius: '12px',
      width: '343px',
      minWidth: '343px',
      [mobileLandscapeMediaQuery(theme)]: {
        width: '100%',
        maxWidth: '740px',
        padding: '1rem 0 24px 0',
      },
      [theme.breakpoints.up('md')]: {
        minWidth: '0',
        width: '448px',
        padding: '24px 0',
      },
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem 18px 1rem',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
  },
  container: {
    padding: '0 1rem',
  },
}));

export const SimpleModal: React.FC<SimpleModalProps> = ({children, open, onClose, title, classes}) => {
  const styles = useStyles();
  return (
    <Dialog className={clsx(styles.root, classes && classes.modalContainer)} open={open} onClose={onClose}>
      <Box className={clsx(styles.header)}>
        <Typography className={styles.title}>{title}</Typography>
        <CloseButton onClick={onClose} />
      </Box>
      <Box className={styles.container}>{children}</Box>
    </Dialog>
  );
};
