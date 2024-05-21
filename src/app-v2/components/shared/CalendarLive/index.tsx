import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {getDottedDate, getTime} from '../../../utils/helpers/time';
import {ReactComponent as CalendarIcon} from './calendar.svg';

const useStyles = makeStyles<Theme, {inRow: boolean}>((theme) => ({
  root: {
    background: 'rgba(22, 22, 22, 0.5)',
    border: '1px solid rgba(250, 12, 88, 0.2)',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    flexDirection: ({inRow}) => (inRow ? 'row-reverse' : 'column'),
    height: ({inRow}) => (inRow ? '42px' : 'auto'),
    padding: ({inRow}) => (inRow ? '8px' : '12px'),
    gap: ({inRow}) => (inRow ? '16px' : '8px'),
    borderRadius: ({inRow}) => (inRow ? '16px' : '21px'),
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
  liveText: {
    position: 'relative',
    backgroundColor: 'rgba(250, 12, 88, 0.1)',
    padding: '4px 18px 4px 8px',
    height: '24px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#FA0C58',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      top: '9px',
      right: '8px',
      backgroundColor: '#FA0C58',
    },
  },
}));

type Props = {
  date?: string;
  inRow: boolean;
};

export const CalendarLive = memo(({date, inRow}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles({inRow});

  return (
    <Box className={styles.root}>
      <Typography className={styles.liveText}>{t('Exhibit LIVE!')}</Typography>

      <Box className={styles.dateBox}>
        <CalendarIcon />
        <Typography className={styles.dateText}>
          {date && (
            <>
              {`${t('Ends')}:`} {getDottedDate(date)} <span className={styles.greyText}>{t('at')}</span> {getTime(date)}
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
});
