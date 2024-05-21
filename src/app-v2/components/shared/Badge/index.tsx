import {cx} from '@linaria/core';
import {Box, makeStyles, Typography} from '@material-ui/core';

import colors from '../../../../styles/colors';
import collected from '../../../assets/svg/done.svg';

const useStyles = makeStyles(() => ({
  badgeBox: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '4px',
    width: 'fit-content',
    padding: '4px 8px',
    '& > img': {
      marginRight: '4px',
    },
  },
  badgeText: {
    color: colors.white,
  },
}));
export const Badge = ({text, classes}: {text: string; classes?: Partial<Record<'badgeText' | 'badgeBox', string>>}) => {
  const styles = useStyles();
  return (
    <Box className={cx(styles.badgeBox, classes?.badgeBox)}>
      <img className="relative" src={collected} alt="" />
      <Typography variant="caption" className={cx(styles.badgeText, classes?.badgeText)}>
        {text}
      </Typography>
    </Box>
  );
};
