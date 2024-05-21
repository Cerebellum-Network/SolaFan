import {Box, makeStyles, MenuItem, Select} from '@material-ui/core';
import {AVAILABLE_LANGUAGES} from 'config/common';
import {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';

import PortugalFlag from '../../../assets/flags/portugal.svg';
import USFlag from '../../../assets/flags/united-states.svg';
import {useLocalization} from '../../../hooks/use-locale.hook';

export const useStyles = makeStyles((theme) => ({
  selectWrapper: {
    borderRadius: '30px',
    minWidth: '142px',

    '& .MuiSelect-root': {
      padding: '8px 28px 8px 12px',
    },
    '& fieldset': {
      borderColor: theme.palette.common.black,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.common.black,
    },
  },
  flagImage: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
  },

  root: {
    width: 51,
    height: 31,
    padding: 0,
  },
  switchBase: {
    padding: 1,
    top: 1,
    transform: 'translateX(2px)',

    '&$checked': {
      transform: 'translateX(21px)',

      '& + $track': {
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      border: `6px solid ${theme.palette.common.white}`,
    },
  },
  thumb: {
    width: 27,
    height: 27,
    boxShadow: 'none',
    background: theme.palette.common.white,
  },
  track: {
    borderRadius: 20,
    backgroundColor: theme.palette.grey[100],
    opacity: 1,
  },
  disabled: {
    '& + $track': {
      opacity: `0.25 !important`,
    },
    '& $thumb': {
      borderColor: 'transparent',
    },
  },
}));

type LanguageSelectOption = {
  label: string;
  flagImage: string;
  value: string;
};

export const LanguageSelect = () => {
  const classes = useStyles();
  const {t, i18n, locale} = useLocalization();
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const languages: LanguageSelectOption[] = useMemo(
    () =>
      [
        {label: t('English'), flagImage: USFlag, value: 'en'},
        {label: t('Portugal'), flagImage: PortugalFlag, value: 'pt'},
      ].filter(({value}) => AVAILABLE_LANGUAGES().includes(value)),
    [t],
  );

  const onLanguageSelect = useCallback(
    async (event: ChangeEvent<{value: unknown}>) => {
      if (typeof event.target.value === 'string' && languages.map(({value}) => value).includes(event.target.value)) {
        setIsDisabled(true);

        try {
          await i18n.changeLanguage(event.target.value as string);
          history.push(`/${event.target.value}/${history.location.pathname.slice(2)}`);
        } finally {
          setIsDisabled(false);
        }
      }
    },
    [languages, i18n, history],
  );

  return (
    <Box>
      <Select
        variant="outlined"
        className={classes.selectWrapper}
        value={locale}
        onChange={onLanguageSelect}
        disabled={isDisabled}
      >
        {languages.map((language) => (
          <MenuItem key={language.value} value={language.value}>
            <div className="flex items-center font-semibold text-black gap-x-1 text-[12px]">
              <img className={classes.flagImage} src={language.flagImage} alt={language.label} />
              {language.label}
            </div>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
