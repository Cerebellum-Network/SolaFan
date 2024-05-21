import {Button} from '@material-ui/core';
import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RequiredSome} from '../../../../shared/types/required-some';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {StartPrimaryNFTPurchaseCommand} from '../../../redux/modules/purchase/actions';
import {selectCereWalletReadiness} from '../../../redux/modules/wallets/selectors';
import {UsersNftCardInterface} from '../../../types/nft';

export interface BuyFromMinterButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  text?: string;
  disabled?: boolean;
  buyBtnEvent?: string;
  nftId: string;
  order: RequiredSome<UsersNftCardInterface, 'primaryOrder'>['primaryOrder'];
  qty: number;
  returnTo: string;
}

export const BuyFromMinterButton = ({
  text,
  disabled,
  nftId,
  order,
  qty,
  returnTo,
  size,
  color,
}: BuyFromMinterButtonProps) => {
  const {t} = useLocalization();
  const dispatch = useDispatch();
  const cereWalletIsReady = useSelector(selectCereWalletReadiness);

  const clickHandler = useCallback(() => {
    dispatch(StartPrimaryNFTPurchaseCommand.create(nftId, String(order.orderId), qty, returnTo));
  }, [dispatch, nftId, order, qty, returnTo]);

  const buttonDisabled = cereWalletIsReady ? disabled : false;

  const buttonContent = useMemo(() => text || t('Buy'), [t, text]);

  return (
    <Button variant="contained" size={size || 'small'} onClick={clickHandler} disabled={buttonDisabled} color={color}>
      {buttonContent}
    </Button>
  );
};
