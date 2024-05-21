import {Button as MUIButton} from '@material-ui/core';
import clsx from 'clsx';
import {FC} from 'react';

export type ButtonProps = {
  className?: string;
  secondary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({children, className, disabled, onClick}) => {
  return (
    <MUIButton className={clsx(className)} disabled={disabled} onClick={onClick} variant="contained" size="small">
      {children}
    </MUIButton>
  );
};
