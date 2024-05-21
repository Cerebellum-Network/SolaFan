import {Theme} from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';
import {useMemo} from 'react';

import colors from '../../styles/colors';
import {AppConfig} from '../types/app-config';

type Breakpoints = Theme['breakpoints'];
type BreakpointValues = Breakpoints['values'];

type BreakpointOptions = Breakpoints['keys'];

const breakPointKeys: BreakpointOptions = ['xs', 'sm', 'md', 'lg', 'xl'];

const values: BreakpointValues = {
  xs: 0,
  sm: 440,
  md: 700,
  lg: 1280,
  xl: 1920,
};

export const useCustomTheme = (appConfig: AppConfig) => {
  const themeParams = {
    primaryMainColor: appConfig.primaryMainColor || colors.primaryDark,
    primaryLightColor: colors.light,
    secondaryMainColor: appConfig.secondaryMainColor || colors.accent,
    secondaryDarkColor: appConfig.secondaryDarkColor || colors.accentDark,
    // buttonContainedPrimaryFirstColor: appConfig.buttonContainedPrimaryFirstColor || colors.accent,
    // buttonContainedPrimarySecondColor: appConfig.buttonContainedPrimarySecondColor || colors.buttonSecondary,
    // buttonContainedSecondaryColor: appConfig.buttonContainedSecondaryColor || colors.primaryDark,
    infoMainColor: appConfig.infoMainColor || colors.cyan,
    backgroundPaperColor: appConfig.backgroundPaperColor || colors.snowWhite,
    backgroundDefaultColor: appConfig.backgroundDefaultColor || colors.white,
    grey100Color: appConfig.grey100Color || colors.footer,
    grey700Color: appConfig.grey700Color || colors.lightGrey,
    purple: colors.purple,
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: themeParams.primaryMainColor,
            light: themeParams.primaryLightColor,
          },
          secondary: {
            main: themeParams.secondaryMainColor,
            dark: themeParams.secondaryDarkColor,
          },
          info: {
            main: themeParams.infoMainColor,
            contrastText: themeParams.purple,
          },
          background: {
            paper: themeParams.backgroundPaperColor,
            default: themeParams.backgroundDefaultColor,
          },
          grey: {
            700: themeParams.grey700Color,
            100: themeParams.grey100Color,
          },
          warning: {
            main: themeParams.secondaryMainColor,
          },
        },
        overrides: {
          MuiDialog: {
            paper: {
              borderRadius: 12,
            },
          },
          MuiButton: {
            // https://www.figma.com/file/DJWBMnc66F5iMN7TuN9Xk8/DaVinci?node-id=3347%3A20941&mode=dev
            contained: {
              boxShadow: 'none',
              backgroundColor: colors.black,
              color: colors.snowWhite,
              '&:hover': {
                background: `rgba(255, 255, 255, 0.7), ${colors.black}`,
              },
              '&:disabled': {
                color: 'white',
                backgroundColor: 'black',
                opacity: 0.3,
              },
            },

            outlined: {
              background: `rgba(255, 255, 255, 0.1), ${colors.black}`,
              '&:disabled': {
                opacity: 0.6,
              },
            },

            // primary color
            containedPrimary: {
              backgroundColor: colors.yellow,
              borderColor: colors.yellow,
              color: colors.black,
              '&:hover': {
                borderColor: `${colors.yellow}70 !important`,
                background: `${colors.yellow}70 !important`,
              },
              '&:disabled': {
                opacity: 0.3,
              },
            },
            outlinedPrimary: {
              backgroundColor: 'none',
              borderColor: colors.yellow,
              color: colors.black,
              '&:hover': {
                borderColor: `${colors.yellow}70 !important`,
                background: `none !important`,
              },
              '&:disabled': {
                opacity: 0.6,
              },
            },
            textPrimary: {
              '&:hover': {
                borderColor: `${colors.yellow}70 !important`,
                background: `${colors.yellow}70 !important`,
              },
              '&:disabled': {
                opacity: 0.3,
              },
            },

            // secondary color
            containedSecondary: {
              background: `linear-gradient(277.13deg, ${colors.buttonSecondary} 11.98%, ${colors.accent} 83.77%)`,
              border: 'none',
              color: colors.snowWhite,
              '&:hover': {
                border: 'none',
                background: `linear-gradient(277.13deg, rgba(255, 255, 255, 0.3) 11.98%, rgba(255, 255, 255, 0.3) 83.77%), linear-gradient(277.13deg, ${colors.buttonSecondary} 11.98%, ${colors.accent} 83.77%)`,
              },
              '&:disabled': {
                opacity: 0.3,
              },
            },
            outlinedSecondary: {
              color: colors.black,
              '&:hover': {
                background: `linear-gradient(277.13deg, rgba(255, 255, 255, 0.7) 11.98%, rgba(255, 255, 255, 0.7) 83.77%), linear-gradient(277.13deg, #B01C63 11.98%, #FA0C58 83.77%), linear-gradient(277.13deg, rgba(176, 28, 99, 0.1) 11.98%, rgba(250, 12, 88, 0.1) 83.77%)`,
                border: `1px solid ${colors.buttonSecondary}`,
              },
              '&:disabled': {
                opacity: 0.6,
              },
            },

            // warning color
            colorInherit: {
              '&.MuiButton-contained': {
                color: colors.snowWhite,
                backgroundColor: `${colors.warning}`,
              },
              '&.MuiButton-outlined': {
                color: colors.warning,
                border: `1px solid ${colors.warning}`,
                '&:hover': {
                  background: `linear-gradient(277.13deg, rgba(255, 255, 255, 0.7) 11.98%, rgba(255, 255, 255, 0.7) 83.77%), linear-gradient(277.13deg, ${colors.warning} 11.98%, ${colors.warning} 83.77%)`,
                },
              },
              '&.MuiButton-text': {
                '&:hover': {
                  background: `linear-gradient(277.13deg, rgba(255, 255, 255, 0.8) 11.98%, rgba(255, 255, 255, 0.8) 83.77%), linear-gradient(277.13deg, ${colors.warning} 11.98%, ${colors.warning} 83.77%)`,
                },
              },
            },

            root: {
              textTransform: 'none',
              minHeight: '48px',
              borderRadius: '12px',
              lineHeight: '24px',
              height: '48px',
              '&> *': {
                pointerEvents: 'none',
              },
              '&:hover': {
                boxShadow: 'none !important',
              },
              padding: '0 24px 0 24px !important',
            },
            sizeSmall: {
              minHeight: '34px',
              height: '34px',
              fontSize: '14px',
              borderRadius: '17px',
            },
            sizeLarge: {
              minHeight: '58px',
              fontSize: '20px',
              borderRadius: '17px',
              height: '58px',
            },
          },
        },
        typography: {
          // https://www.figma.com/file/DJWBMnc66F5iMN7TuN9Xk8/DaVinci?type=design&node-id=3382-20984&mode=design&t=RSDlMzfGBD82sTFO-0
          fontFamily: 'HumanSans, Inter, Roboto, Helvetica, Arial, sans-serif',
          h1: {
            fontSize: '28px',
            fontWeight: 700,
            fontStyle: 'normal',
            lineHeight: '42px',
          },
          h2: {
            fontSize: '24px',
            fontWeight: 700,
            fontStyle: 'normal',
            lineHeight: '36px',
          },
          h3: {
            fontSize: '20px',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '30px',
          },

          subtitle1: {
            fontSize: '16px',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '24px',
          },
          subtitle2: {
            fontSize: '14px',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '21px',
          },
          body1: {
            fontSize: '16px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '24px',
          },
          body2: {
            fontSize: '14px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '21px',
          },
          caption: {
            fontSize: '12px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '18px',
          },
          overline: {
            fontSize: '10px',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '15px',
          },
          button: {fontSize: '16px', fontWeight: 500, fontStyle: 'normal', lineHeight: '24px'},
          h6: {
            // overline2
            fontSize: '8px',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '12px',
          },
        },
        breakpoints: {
          keys: breakPointKeys,
          down: (key) => (typeof key === 'number' ? '' : `@media (max-width:${values[key]}px)`),
          up: (key) => (typeof key === 'number' ? '' : `@media (min-width:${values[key] + 1}px)`),
          values,
        },
      }),
    [
      // themeParams.buttonContainedPrimarySecondColor,
      // themeParams.buttonContainedPrimaryFirstColor,
      themeParams.primaryMainColor,
      themeParams.primaryLightColor,
      themeParams.secondaryMainColor,
      // themeParams.buttonContainedSecondaryColor,
      themeParams.secondaryDarkColor,
      themeParams.infoMainColor,
      themeParams.backgroundPaperColor,
      themeParams.backgroundDefaultColor,
      themeParams.grey700Color,
      themeParams.grey100Color,
      themeParams.purple,
    ],
  );

  return {
    theme,
  };
};
