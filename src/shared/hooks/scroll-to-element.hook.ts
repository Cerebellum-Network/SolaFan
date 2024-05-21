import {RefObject, useCallback, useRef} from 'react';

type Result = {
  refElement: RefObject<any>;
  scrollToElement: () => void;
};

export const useScrollToElement = (): Result => {
  const refElement = useRef<any>();

  const scrollToElement = useCallback(() => {
    if (refElement.current) {
      refElement.current.scrollIntoView();
    }
  }, []);

  return {refElement, scrollToElement};
};
