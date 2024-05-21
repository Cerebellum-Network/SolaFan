import {Dialog, Typography} from '@cere/rxb-template-ui-kit';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {ReactComponent as CloseIcon} from 'assets/close.svg';
import {useEffect, useRef, useState} from 'react';

import {CUSTOM_ERROR} from '../../../../shared/lib/error-handler';

interface CustomError {
  id: number;
  text: string;
}

const TIMEOUT = 5000;

export const ErrorsContainer = () => {
  const {t} = useLocalization();
  const [errors, setErrors] = useState<CustomError[]>([]);
  const timers = useRef<{[key: number]: any}>({});

  const hideError = (errorId: number) => () => {
    setErrors((list) => list.filter(({id}) => errorId !== id));
    clearTimeout(timers.current[errorId]);
    delete timers.current[errorId];
  };

  useEffect(() => {
    const handleEvent = ({detail}: CustomEvent) => {
      const id = Date.now();
      setErrors((list) => [...list, {id, text: detail}]);
      timers.current[id] = setTimeout(() => hideError(id)(), TIMEOUT);
    };

    (window as any).addEventListener(CUSTOM_ERROR, handleEvent);

    return () => (window as any).removeEventListener(CUSTOM_ERROR, handleEvent);
  }, []);

  return (
    <>
      {errors.map((error) => (
        <Dialog
          open
          onClose={hideError(error.id)}
          title={t('Error')}
          closeIcon={<CloseIcon />}
          key={error.id}
          fullWidth
        >
          <Typography>{error.text}</Typography>
        </Dialog>
      ))}
    </>
  );
};
