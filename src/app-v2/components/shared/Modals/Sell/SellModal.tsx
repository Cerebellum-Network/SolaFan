import {Box, Typography} from '@material-ui/core';
import {memo, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Tabs} from '../../../primitives/Tabs';
import {Condition, ConditionsList} from '../../Conditions';
import {ReactComponent as SellIcon} from '../assets/bid.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {AuctionBlock} from './AuctionBlock';
import {FixedPriceBlock} from './FixePriceBlock';
import {useSellModalStyles} from './styles';

enum SellingVariants {
  FixedPrice = 'FixedPrice',
  Auction = 'Auction',
}

type Props = {
  quantity: number;
  price?: number;
  currency?: string;
  royalty: number;
  auctionStartingPrice?: number;
  onClose: () => void;
  sell: (price: number, quantity: number) => void;
  startAuction: (price: number, quantity: number) => void;
};

export const SellModal = memo(
  ({quantity, price, royalty, auctionStartingPrice, onClose, sell, startAuction}: Props) => {
    const {t} = useTranslation();
    const styles = useSellModalStyles();
    const [isProcessing, setProcessing] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(SellingVariants.FixedPrice);

    const handleSell = (price: number, quantity: number) => {
      setProcessing(true);
      sell(price, quantity);
    };

    const handleStartAuction = (price: number, quantity: number) => {
      setProcessing(true);
      startAuction(price, quantity);
    };

    const TABS = useMemo(
      () => [
        {value: SellingVariants.FixedPrice, label: t('Fixed price')},
        {value: SellingVariants.Auction, label: t('Auction')},
      ],
      [t],
    );

    return (
      <PurchaseModalBox icon={<SellIcon />} title={t('Set listing price')} onClose={onClose}>
        <>
          <Typography className={styles.subTitle}>
            {t('Please set the listing price to sell your NFT on the marketplace.')}
          </Typography>
          <Box className={styles.tabsBox}>
            <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} disabled={isProcessing} />
          </Box>
          <ConditionsList>
            <Condition condition={activeTab === SellingVariants.FixedPrice}>
              {price && (
                <FixedPriceBlock
                  price={price}
                  quantity={quantity}
                  royalty={royalty}
                  onClose={onClose}
                  onSellClick={handleSell}
                />
              )}
            </Condition>
            <Condition condition={activeTab === SellingVariants.Auction}>
              {auctionStartingPrice && (
                <AuctionBlock
                  startingPrice={auctionStartingPrice}
                  quantity={quantity}
                  royalty={royalty}
                  onClose={onClose}
                  onSellClick={handleStartAuction}
                />
              )}
            </Condition>
          </ConditionsList>
        </>
      </PurchaseModalBox>
    );
  },
);
