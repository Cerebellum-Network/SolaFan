import {Box, Card, Typography} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Skeleton} from '@material-ui/lab';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {FC} from 'react';
import {Link} from 'react-router-dom';

import {formatPrice} from '../../../../shared/lib/formatPrice';
import {WalletType} from '../../../components/shared/Wallet/types';

type Props = {
  wallet?: WalletType;
};

export const WalletButton: FC<Props> = ({wallet}) => {
  const {t, locale} = useLocalization();

  return (
    <Link to={`/${locale}/home/user/wallet`}>
      <Card variant="outlined" style={{borderRadius: 12}}>
        <Box m={1.5} display="flex" gridGap={8}>
          {wallet?.icon}
          <Box flex={1} display="flex" flexDirection="column" gridGap={4}>
            <Typography variant="body2" style={{fontWeight: 500}}>
              {t('Your')} {wallet?.title || t('Wallet')}
            </Typography>
            {wallet?.walletBalance == null ? (
              <Skeleton variant="text" width={80} />
            ) : (
              <Typography variant="body2" style={{fontWeight: 500}} color="textSecondary">
                {formatPrice(wallet?.walletBalance)}&nbsp;
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <NavigateNextIcon color="disabled" style={{fontSize: 32}} />
          </Box>
        </Box>
      </Card>
    </Link>
  );
};
