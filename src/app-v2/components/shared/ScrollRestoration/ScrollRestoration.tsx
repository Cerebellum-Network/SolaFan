import {FC, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

type Offset = {
  x: number;
  y: number;
};

const getOffset = (key: string, action: string, storageKey: string) => {
  if (action === 'PUSH') {
    return {x: 0, y: 0};
  }
  const data = sessionStorage.getItem(storageKey);
  const keys = data == null ? undefined : JSON.parse(data);
  return (keys[key] as Offset) || ({x: 0, y: 0} as const);
};

const setOffset = (key: string, value: Offset, storageKey: string) => {
  const data = sessionStorage.getItem(storageKey);
  let keys = data == null ? {} : JSON.parse(data);
  keys = {...keys, ...{[key]: value}};
  sessionStorage.setItem(storageKey, JSON.stringify(keys));
};

type Props = {
  active?: boolean;
  storageKey: string;
};

export const ScrollRestoration: FC<Props> = ({active = true, storageKey}: Props) => {
  const history = useHistory();

  useEffect(() => {
    history.listen(({...args}, action: string) => {
      // Navigation action not triggered by way of 'forward' or 'back' behavior
      if (action === 'PUSH') {
        setOffset(args.key, {x: window.scrollX, y: window.scrollY}, storageKey);
      }

      // Only modify the scroll if active
      if (active) {
        const {x, y} = getOffset(args.key, action, storageKey);
        window.scrollTo(x, y);
      }
    });
  }, [active, history, storageKey]);

  return null;
};
