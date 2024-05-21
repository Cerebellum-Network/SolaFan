import {Order} from '@cere/services-types/dist/types/bff/davinci-common-context/interfaces/order.interface';
import {Typography} from '@material-ui/core';

import {useLocalization} from '../../../../hooks/use-locale.hook';

export const StartingFromPrice = ({orders}: {orders?: Order[]}) => {
  const {t} = useLocalization();

  const smallestOrder = orders?.reduce((min, current) => {
    if (!min || current.priceUsd < min.priceUsd) {
      return current;
    }
    return min;
  }, null as Order | null);

  if (!smallestOrder) {
    return null;
  }

  return (
    <>
      <Typography variant="caption" color="textSecondary">
        {t('Starting from')}
      </Typography>
      <Typography variant="body1">${smallestOrder.priceUsd}</Typography>
    </>
  );
};
