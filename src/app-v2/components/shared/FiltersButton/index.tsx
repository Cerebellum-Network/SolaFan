import {Box, Button, makeStyles} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as FiltersIcon} from './filters.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    textTransform: 'none',
    backgroundColor: theme.palette.common.white,
    whiteSpace: 'nowrap',
  },
  filtersCount: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    marginLeft: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    lineHeight: '20px',
    '&:empty': {
      display: 'none',
    },
  },
}));

type Props = {
  filtersCount: number;
  onClick: () => void;
};

export const FiltersButton = memo(({filtersCount, onClick}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      startIcon={<FiltersIcon />}
      className={styles.button}
      onClick={onClick}
    >
      {t('Filters')}
      {!!filtersCount && <Box className={styles.filtersCount}>{filtersCount > 9 ? '9+' : filtersCount}</Box>}
    </Button>
  );
});
