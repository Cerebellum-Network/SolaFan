import {Button, IconButton, makeStyles} from '@material-ui/core';
import {CheckCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as CopyIcon} from './copy.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.info.light,
    width: '190px',
    height: '44px',
    textTransform: 'none',
  },
  checkIcon: {
    width: '20px',
    height: '20px',
    color: theme.palette.info.main,
  },
}));

type Props = {
  copyText: string;
  afterCopyEvent?: () => void;
  isIconButton?: boolean;
  classes?: Partial<Record<'button' | 'iconButton', string>>;
};

export const CopyButton = memo(({copyText, afterCopyEvent, isIconButton, classes}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const [isCopied, setIsCopied] = useState(false);

  const onCopyClick = () => {
    if (isCopied) {
      return;
    }
    navigator.clipboard.writeText(copyText);
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
    <>
      {isIconButton ? (
        <IconButton className={classes?.iconButton} onClick={onCopyClick}>
          {isCopied ? <CheckCircle className={styles.checkIcon} /> : <CopyIcon />}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          className={clsx(styles.button, classes?.button)}
          startIcon={isCopied ? <CheckCircle className={styles.checkIcon} /> : <CopyIcon />}
          onClick={onCopyClick}
        >
          {!isCopied && t('Copy')}
        </Button>
      )}
    </>
  );
});
