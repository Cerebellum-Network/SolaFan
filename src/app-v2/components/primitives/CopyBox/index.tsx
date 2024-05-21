import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';

import {ReactComponent as CopyIcon} from './copy.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textBox: {
    width: '90%',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.grey[700],
    paddingBottom: '4px',
  },
  copiedText: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type Props = {
  title: string;
  copiedText: string;
  afterCopyEvent?: () => void;
};

export const CopyBox = memo(({title, copiedText, afterCopyEvent}: Props) => {
  const styles = useStyles();

  const onCopyClick = () => {
    navigator.clipboard.writeText(copiedText);
    afterCopyEvent?.();
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.textBox}>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="body1">{copiedText}</Typography>
      </Box>
      <IconButton size="small" onClick={onCopyClick}>
        <CopyIcon />
      </IconButton>
    </Box>
  );
});
