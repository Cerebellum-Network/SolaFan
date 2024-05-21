import {Box, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';

import {ReactComponent as ShoppingCart} from './ShoppingCart.svg';

export const DiscoverNotice = () => {
  const {t} = useLocalization();
  return (
    <Box pb={4} textAlign="center" display="flex" flexDirection="column" alignItems="center" gridGap={12}>
      <ShoppingCart style={{marginTop: 12}} />
      <Box pb={3}>
        <Typography variant="body2" color="textSecondary">
          {t('You do not belong in any club.')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('Discover the ongoing events and buy an access collectible to gain access to more exclusive events.')}
        </Typography>
      </Box>
    </Box>
  );
};
