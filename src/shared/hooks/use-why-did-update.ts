import {useEffect, useRef} from 'react';

export function useWhyDidUpdate(name: string, props: Record<string, unknown>): void {
  const previousProps = useRef<Record<string, unknown>>();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[why-did-update: initial props]', name, props);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (previousProps.current && process.env.NODE_ENV !== 'production') {
      const allKeys = Object.keys({...(previousProps?.current ?? {}), ...props});
      const changesObj: Record<string, unknown> = {};
      allKeys.forEach((key) => {
        if (previousProps?.current?.[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps?.current?.[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-update]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}
