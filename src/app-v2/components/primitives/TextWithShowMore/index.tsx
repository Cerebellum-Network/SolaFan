import {cx} from '@linaria/core';
import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {memo, MutableRefObject, useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import colors from '../../../../styles/colors';
import {useIsOverflow} from '../../../hooks/useIsOverflow';

const useStyles = makeStyles<Theme, {rowsCount: number; clientHeight?: number | string; scrollHeight?: number}>(
  (theme) => ({
    text: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',
      color: colors.secondaryDark,
      letterSpacing: '0.75',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: ({rowsCount}) => rowsCount,
      height: ({clientHeight}) => `${clientHeight}px`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'height 100ms ease-out',
    },
    textShowed: {
      display: 'block',
      WebkitLineClamp: 'none',
      height: ({scrollHeight}) => `${scrollHeight}px`,
    },
    textHide: {
      maxHeight: ({rowsCount}) => `${rowsCount * 24}px`,
    },
    showMore: {
      fontSize: '13px',
      lineHeight: '22px',
      fontWeight: 500,
      color: theme.palette.secondary.main,
      cursor: 'pointer',
    },
  }),
);

type Props = {
  children: string;
  maxHeight?: number;
  rowsCount?: number;
  buttonText?: string;
  classes?: Partial<Record<'root' | 'text' | 'showMore', string>>;
};

export const TextWithShowMore = memo(({children, maxHeight, rowsCount = 2, buttonText, classes}: Props) => {
  const {t} = useTranslation();
  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);

  const ref = useRef<HTMLElement | null>(null);

  const calculateRowsCount = (textRef: MutableRefObject<HTMLElement | null>, maxHeight: number): number => {
    if (!textRef.current) return 0;

    const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight || '24px');
    return Math.floor(maxHeight / lineHeight);
  };

  const calculatePaddings = (textRef: MutableRefObject<HTMLElement | null>): number => {
    if (!textRef.current) return 0;

    const computedStyle = window.getComputedStyle(textRef.current);

    const paddingTop = parseFloat(computedStyle.paddingTop || '0');
    const paddingBottom = parseFloat(computedStyle.paddingBottom || '0');

    return paddingTop + paddingBottom;
  };

  const styles = useStyles({
    rowsCount: maxHeight ? calculateRowsCount(ref, maxHeight) : rowsCount,
    clientHeight: maxHeight
      ? maxHeight > (ref.current?.clientHeight || 0)
        ? 'max-height'
        : maxHeight - calculatePaddings(ref)
      : ref.current?.clientHeight,
    scrollHeight: ref.current?.scrollHeight,
  });

  const isOverflow = useIsOverflow(ref, maxHeight);

  const onShowMoreClick = useCallback(() => setIsShowMoreClicked((value) => !value), []);

  return (
    <Box className={classes?.root}>
      <Typography
        variant="body1"
        ref={ref}
        className={cx(isShowMoreClicked ? styles.textShowed : styles.textHide, styles.text, classes?.text)}
      >
        {children}
      </Typography>
      {isOverflow && (
        <Typography className={cx(styles.showMore, classes?.showMore)} onClick={onShowMoreClick}>
          {buttonText ?? isShowMoreClicked ? t('Show less') : t('See more')}
        </Typography>
      )}
    </Box>
  );
});
