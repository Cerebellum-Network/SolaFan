import {Box} from '@material-ui/core';

import {useLocalization} from '../../../hooks/use-locale.hook';

export enum SizeEnum {
  small = 'spinner-border-sm',
}

type BootstrapLoaderParams = {
  size?: SizeEnum;
  color?: string;
};

function BootstrapLoader({size, color = 'text-light'}: BootstrapLoaderParams) {
  const {t} = useLocalization();
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <div className={`spinner-border ${color} ${size ? size : ''}`} role="status">
        <span className="visually-hidden">{t('Loading...')}</span>
      </div>
    </Box>
  );
}

export default BootstrapLoader;
