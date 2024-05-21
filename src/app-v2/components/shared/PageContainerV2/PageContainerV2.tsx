import {cx} from '@linaria/core';
import {memo, ReactNode} from 'react';

type Props = {
  children: NonNullable<ReactNode>;
  className?: string;
};

export const PageContainerV2 = memo(({children, className}: Props) => {
  return <div className={cx('px-6', 'md:px-10', 'lg:px-0', 'lg:mx-auto', 'lg:w-[1100px]', className)}>{children}</div>;
});
