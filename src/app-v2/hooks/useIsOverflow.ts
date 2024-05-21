import {MutableRefObject, useLayoutEffect, useState} from 'react';

export const useIsOverflow = (
  ref: MutableRefObject<HTMLElement | null>,
  maxHeight?: number,
  callback?: (v: boolean) => void,
) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const {current} = ref;

    if (current) {
      const hasOverflow =
        !maxHeight || maxHeight === 0
          ? current?.scrollHeight > current?.clientHeight
          : current.scrollHeight >= maxHeight;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    }
  }, [callback, maxHeight, ref]);

  return isOverflow;
};
