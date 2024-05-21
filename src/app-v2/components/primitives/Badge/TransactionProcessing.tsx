import {useTranslation} from 'react-i18next';

import {ReactComponent as Icon} from './accets/transactionProcessing.icon.svg';
import {Badge} from './index';

export const TransactionProcessing = () => {
  const {t} = useTranslation();
  return <Badge icon={<Icon />} text={t('Transaction processing')} />;
};
