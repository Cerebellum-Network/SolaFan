import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/marketplaceBadge.icon.svg';
import {Badge} from './index';

export const MarketplaceBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('Available on marketplace')} />;
};
