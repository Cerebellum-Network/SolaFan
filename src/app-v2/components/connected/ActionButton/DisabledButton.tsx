import {Button} from '@material-ui/core';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export function DisabledButton({children}: Props) {
  return (
    <Button variant="outlined" size="small">
      {children}
    </Button>
  );
}
