import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode} from 'react';

import {CardImage} from '../../primitives/CardImage';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '12px',
    overflow: 'hidden',
    minWidth: '100px',
    border: `1px solid ${theme.palette.grey[200]}`,
    [theme.breakpoints.up('lg')]: {
      filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.12))',
      border: 'none',
    },
  },
  infoBox: {
    padding: '16px 8px',
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.up('lg')]: {
      padding: '8px',
    },
  },
  title: {
    paddingBottom: '4px',
  },
  priceElement: {
    fontSize: '16px',
    lineHeight: '22px',
    paddingTop: '6px',
  },
  overflowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type Props = {
  nftId: string;
  title: string;
  description: NonNullable<ReactNode>;
  priceElement: NonNullable<ReactNode>;
};

export const CardSmall = memo(({nftId, title, description, priceElement}: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <CardImage nftId={nftId} />
      <Box display="flex" flexDirection="column" className={styles.infoBox}>
        <Typography variant="caption" style={{fontWeight: 500}} className={styles.title} noWrap>
          {title}
        </Typography>
        <Box>{description}</Box>
        <Typography className={clsx(styles.priceElement, styles.overflowText)}>{priceElement}</Typography>
      </Box>
    </Box>
  );
});

CardSmall.displayName = 'CardSmall';
