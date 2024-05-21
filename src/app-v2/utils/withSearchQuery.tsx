import {ComponentProps, FC, useMemo} from 'react';
import {useLocation} from 'react-router-dom';

export const withSearchQuery = (fields: string[]) => (Component: FC) => (props: ComponentProps<typeof Component>) => {
  const {search} = useLocation();

  const params = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    if (!searchParams) {
      return {};
    }
    return fields.reduce((acc, field) => {
      acc[field] = searchParams.get(field) || undefined;
      return acc;
    }, {} as {[key: string]: string | undefined});
  }, [search]);

  return <Component {...props} {...params} />;
};
