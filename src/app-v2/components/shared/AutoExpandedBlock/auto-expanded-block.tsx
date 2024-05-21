import {styled} from '@linaria/react';
import {ReactNode, useEffect, useRef, useState} from 'react';

import {useLocalization} from '../../../hooks/use-locale.hook';

type Props = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  lines?: number;
};

const Block = styled.div<{lines: number; collapsed: boolean}>`
  overflow: ${({collapsed}) => (collapsed ? 'hidden' : 'visible')};
  display: ${({collapsed}) => (collapsed ? '-webkit-box' : 'block')};
  -webkit-box-orient: ${({collapsed}) => (collapsed ? 'vertical' : 'horizontal')};
  -webkit-line-clamp: ${({lines, collapsed}) => (collapsed ? lines : 'none')};

  // fixes incorrect support of line-clamp in Safari below 17
  // this media query will be true only for Safari 15, 16 which don't support line-clamp properly
  // 1. One can't use @supports not (-webkit-line-clamp: 2) as safari 15,16 claim such support
  // 2. hanging-punctuation for now is supported only for safari so far https://caniuse.com/?search=hanging-punctuation
  // 3. At the same time support for rcap size units has been introduced in safari 17
  @supports (hanging-punctuation: first) and (not (font-size: 12rcap)) {
    & > * {
      display: inline;
    }
    & > *:after {
      // \A is a new line https://www.w3.org/TR/CSS2/syndata.html#strings
      content: '\\A\\A';
      white-space: pre;
    }
  }
`;

export function AutoExpandedBlock({children, className, lines = 4, disabled = false}: Props) {
  const {t} = useLocalization();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTextOverflow, setIsTextOverflow] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const el = ref.current;
    let visible = true;
    if (el && visible) {
      const value = el.scrollHeight > el.clientHeight;
      setIsTextOverflow(value);
      setCollapsed(value);
    }
    return () => {
      visible = false;
    };
  }, []);

  return (
    <div className={className}>
      <Block collapsed={isTextOverflow && collapsed} ref={ref} lines={lines}>
        {children}
      </Block>
      {isTextOverflow && !disabled && (
        <div className="mt-1">
          <button
            onClick={() => setCollapsed((v) => !v)}
            type="button"
            className="cursor-pointer font-bold text-[#6E6E79] hover:opacity-75 transition-opacity"
          >
            {collapsed ? t('Load more') : t('Hide')}
          </button>
        </div>
      )}
    </div>
  );
}
