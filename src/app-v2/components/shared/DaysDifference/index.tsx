import {makeStyles, Theme, Typography} from '@material-ui/core';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

const useStyles = makeStyles<Theme>((theme) => ({
  block: {
    zIndex: 1,
    position: 'absolute',
    top: '16px',
    left: '16px',
    height: '30px',
    borderRadius: '6px',
    padding: '4px 8px',
    background: 'rgba(22, 22, 22, 0.5)',
    [theme.breakpoints.down('lg')]: {
      left: '8px',
      top: '8px',
    },
    [theme.breakpoints.down('md')]: {
      width: 'fit-content',
      top: '70px',
    },
  },
  text: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 600,
    color: '#F8F8FA',
  },
}));

type Props = {
  endDate: string;
};
export const DaysDifference = ({endDate}: Props) => {
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
  const styles = useStyles();
  const calculateTimeRemaining = () => {
    const now = dayjs();
    const endDateTime = dayjs(endDate);

    const durationTime = dayjs.duration(endDateTime.diff(now));

    return durationTime.humanize();
  };

  return (
    <div className={styles.block}>
      <Typography className={styles.text}>{calculateTimeRemaining()} left</Typography>{' '}
    </div>
  );
};
