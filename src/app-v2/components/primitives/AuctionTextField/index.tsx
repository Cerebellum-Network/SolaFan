import {InputAdornment, makeStyles, TextField, Typography} from '@material-ui/core';
import {ChangeEventHandler} from 'react';
import {useTranslation} from 'react-i18next';

import {getBidTokensValue} from '../../../utils/helpers/auction';

type TextVariant = 'warning' | 'error' | 'info' | '';

const getFormControlStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

const getInputStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '20px',
    '& input': {
      paddingLeft: 0,
    },
  },
  underline: {
    '&:not($error):before': {
      transition: 'none',
      borderBottomWidth: '1px',
      borderBottomColor: ({variant}: {variant: TextVariant}) =>
        variant === 'warning' ? theme.palette.warning.main : theme.palette.divider,
    },
    '&:not($error):after': {
      transition: 'none',
      borderBottomWidth: '1px',
      borderBottomColor: ({variant}: {variant: TextVariant}) =>
        variant === 'warning' ? theme.palette.warning.main : theme.palette.divider,
    },
  },
  error: {
    '&:before': {
      transition: 'none',
      borderBottomWidth: '1px',
      borderBottomColor: theme.palette.secondary.main,
    },
    '&:after': {
      transition: 'none',
      borderBottomWidth: '1px',
      borderBottomColor: theme.palette.secondary.main,
    },
  },
  adornment: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  },
}));

const getHelperStyles = makeStyles((theme) => ({
  root: {
    color: ({variant}: {variant: TextVariant}) =>
      variant === 'error'
        ? theme.palette.secondary.main
        : variant === 'warning'
        ? theme.palette.warning.main
        : theme.palette.divider,
  },
}));

const getLabelStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[700],
  },
  focused: {
    color: `${theme.palette.grey[700]} !important`,
  },
  error: {
    color: `${theme.palette.grey[700]} !important`,
  },
}));

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  variant: TextVariant;
  helperText?: string;
};

export const AuctionTextField = ({value, onChange, variant, helperText}: Props) => {
  const {t} = useTranslation();
  const formControlClasses = getFormControlStyles();
  const inputClasses = getInputStyles({variant});
  const labelClasses = getLabelStyles();
  const helperClasses = getHelperStyles({variant});

  return (
    <TextField
      classes={formControlClasses}
      label={t('Your bid')}
      placeholder={t('Enter your bid')}
      fullWidth
      InputLabelProps={{
        shrink: true,
        classes: labelClasses,
      }}
      value={value}
      onChange={onChange}
      helperText={helperText}
      InputProps={{
        classes: inputClasses,
        endAdornment: (
          <InputAdornment position="end">
            <Typography className={inputClasses.adornment}>
              {getBidTokensValue(Number(value))} {'USDC'}
            </Typography>
          </InputAdornment>
        ),
        type: 'number',
      }}
      FormHelperTextProps={{classes: helperClasses}}
      error={variant === 'error'}
      variant="standard"
    />
  );
};
