import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {FC, ReactElement} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '0 0 0 5px',
  },
  buttonStyle: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));

interface MessageWithButtonProps {
  text: string;
  button: string;
  onClick?: Function;
}

export const MessageWithButton: FC<MessageWithButtonProps> = ({text, button, onClick = noop}): ReactElement => {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      {text}
      <Button className={clsx(classes.button, classes.buttonStyle)} onClick={onClick}>
        {button}
      </Button>
    </Typography>
  );
};
