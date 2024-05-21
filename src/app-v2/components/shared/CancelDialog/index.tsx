import {Box, Button, Dialog, Grid, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '24px 16px',
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
  },
  title: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    textAlign: 'center',
    paddingBottom: '8px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 400,
    textAlign: 'center',
    paddingBottom: '20px',
  },
  button: {
    width: '145px',
    height: '36px',
  },
  redButton: {
    backgroundColor: theme.palette.error.main,
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
  whiteButtonText?: string;
  redButtonText?: string;
  onWhiteButtonClick: () => void;
  onRedButtonClick: () => void;
};

export const CancelDialog = memo(
  ({open, onClose, title, text, whiteButtonText, redButtonText, onWhiteButtonClick, onRedButtonClick}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    return (
      <Dialog open={open} onClose={onClose}>
        <Box className={styles.root}>
          <Typography className={styles.title}>{title}</Typography>
          <Typography className={styles.text}>{text}</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" className={styles.button} onClick={onWhiteButtonClick}>
                {whiteButtonText ?? t('Cancel')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" className={clsx(styles.button, styles.redButton)} onClick={onRedButtonClick}>
                {redButtonText ?? t('Remove')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    );
  },
);
