import MobileDetect from 'mobile-detect';

export const isMobileDetect = () => new MobileDetect(window.navigator.userAgent).mobile();
