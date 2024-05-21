import {makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactElement, useMemo, useRef} from 'react';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';

const useStyles = makeStyles((theme) => ({
  badgeContainer: {
    height: '26px',
    width: 'fit-content',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '2px 8px',
    backgroundColor: theme.palette.grey[900],
    backdropFilter: 'blur(40px)',
    borderRadius: '13px',
    color: theme.palette.common.white,
  },
  iconBox: {
    minWidth: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    paddingLeft: '5px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
  },
  hidden: {
    display: 'none',
  },
}));

type Props = {
  icon: ReactElement;
  text: string;
};

export const Badge = memo(({icon, text}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const {isMobile, isTablet, isDesktop} = useThemeBreakpoints();

  const hideText = useMemo(
    () =>
      rootRef.current && iconRef.current && textRef.current
        ? rootRef.current?.clientWidth - 16 < iconRef.current?.clientWidth + textRef.current?.clientWidth
        : false,
    // we need to recalculate this value after breakpoints change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, isTablet, isDesktop],
  );

  const classes = useStyles();

  return (
    <div className={classes.badgeContainer} ref={rootRef}>
      <div className={classes.iconBox} ref={iconRef}>
        {icon}
      </div>
      {text && (
        <div ref={textRef}>
          <Typography className={clsx(classes.badgeText, hideText && classes.hidden)}>{text}</Typography>
        </div>
      )}
    </div>
  );
});
