import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactElement} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  title: {
    color: theme.palette.grey[700],
  },
  subTitle: {
    color: theme.palette.grey[700],
  },
  rightBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  value: {
    color: theme.palette.text.primary,
  },
  subValue: {
    color: theme.palette.grey[700],
  },
}));

type Props = {
  title: string;
  subTitle?: string;
  value?: string;
  subValue?: string;
  children?: ReactElement;
  classes?: Partial<Record<'title', string>>;
};

export const NftModalValueBlock = memo(({title, subTitle, value, subValue, children, classes}: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.titleBox}>
        <Typography variant="body2" className={clsx(styles.title, classes?.title)}>
          {title}
        </Typography>
        <Typography variant="body1" className={styles.subTitle}>
          {subTitle}
        </Typography>
      </Box>

      <Box className={styles.rightBlock}>
        {!children && value && (
          <Typography variant="body1" className={styles.value}>
            {value}
          </Typography>
        )}
        {!children && subValue && (
          <Typography variant="body2" className={styles.subValue}>
            {subValue}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
});

NftModalValueBlock.displayName = 'NftModalValueBlock';
