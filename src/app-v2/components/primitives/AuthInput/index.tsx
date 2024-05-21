import {TextField} from '@cere/rxb-template-ui-kit';
import {makeStyles} from '@material-ui/core';
import {noop} from 'lodash';
import {FC} from 'react';

const useInputStyles = makeStyles(() => ({
  root: {
    borderRadius: '16px',

    '&:hover $notchedOutline': {
      borderColor: '#E0E0E7',
    },
  },
  notchedOutline: {
    borderColor: '#E0E0E7',
  },
  focused: {
    '& $notchedOutline': {
      borderColor: '#3CBCAC !important',
    },
  },
  disabled: {
    '& $notchedOutline': {
      borderColor: '#E0E0E7',
    },
  },
  error: {
    '&:hover $notchedOutline': {
      borderColor: '#f44336',
    },
  },
}));

const useLabelStyles = makeStyles(() => ({
  focused: {
    color: '#3CBCAC !important',
  },
}));

const useHelperStyles = makeStyles(() => ({
  root: {
    marginLeft: '0',
  },
}));

interface AuthInputProps {
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
  value: String;
  helperText?: String;
  inputProps?: any;
  disabled?: boolean;
  label?: string;
}

const AuthInput: FC<AuthInputProps> = ({
  onChange = noop,
  onBlur = noop,
  onFocus = noop,
  value,
  helperText,
  inputProps = {},
  disabled = false,
  label = 'Email address',
}) => {
  const inputClasses = useInputStyles();
  const labelClasses = useLabelStyles();
  const helperClasses = useHelperStyles();

  return (
    <TextField
      variant="outlined"
      label={label}
      error={!!helperText}
      fullWidth
      value={value}
      onChange={onChange}
      helperText={helperText}
      disabled={disabled}
      onBlur={onBlur}
      onFocus={onFocus}
      inputProps={inputProps}
      InputProps={{classes: inputClasses}}
      InputLabelProps={{classes: labelClasses}}
      FormHelperTextProps={{classes: helperClasses}}
    />
  );
};

export default AuthInput;
