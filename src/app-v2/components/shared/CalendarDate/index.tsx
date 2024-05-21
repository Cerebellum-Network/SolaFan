import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {memo, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {getDottedDate, getTime} from '../../../utils/helpers/time';
import {ReactComponent as CalendarIcon} from './calendar.svg';

const useStyles = makeStyles<Theme, {inRow: boolean}>((theme) => ({
  root: {
    background: 'rgba(22, 22, 22, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: 'fit-content',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: ({inRow}) => (inRow ? 'row' : 'column'),
    height: ({inRow}) => (inRow ? '60px' : 'auto'),
    padding: ({inRow}) => (inRow ? '8px' : '12px'),
    gap: ({inRow}) => (inRow ? '24px' : '8px'),
  },
  dateBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dateText: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  greyText: {
    color: theme.palette.text.disabled,
  },
}));

type Props = {
  date?: string;
  inRow: boolean;
  children: NonNullable<ReactNode>;
};

export const CalendarDate = memo(({date, inRow, children}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles({inRow});

  return (
    <Box className={styles.root}>
      <Box className={styles.dateBox}>
        <CalendarIcon />
        <Typography className={styles.dateText}>
          {date && (
            <>
              {getDottedDate(date)} <span className={styles.greyText}>{t('at')}</span> {getTime(date)}
            </>
          )}
        </Typography>
      </Box>

      {children}
    </Box>
  );
});
