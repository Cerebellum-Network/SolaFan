import {Button} from '@material-ui/core';
import {sortBy} from 'lodash';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {generatePath, Link, matchPath, useLocation} from 'react-router-dom';

import {bigNumberishToString, toBigNumber} from '../../../../shared/lib/big-number-utils';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {StartSecondaryNFTPurchaseCommand} from '../../../redux/modules/purchase/actions';
import {UsersNftCardInterface} from '../../../types/nft';
import {formatNumber} from '../../../utils/helpers/format-number';
import {DisabledButton} from './DisabledButton';

export interface BuyOnMarketplaceButtonProps {
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  buttonText?: string;
  disabled?: boolean;
  nftId: string;
  orders: UsersNftCardInterface['secondaryOrders'];
  qty: number;
  sellerWalletAddress: string;
  supply?: number;
}

export const BuyOnMarketplaceButton = ({
  disabled,
  nftId,
  orders,
  sellerWalletAddress,
  qty,
  color,
  supply,
}: BuyOnMarketplaceButtonProps) => {
  const {t, locale} = useLocalization();
  const dispatch = useDispatch();
  const minimumOrder = useMemo(
    (): UsersNftCardInterface['primaryOrder'] =>
      sortBy(
        orders?.filter((order) => toBigNumber(order.balance).gt(0)),
        (order) => order.priceUsd,
      )[0],
    [orders],
  );
  const isSoldOut = orders?.every((order) => toBigNumber(order.balance).eq(0));
  const location = useLocation();

  const totalBalance =
    orders?.reduce((acc, order) => acc.add(toBigNumber(order.balance)), toBigNumber(0)) || toBigNumber(0);

  const isNftPage =
    matchPath(location.pathname, {
      path: '/:locale/home/collectible/:cmsNftIncrementId',
      exact: true,
      strict: false,
    }) != null;

  const onClick = useCallback(() => {
    if (minimumOrder) {
      dispatch(
        StartSecondaryNFTPurchaseCommand.create(
          nftId,
          bigNumberishToString(minimumOrder.orderId),
          sellerWalletAddress,
          minimumOrder.priceUsd,
          qty,
        ),
      );
    }
  }, [dispatch, nftId, minimumOrder, qty, sellerWalletAddress]);

  if (isSoldOut || !minimumOrder) {
    return <DisabledButton>{t('Sold out')}</DisabledButton>;
  }

  // prettier-ignore
  const text = `${formatNumber(totalBalance)} / ${formatNumber(supply || 0)} ${t('Left')} | ${t('Buy on Marketplace')} — $${formatNumber(minimumOrder.priceUsd)}`;

  if (!isNftPage) {
    return (
      <Link
        className="rounded-lg block px-3 h-[48px] box-border cursor-pointer flex items-center justify-center border-[1px] border-[#fecb41] transition-opacity hover:opacity-75 text-black font-medium"
        to={generatePath(ROUTES.NFT_MARKETPLACE, {locale, nftId})}
      >
        {text}
      </Link>
    );
  }

  return (
    <Button color={color} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};
