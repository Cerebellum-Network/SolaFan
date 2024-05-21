import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box, Dialog as MaterialDialog, DialogContent, DialogTitle, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';
import {noop} from 'lodash';

import colors from '../../../../styles/colors';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0px',
  },
  paper: {
    borderRadius: '12px',
    maxWidth: '420px',
    background: colors.light,
    minWidth: '343px',
  },
}));

const useHeaderStyles = makeStyles(() => ({
  root: {
    padding: '24px 24px 8px',
    textAlign: 'center',
  },
}));

const useContentStyles = makeStyles(() => ({
  root: {
    padding: '0 12px 24px',
  },
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    margin: '0 4px',
    width: '145px',
  },
  confirm: {
    background: colors.error,
    color: colors.light,

    '&:hover': {
      background: colors.error,
    },
  },
  text: {
    maxWidth: '320px',
    textAlign: 'center',
    margin: '0 auto',

    [theme.breakpoints.up('md')]: {
      maxWidth: '330px',
    },
  },
}));

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: Function;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  open = false,
  onCancel = noop,
  onConfirm = noop,
  title,
  text,
  confirmText,
  cancelText,
}: ConfirmModalProps) => {
  const styles = useStyles();
  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();
  const buttonStyles = useButtonStyles();
  const {t} = useLocalization();

  return (
    <MaterialDialog classes={styles} scroll="paper" fullWidth open={open} onClose={onCancel}>
      <DialogTitle disableTypography classes={headerStyles}>
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent classes={contentStyles}>
        <Typography variant="body2" className={buttonStyles.text}>
          {text}
        </Typography>

        <Box mt="24px" display="flex" justifyContent="center">
          <Button onClick={onCancel} className={buttonStyles.root} color="primary" variant="outlined">
            {cancelText || t('Cancel')}
          </Button>
          <Button onClick={onConfirm} className={clsx(buttonStyles.root, buttonStyles.confirm)} color="primary">
            {confirmText || t('Confirm')}
          </Button>
        </Box>
      </DialogContent>
    </MaterialDialog>
  );
};
