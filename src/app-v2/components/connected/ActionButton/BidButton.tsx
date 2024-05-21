import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {useLocalization} from '../../../hooks/use-locale.hook';
import {StartBidFlowCommand} from '../../../redux/modules/auctions/actions';

export interface BidButtonProps {
  text?: string;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
}

const PlainBidButton = ({size, variant, text, disabled, onClick}: BidButtonProps) => {
  const {t} = useLocalization();

  return (
    <Button size={size} variant={variant} disabled={disabled} onClick={onClick}>
      {text || t('Bid')}
    </Button>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  {nftId, sellerWalletAddress}: {nftId: string; sellerWalletAddress: string},
) => ({
  onClick: () => dispatch(StartBidFlowCommand.create(nftId, sellerWalletAddress)),
});

export const BidButton = connect(() => ({}), mapDispatchToProps)(PlainBidButton);
