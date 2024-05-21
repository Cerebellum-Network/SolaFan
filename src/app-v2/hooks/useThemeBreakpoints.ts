import {Theme, useMediaQuery} from '@material-ui/core';

export const useThemeBreakpoints = () => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'));
  const isTablet = !isMobile && !isDesktop;

  return {isMobile, isTablet, isDesktop};
};
