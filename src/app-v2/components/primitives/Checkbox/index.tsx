import {Checkbox as MaterialCheckbox, makeStyles} from '@material-ui/core';
import {ChangeEvent, FC, ReactElement} from 'react';

import colors from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '-9px 0 0 -9px',
    color: colors.lighter,
  },
  checked: {
    color: `${theme.palette.info.main} !important`,
  },
}));

interface CheckboxProps {
  checked: boolean;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({checked, onChange, required = false}): ReactElement => {
  const classes = useStyles();

  return <MaterialCheckbox required={required} classes={classes} checked={checked} onChange={onChange} />;
};
