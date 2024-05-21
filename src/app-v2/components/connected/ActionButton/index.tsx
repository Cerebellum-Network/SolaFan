import {Button} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

// TODO - delete it when logic will be connected to all components

export const ActionButton = memo(() => {
  const {t} = useTranslation();

  return (
    <Button variant="contained" color="primary" fullWidth>
      {t('Buy')}
    </Button>
  );
});
