import {useEffect, useState} from 'react';

const PHONE_WIDTH = 600;
const TABLET_WIDTH = 768;
const LAPTOP_AND_DESKTOP_WIDTH = 992;

function getWindowDimensions() {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowDimensions.width < PHONE_WIDTH,
    isTablet: windowDimensions.width > PHONE_WIDTH && windowDimensions.width < TABLET_WIDTH,
    isDesktop: windowDimensions.width > LAPTOP_AND_DESKTOP_WIDTH,
  };
}

export {useWindowDimensions};
