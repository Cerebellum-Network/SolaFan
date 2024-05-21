import {useEffect} from 'react';

export const useOnComponentRendered = (callback: () => void) => {
  useEffect(callback, [callback]);
};
