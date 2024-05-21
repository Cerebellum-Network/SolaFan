import {Button} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useCallback} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Dispatch} from 'redux';

import {HIDE_MARKETPLACE_PAGE} from '../../../../config/common';
import {StartNFTSellingCommand} from '../../../redux/modules/selling/actions';

export interface SellButtonProps {
  text?: string;
  disabled?: boolean;
  onClick: () => void;
  cardLink: string;
  size?: 'small' | 'medium' | 'large';
}

export const PlainSellButton = ({text, disabled, onClick, cardLink, size}: SellButtonProps) => {
  const {t} = useLocalization();
  const history = useHistory();

  const handleOnClick = useCallback(() => {
    if (!HIDE_MARKETPLACE_PAGE) {
      onClick();
    }
    history.push(cardLink);
  }, [cardLink, history, onClick]);
  return (
    <Button
      size={size || 'small'}
      variant={HIDE_MARKETPLACE_PAGE ? 'outlined' : 'contained'}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {text || !HIDE_MARKETPLACE_PAGE ? t('Sell') : t('View')}
    </Button>
  );
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: {nftId: string}) => ({
  onClick: () => dispatch(StartNFTSellingCommand.create(nftId)),
});

export const SellButton = connect(() => ({}), mapDispatchToProps)(PlainSellButton);
