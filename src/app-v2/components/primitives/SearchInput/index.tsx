import {InputAdornment, InputBaseProps, makeStyles} from '@material-ui/core';
import {Cancel, Search} from '@material-ui/icons';
import clsx from 'clsx';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {RoundedInput} from '../RoundedInput';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.grey[700],
  },
  clearIcon: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
}));

interface Props extends InputBaseProps {
  onClear?: () => void;
  withClearButton?: boolean;
}

export const SearchInput = memo(({onClear, ...props}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <RoundedInput
      placeholder={t('Search')}
      startAdornment={<InputAdornment position="start">{<Search className={styles.icon} />}</InputAdornment>}
      endAdornment={
        props.value && onClear ? (
          <InputAdornment position="end">
            {<Cancel onClick={onClear} className={clsx(styles.icon, styles.clearIcon)} />}
          </InputAdornment>
        ) : (
          <></>
        )
      }
      {...props}
    />
  );
});
