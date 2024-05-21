import {Button} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {StartPrimaryNFTPurchaseCommand} from '../../../redux/modules/purchase/actions';

interface BuyButtonProps {
  onClick: () => void;
}

const BuyButton = memo(({onClick}: BuyButtonProps) => {
  const {t} = useTranslation();

  return (
    <Button variant="contained" color="primary" fullWidth onClick={onClick}>
      {t('Buy')}
    </Button>
  );
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  {nftId, orderId, qty}: {nftId: string; orderId: string; qty: number},
) => ({
  onClick: () => {
    dispatch(StartPrimaryNFTPurchaseCommand.create(nftId, orderId, qty));
  },
});

export const PlainBuyButton = connect(() => ({}), mapDispatchToProps)(BuyButton);
