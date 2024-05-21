import {Box, Button, Collapse, Dialog, Grid, makeStyles, Typography} from '@material-ui/core';
import {memo, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {CloseButton} from '../../primitives/CloseButton';
import {CollapseBox} from '../../primitives/CollapseBox';

const useStyles = makeStyles((theme) => ({
  fieldBox: {
    padding: '16px',
    marginTop: '12px',
    backgroundColor: theme.palette.common.white,
    borderRadius: '12px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
  },
  buttonsBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 26px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'unset',
      justifyContent: 'flex-end',
      padding: '32px 0',
    },
  },
  button: {
    textTransform: 'none',
    width: '50%',
    height: '36px',
    [theme.breakpoints.up('lg')]: {
      width: '200px',
    },
  },
  mobileMenuBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileMenuBackground: {
    width: '100%',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  mobileHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    },
  },
  mobileContainer: {
    width: '100%',
    padding: '16px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    },
  },
  acordion: {
    padding: '8px',
    backgroundColor: theme.palette.common.white,
    borderRadius: '12px !important',
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onApply: () => void;
  priceFields: ReactElement;
  creatorFields: ReactElement;
  dateFields: ReactElement;
};

export const FilterMenu = memo(
  ({open, onClose, onClear, onApply, priceFields, creatorFields, dateFields}: Props): ReactElement => {
    const {t} = useTranslation();
    const styles = useStyles();

    const {isDesktop} = useThemeBreakpoints();

    if (isDesktop) {
      return (
        <Collapse in={open}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box className={styles.fieldBox}>
                  <Typography className={styles.title}>{t('Price')}</Typography>
                  <Box pt="12px">{priceFields}</Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={styles.fieldBox}>
                  <Typography className={styles.title}>{t('Creator')}</Typography>
                  <Box pt="12px">{creatorFields}</Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={styles.fieldBox}>
                  <Typography className={styles.title}>{t('Date')}</Typography>
                  <Box pt="12px">{dateFields}</Box>
                </Box>
              </Grid>
            </Grid>
            <Box className={styles.buttonsBox}>
              <Button variant="outlined" color="default" className={styles.button} onClick={onClear}>
                {t('Clear')}
              </Button>
              <Button variant="contained" color="secondary" className={styles.button} onClick={onApply}>
                {t('Apply')}
              </Button>
            </Box>
          </Box>
        </Collapse>
      );
    }

    return (
      <Dialog open={open} fullScreen>
        <Box className={styles.mobileMenuBox}>
          <Box className={styles.mobileMenuBackground}>
            <Box className={styles.mobileHeader}>
              <Typography className={styles.title}>{t('Filters')}</Typography>
              <CloseButton onClick={onClose} />
            </Box>
            <Box className={styles.mobileContainer}>
              <Box pb="10px">
                <CollapseBox
                  summary={<Typography className={styles.title}>{t('Price')}</Typography>}
                  classes={{root: styles.acordion}}
                >
                  {priceFields}
                </CollapseBox>
              </Box>
              <Box pb="10px">
                <CollapseBox
                  summary={<Typography className={styles.title}>{t('Creator')}</Typography>}
                  classes={{root: styles.acordion}}
                >
                  {creatorFields}
                </CollapseBox>
              </Box>
              <CollapseBox
                summary={<Typography className={styles.title}>{t('Date')}</Typography>}
                classes={{root: styles.acordion}}
              >
                {dateFields}
              </CollapseBox>
            </Box>
          </Box>

          <Box className={styles.buttonsBox}>
            <Button variant="outlined" color="default" className={styles.button} onClick={onClear}>
              {t('Clear')}
            </Button>
            <Button variant="contained" color="secondary" className={styles.button} onClick={onApply}>
              {t('Apply')}
            </Button>
          </Box>
        </Box>
      </Dialog>
    );
  },
);
