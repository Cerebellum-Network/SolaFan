import ReactCodeInput from '@cere/react-code-input';
import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles, useTheme} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';
import {FC, ReactElement, useState} from 'react';
import useCountDown from 'react-countdown-hook';
import {Trans} from 'react-i18next';

import colors from '../../../../styles/colors';
import {AuthState} from '../../../redux/modules/auth/types';
import {MessageWithButton} from '../../primitives/MessageWithButton';

const useStyles = makeStyles((theme) => ({
  hyphen: {
    position: 'absolute',
    height: '2px',
    width: '6px',
    left: 'calc(50% - 3px)',
    top: '30px',

    '@media (max-width: 375px)': {
      display: 'none',
    },
  },
  textAccent: {
    color: theme.palette.secondary.main,
  },
  withTextAccent: {
    '& strong': {
      color: theme.palette.secondary.main,
    },
  },
  textError: {
    color: colors.error,
  },
  label: {
    color: colors.lightGrey,
    fontWeight: 500,
  },
  pointer: {
    cursor: 'pointer',
  },

  codeWrapperStyles: {
    position: 'relative',
    '&>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0,
    },
    '&>input:first-of-type': {
      marginLeft: '0 !important',
    },
    '&>input:last-of-type': {
      marginRight: '0 !important',
    },
    '&>input:focus': {
      border: `2px solid ${theme.palette.info.main} !important`,
    },
    '@media (min-width: 376px)': {
      '&>input:nth-of-type(3)': {
        border: '1px solid red',
        marginRight: '26px !important',
      },
    },
  },
  firefoxInputStyles: {
    input: {
      textAlign: 'center',
    },
    '&>input[type="number"]::-webkit-outer-spin-button,input[type="number"]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&>input[type="number"]': {
      '-moz-appearance': 'textfield',
    },
  },
}));

const getTime = (timeLeft: number) => Math.round(timeLeft / 1000);

type VerifyOTPFormProps = {
  numberOfDigits: number;
  verifyOtp: (code: string) => void;
  resendOtpCode: () => void;
  authState: AuthState;
};

export const VerifyOTPForm: FC<VerifyOTPFormProps> = ({
  numberOfDigits = 6,
  verifyOtp,
  resendOtpCode,
  authState,
}): ReactElement => {
  const {t} = useLocalization();
  const [error, setError] = useState<string>();
  const [secureCode, setSecureCode] = useState('');
  const [timeLeft, {start}] = useCountDown(Date.now());
  const classes = useStyles();
  const theme = useTheme();

  const baseCodeInputStyle = {
    height: '56px',
    width: '44px',
    borderRadius: '16px',
    border: `1px solid ${colors.lightGrey}`,
    fontSize: '16px',
    textAlign: '-webkit-center',
    outline: 'none',
    margin: '0 2px',
    padding: '0',

    '&:focused': {
      borderColor: theme.palette.primary.main,
    },
  };

  const inputStyleInvalid = {
    ...baseCodeInputStyle,
    borderColor: colors.error,
  };

  const handleCodeChange = (value: string) => {
    if (!value) {
      setError('');
    }
    setSecureCode(value);
  };

  const handleCodeResend = () => {
    start(60_000);
    resendOtpCode();
  };

  const handleSubmit = () => {
    verifyOtp(secureCode);
  };

  return (
    <>
      <Box mt="24px">
        <Typography variant="body2" className={classes.label}>
          {t('Verification code')}
        </Typography>
      </Box>
      <Box display="flex" position="relative" justifyContent="center" mt="8px">
        <ReactCodeInput
          name="OTP"
          type={'url' as any}
          disabled={authState.authPending}
          inputMode="url"
          fields={numberOfDigits}
          filterChars={' ' as any}
          onChange={handleCodeChange}
          inputStyle={baseCodeInputStyle as any}
          inputStyleInvalid={inputStyleInvalid as any}
          isValid={!error}
          className={clsx(classes.codeWrapperStyles, classes.firefoxInputStyles)}
        />
        <Box className={classes.hyphen} bgcolor={!error ? colors.lightGrey : colors.error} />
      </Box>

      {!!error && (
        <Typography variant="caption1" className={classes.textError}>
          {error}
        </Typography>
      )}

      <Box width="100%" textAlign="center" my="24px">
        {timeLeft ? (
          <Typography variant="button1" className={classes.withTextAccent}>
            <Trans
              i18nKey="Resend verification code in <strong>{{timeLeft}}</strong> seconds"
              values={{timeLeft: getTime(timeLeft)}}
            />
          </Typography>
        ) : (
          <Box width="100%" className={classes.pointer}>
            <MessageWithButton
              text={t('Did not receive  a code?')}
              button={t('Resend code')}
              onClick={handleCodeResend}
            />
          </Box>
        )}
      </Box>

      {authState.authError && (
        <Box my="12px" display="flex" justifyContent="center">
          <Typography align="center" variant="caption1" className={classes.textError}>
            {t('Verification code is invalid')}
          </Typography>
        </Box>
      )}

      <Box mb="24px">
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={secureCode.length < numberOfDigits || authState.authPending}
          onClick={handleSubmit}
        >
          {t('Verify')}
        </Button>
      </Box>
    </>
  );
};
