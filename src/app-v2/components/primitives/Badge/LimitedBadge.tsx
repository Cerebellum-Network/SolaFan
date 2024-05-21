import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/limitedBadge.icon.svg';
import {Badge} from './index';

export const LimitedBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('LIMITED')} />;
};
