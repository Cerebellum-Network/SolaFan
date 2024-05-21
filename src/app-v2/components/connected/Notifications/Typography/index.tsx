import {makeStyles, ThemeProvider, Typography as MaterialTypography, useTheme} from '@material-ui/core';
import clsx from 'clsx';
import {ForwardedRef, forwardRef} from 'react';

import {DISPLAY_TYPES, TYPOGRAPHY_VARIANTS} from './types';

const useStyles = makeStyles({
  root: {
    textTransform: 'initial',
  },
  caption1: {
    fontSize: '12px',
  },
  caption2: {
    fontSize: '10px',
  },
  button1: {
    fontSize: '14px',
  },
  button2: {
    fontSize: '12px',
  },
});

const Typography = forwardRef(
  (
    {variant = TYPOGRAPHY_VARIANTS.body1, display, noWrap, className, style, children, ...props}: TypographyProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    //@ts-ignore
    const muiVariant = TYPOGRAPHY_VARIANTS[variant];
    const classes = useStyles();
    const theme = useTheme();

    return (
      <ThemeProvider theme={theme}>
        <MaterialTypography
          ref={ref}
          {...props}
          style={style}
          variant={muiVariant}
          //@ts-ignore
          className={clsx(classes.root, classes[variant], className)}
          display={display}
          noWrap={noWrap}
        >
          {children}
        </MaterialTypography>
      </ThemeProvider>
    );
  },
);

interface TypographyProps {
  /**
   * Controls the display type.
   */
  display?: DISPLAY_TYPES;
  /** The variant of the button that defines its look */
  variant?: TYPOGRAPHY_VARIANTS;
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  noWrap?: boolean;
  className?: string;
  style?: Object;
  // ref?: MutableRefObject<HTMLElement | null>,
}

Typography.displayName = 'Typography';

export {Typography};
