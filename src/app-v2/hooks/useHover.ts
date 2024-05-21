import React, {useEffect, useRef, useState} from 'react';

type UseHoverType<T extends HTMLDivElement> = [React.RefObject<T>, boolean];

export function useHover<T extends HTMLDivElement>(): UseHoverType<T> {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseOver);
      node.addEventListener('mouseleave', handleMouseOut);
      return () => {
        node.removeEventListener('mouseenter', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, value];
}
