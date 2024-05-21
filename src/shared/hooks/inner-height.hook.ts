import {useEffect, useState} from 'react';

const measureHeight = (): number => window.innerHeight;

/**
 * Calculate correct viewport height for mobile browsers
 * @returns {number}
 */
export const useViewportHeight = (): number => {
  const [height, setHeight] = useState<number>(measureHeight);

  useEffect(() => {
    const setMeasuredHeight = () => {
      const measuredHeight = measureHeight();
      setHeight(measuredHeight);
    };

    window.addEventListener('resize', setMeasuredHeight);

    return () => window.removeEventListener('resize', setMeasuredHeight);
  }, []);

  return height;
};
