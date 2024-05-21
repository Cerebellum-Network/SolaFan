import {useEffect, useState} from 'react';

export const useTriggerState = (): [boolean, () => void] => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (value) {
      setValue(false);
    }
  }, [value]);

  const onTrigger = () => {
    setValue(true);
  };

  return [value, onTrigger];
};
