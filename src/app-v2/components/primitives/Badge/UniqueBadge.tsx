import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/auctionedBadge.icon.svg';
import {Badge} from './index';

export const UniqueBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('UNIQUE')} />;
};
