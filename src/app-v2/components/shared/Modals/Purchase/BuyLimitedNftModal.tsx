import {CircularProgress, Dialog} from '@material-ui/core';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {generatePath} from 'react-router-dom';

import {ReactComponent as Cere} from '../../../../assets/svg/cere.svg';
import {ROUTES} from '../../../../constants/routes';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {contractProvider} from '../../../../models/blockchain';
import {SupportedWalletType} from '../../../../models/wallet/types';
import {getUserEmail} from '../../../../redux/modules/auth/selectors';
import {selectCurrentLocale} from '../../../../redux/modules/localization/selectors';
import {selectNftById} from '../../../../redux/modules/nfts/selectors';
import {
  CancelPurchaseCommand,
  PurchaseNFTForCryptoCommand,
  PurchaseNFTForFiatCommand,
} from '../../../../redux/modules/purchase/actions';
import {ConnectCereWallet} from '../../../../redux/modules/wallets';
import {
  selectActiveWalletBalance,
  selectActiveWalletType,
  selectWalletAddress,
} from '../../../../redux/modules/wallets/selectors';
import {formatNumber} from '../../../../utils/helpers/format-number';
import {CloseButton} from '../../../primitives/CloseButton';
import {ResponsiveImage} from '../../../primitives/ResponsiveImage/responsive-image';
import {StyledLink} from '../../../primitives/StyledLink';
import {Condition, ConditionsList, Defaults} from '../../Conditions';

type Props = {
  nftId: string;
  orderId: string;
  sellerWalletAddress: string;
  priceUSDC: number;
  quantity: number;
};

