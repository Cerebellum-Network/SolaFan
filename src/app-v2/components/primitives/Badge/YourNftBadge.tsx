import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/yourNftBadge.icon.svg';
import {Badge} from './index';

export const YourNftBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('Your NFT')} />;
};
