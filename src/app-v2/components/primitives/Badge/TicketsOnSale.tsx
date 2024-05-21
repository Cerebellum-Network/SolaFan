import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/ticketBadge.icon.svg';
import {Badge} from './index';

export const TicketBadge = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('Tickets on sale')} />;
};
