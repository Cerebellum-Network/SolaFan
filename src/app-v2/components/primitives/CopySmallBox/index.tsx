import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {memo, ReactElement, useEffect, useState} from 'react';

import {ReactComponent as CopyIcon} from './copy.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '32px',
    width: '220px',
    borderRadius: '16px',
    padding: '4px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
  },
  iconBox: {
    height: '24px',
    minWidth: '24px',
    maxWidth: '24px',
    borderRadius: '50%',
    marginRight: '4px',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flexGrow: 2,
    fontSize: '12px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  copyIcon: {
    marginLeft: '16px',
  },
}));

type Props = {
  icon?: ReactElement;
  text: string;
  afterCopyEvent?: () => void;
};

export const CopySmallBox = memo(({icon, text, afterCopyEvent}: Props) => {
  const styles = useStyles();

  const [isCopied, setIsCopied] = useState(false);

  const onCopyClick = () => {
    if (isCopied) {
      return;
    }
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    afterCopyEvent?.();
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  return (
    <Box className={styles.root}>
      {icon && <Box className={styles.iconBox}>{icon}</Box>}
      <Typography className={styles.text}>{text}</Typography>
      <IconButton size="small" onClick={onCopyClick} disabled={isCopied}>
        {isCopied ? <Check /> : <CopyIcon />}
      </IconButton>
    </Box>
  );
});
