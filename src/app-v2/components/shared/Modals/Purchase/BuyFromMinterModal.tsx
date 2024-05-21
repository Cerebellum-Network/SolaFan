import {Box, Button, CircularProgress, Divider, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {memo, useCallback, useMemo, useState} from 'react';

import {useLocalization} from '../../../../../app-v2/hooks/use-locale.hook';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {QuantitySelect} from '../../../primitives/QuantitySelect';
import {StyledLink} from '../../../primitives/StyledLink';
import {WalletBalanceCard} from '../../../primitives/WalletBalanceCard';
import {ReactComponent as BuyIcon} from '../assets/buy.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '200px',
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      height: '44px',
    },
  },
  quantitySelectBox: {
    width: '200px',
  },
  hide: {
    display: 'none !important',
  },
}));

type Props = {
  image?: string;
  creatorName?: string;
  title?: string;
  nftLink: string;
  sellerWalletAddress?: string;
  walletName: string;
  walletBalance: number;
  nftAddress?: string;
  quantityOptions: string[];
  disabledQuantiy?: boolean;
  quantity: number;
  priceUSDC?: number;
  orderId?: string;
  onClose: () => void;
  disabledBuy?: boolean;
  onBuyClick: (sellerWalletAddress: string, price: number, qty: number, orderId: string) => void;
  disabledCardPay?: boolean;
  onPayByCard: (orderId: string) => void;
  onFundWalletClick: () => void;
};

export const BuyFromMinterModal = memo(
  ({
    image,
    creatorName,
    title,
    nftLink,
    walletName,
    walletBalance,
    nftAddress,
    quantityOptions,
    disabledQuantiy,
    sellerWalletAddress,
    quantity,
    priceUSDC,
    orderId,
    onClose,
    disabledBuy,
    onBuyClick,
    disabledCardPay,
    onPayByCard,
    onFundWalletClick,
  }: Props) => {
    const {t} = useLocalization();
    const styles = useStyles();
    const [qtyToPurchase, setQtyToPurchase] = useState<number>(quantity);
    const [isProcessing, setProcessing] = useState<boolean>(false);

    const totalAmount = (priceUSDC || 0) * qtyToPurchase;
    const insufficientFunds = !walletBalance || totalAmount > walletBalance;
    const handleBuyClick = useCallback(() => {
      setProcessing(true);
      if (sellerWalletAddress && orderId) {
        onBuyClick(sellerWalletAddress, totalAmount, qtyToPurchase, orderId);
      }
    }, [onBuyClick, sellerWalletAddress, totalAmount, qtyToPurchase, orderId]);

    const handlePayByCard = useCallback(() => {
      setProcessing(true);
      if (orderId) {
        onPayByCard(orderId);
      }
    }, [onPayByCard, orderId]);

    const handleQuantityChange = useCallback(
      (value: string) => {
        setQtyToPurchase(Number(value));
      },
      [setQtyToPurchase],
    );

    const isHidePrice = useMemo(
      () => qtyToPurchase?.toString() === '1' && quantityOptions.length === 1 && quantityOptions.includes('1'),
      [quantityOptions, qtyToPurchase],
    );

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && creatorName && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} creator={creatorName} title={title} />
            </StyledLink>
          )}
          <Box pt="16px" className={styles.hide}>
            <WalletBalanceCard balance={walletBalance} walletName={walletName} />
          </Box>
        </>
      ),
      [creatorName, image, nftLink, styles.hide, title, walletBalance, walletName],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          {nftAddress && (
            <Box pb="8px">
              <CopyBox title={t('NFT ID')} copiedText={nftAddress} />
            </Box>
          )}
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Quantity')}>
              <Box className={styles.quantitySelectBox}>
                <QuantitySelect
                  quantityOptions={quantityOptions}
                  quantity={quantity}
                  setQuantity={handleQuantityChange}
                  disabledQuantiy={disabledQuantiy}
                />
              </Box>
            </NftModalValueBlock>
          </Box>
          <Divider />
          {!isHidePrice && priceUSDC != null && (
            <>
              <Box pb="8px" pt="16px">
                <NftModalValueBlock title={t('Price')} value={`${priceUSDC.toFixed(2)} USDC `} />
              </Box>
              <Divider />
            </>
          )}
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Total amount')}
              value={`${totalAmount.toFixed(2)} USDC `}
              subValue={`(~${totalAmount.toFixed(2)} USD)`}
            />
          </Box>
          <Divider />
        </>
      ),
      [
        disabledQuantiy,
        handleQuantityChange,
        isHidePrice,
        nftAddress,
        priceUSDC,
        quantity,
        quantityOptions,
        styles.quantitySelectBox,
        t,
        totalAmount,
      ],
    );

    // <ErrorMsg variant="error" text="Insufficient balance, fund your wallet" />
    const renderAdditionalInfoBlock = useCallback(() => (insufficientFunds ? <></> : <></>), [insufficientFunds]);

    const renderButtons = useCallback(
      () => (
        <>
          {insufficientFunds && (
            <Button
              variant="contained"
              color="primary"
              className={clsx(styles.button, styles.hide)}
              disabled={isProcessing}
              onClick={onFundWalletClick}
            >
              {t('Fund wallet')}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            className={clsx(styles.button, styles.hide)}
            disabled={disabledBuy || insufficientFunds || isProcessing}
            onClick={handleBuyClick}
          >
            {isProcessing ? <CircularProgress /> : t('Buy')}
          </Button>
          <Button
            variant="text"
            color="secondary"
            className={styles.button}
            disabled={disabledCardPay || isProcessing}
            onClick={handlePayByCard}
          >
            {t('Pay by card')}
          </Button>
        </>
      ),
      [
        insufficientFunds,
        styles.button,
        styles.hide,
        isProcessing,
        onFundWalletClick,
        t,
        disabledBuy,
        handleBuyClick,
        disabledCardPay,
        handlePayByCard,
      ],
    );

    return (
      <PurchaseModalBox icon={<BuyIcon />} title={t('Buy this NFT')} onClose={onClose}>
        <PurchaseModalBoxInner
          renderNftCardAndUserWallet={renderNftCardAndUserWallet}
          renderNftPriceInfo={renderNftPriceInfo}
          renderAdditionalInfoBlock={renderAdditionalInfoBlock}
          renderButtons={renderButtons}
        />
      </PurchaseModalBox>
    );
  },
);