export const BuyLimitedNftModal = ({nftId, priceUSDC, quantity, orderId, sellerWalletAddress}: Props) => {
  const {t} = useLocalization();
  const [amount, setAmount] = useState(1);
  const [disableEnforceFocus, setDisableEnforceFocus] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<null | ReturnType<typeof t>>(null);

  const {getState} = useStore();
  const state: any = getState();
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);

  const image = nft?.image;
  const title = nft?.title;
  const walletBalance = useSelector(selectActiveWalletBalance);
  const nftLink = generatePath(ROUTES.NFT_PAGE, {nftId, locale});
  const activeWalletType = useSelector(selectActiveWalletType);
  const activeWalletAddress = selectWalletAddress(state, activeWalletType);

  const userEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(CancelPurchaseCommand.create());
  }, [dispatch]);

  const purchaseCrypto = useCallback(async () => {
    setProcessing(true);
    try {
      const erc20 = await contractProvider.getERC20Contract();
      const marketplace = await contractProvider.getMarketplaceContract();
      const orderInfo = await marketplace.orders(orderId);
      let tx = await erc20.approve(marketplace.address, orderInfo.price.mul(amount));
      await tx.wait();
      tx = await erc20.approve(orderInfo.collection, orderInfo.royaltyFee.mul(amount));
      await tx.wait();
      tx = await marketplace.processOrder(orderId, amount);
      await tx.wait();
      setError(null);
      dispatch(PurchaseNFTForCryptoCommand.create(nftId, orderId, sellerWalletAddress, priceUSDC, amount));
    } catch (e) {
      setProcessing(false);
      setError(t('An error occurred while processing the order. Please, try later'));
    }
  }, [amount, dispatch, nftId, orderId, priceUSDC, sellerWalletAddress, t]);

  const purchaseFiat = useCallback(() => {
    setProcessing(true);
    dispatch(PurchaseNFTForFiatCommand.create(nftId, orderId, amount, activeWalletAddress));
  }, [activeWalletAddress, amount, dispatch, nftId, orderId]);

  const isAuthenticated = userEmail != null;

  const totalAmount = priceUSDC * amount;
  const insufficientFunds = totalAmount > walletBalance;

  const signIn = useCallback(() => {
    setDisableEnforceFocus(true);
    dispatch(ConnectCereWallet.create(SupportedWalletType.CEREWALLET));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      setDisableEnforceFocus(false);
    }
  }, [isAuthenticated]);

  return (
    <Dialog PaperProps={{classes: {root: '!m-0'}}} disableEnforceFocus={disableEnforceFocus} onClose={onClose} open>
      <div className="w-full p-6">
        <div className="relative">
          <h3 className="font-bold flex items-center gap-x-2 text-[24px]">{t('Buy Collectible')}</h3>
        </div>
        <div className="absolute right-4 top-4 md:right-6 md:top-6">
          <CloseButton onClick={onClose} />
        </div>
        <div className="mt-6">
          <div className="mb-2">
            <ConditionsList>
              <Condition condition={!isAuthenticated}>
                <div>{t('Create your account or sign in to complete your purchase')}</div>
              </Condition>
              <Condition condition={isAuthenticated}>
                <div>{t('Set the the number of collectibles that you wish to purchase and confirm the payment')}</div>
              </Condition>
            </ConditionsList>
          </div>
          <div className="bg-gray-200 gap-x-3 flex items-center rounded-xl p-2">
            <StyledLink to={nftLink}>
              <ResponsiveImage
                alt={title}
                size={60}
                formats={nft?.formats}
                fallbackUrl={image ?? ''}
                className="w-[60px] h-[60px] rounded object-cover"
              />
            </StyledLink>
            <div>
              <h4>{title}</h4>
              <div className="gap-x-3 flex items-center">
                <div>
                  {t('Price')} <span className="font-bold">{formatNumber(priceUSDC)} USDC</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>
                    {t('Quantity')}: <span className="font-bold inline-block min-w-4">{amount}</span>
                  </span>
                  <button
                    disabled={amount <= 1}
                    className="w-[20px] h-[20px] bg-gray-300 disabled:text-gray-400 rounded flex items-center justify-center"
                    onClick={() => setAmount((v) => (v > 1 ? v - 1 : 1))}
                  >
                    -
                  </button>
                  <button
                    disabled={amount >= quantity}
                    className="w-[20px] h-[20px] bg-gray-300 disabled:text-gray-400 rounded flex items-center justify-center"
                    onClick={() => setAmount((v) => v + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ConditionsList>
            <Condition condition={!isAuthenticated}>
              <div className="my-4">
                <button
                  onClick={signIn}
                  className="w-full bg-black text-white h-12 flex items-center justify-center rounded-lg"
                >
                  {t('Sign in')}
                </button>
              </div>
            </Condition>
            <Defaults>
              <div className="my-4 box-border border-[1px] rounded-lg border-gray-400 p-3">
                <div className="grid gap-x-1 grid-cols-[20px_1fr]">
                  <div>
                    <Cere />
                  </div>
                  <div className="font-bold">{t('Cere wallet')}</div>
                  <div />
                  <div className="text-base">${formatNumber(walletBalance)}</div>
                </div>
              </div>
            </Defaults>
          </ConditionsList>
          <ConditionsList>
            <Condition condition={isAuthenticated}>
              <div className="mt-8 flex flex-col gap-y-4">
                {error != null && <div className="text-base mx-1 text-red-600">{error}</div>}
                <button
                  onClick={purchaseCrypto}
                  disabled={insufficientFunds || isProcessing}
                  className="w-full bg-black disabled:bg-gray-400 text-white disabled:text-gray-200 rounded-lg h-12 flex gap-x-2 items-center justify-center"
                  type="button"
                >
                  {isProcessing && <CircularProgress color="inherit" size={24} thickness={2} />}
                  <span>{t('Buy')}</span>
                </button>
                <button
                  onClick={purchaseFiat}
                  disabled={isProcessing}
                  className="w-full border-black border-[1px] text-black disabled:text-gray-500 box-border rounded-lg h-12 flex gap-x-2 items-center justify-center"
                  type="button"
                >
                  {isProcessing && <CircularProgress color="inherit" size={24} thickness={2} />}
                  <span>{t('Buy with Credit card')}</span>
                </button>
              </div>
            </Condition>
          </ConditionsList>
        </div>
      </div>
    </Dialog>
  );
};
