import {makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';

import colors from '../../../../styles/colors';

const useStyles = makeStyles(() => ({
  page: {
    backgroundColor: colors.lighter,
    borderRadius: '12px',
    padding: '16px',
  },
  loader: {
    color: 'white',
    margin: 'auto',
  },
  balanceCere: {
    fontSize: '14px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: colors.disable,
    paddingLeft: '36px',
  },
  active: {
    color: colors.lightGrey,
    marginLeft: '4px',
  },
}));

type Props = {
  balance: string;
  isActive?: boolean;
};

export const UserWalletsItemBalance = ({balance, isActive}: Props) => {
  const classes = useStyles();
  return <Typography className={clsx(classes.balanceCere, isActive && classes.active)}>{balance}</Typography>;
};
