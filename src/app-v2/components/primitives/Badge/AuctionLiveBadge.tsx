import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/auctionLive.icon.svg';
import {Badge} from './index';

export const AuctionLiveBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('Auction live')} />;
};
