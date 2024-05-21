import MobileDetect from 'mobile-detect';

export const isMobileDevice = () => new MobileDetect(window.navigator.userAgent).mobile();
