import {AuctionStatus, NftCardInterface, WalletInterface} from '@cere/services-types';
import {Box, Typography} from '@material-ui/core';
import {memo, ReactNode, useMemo} from 'react';

import {checkIsHighestBid, getBidHistoryStatus} from '../../../utils/helpers/auction';
import {ActionButtonSecondary} from '../../connected/ActionButtonSecondary';
import {useRenderSubTitle} from '../Card/useRenderCardElements';
import {CardNftBadge} from '../CardNftBadge';
import {NftDetailAuctionInfo} from './NftDetailAuctionInfo';
import {PriceSubTitle} from './PriceSubTitle';
import {useNftDetailStyles} from './styles';

type Props = {
  nft?: NftCardInterface;
  pagination: ReactNode;
  userWalletAddress: string;
  externalWallets: WalletInterface[];
};

export const NftDetail = memo(({nft, pagination, userWalletAddress, externalWallets}: Props) => {
  const styles = useNftDetailStyles();

  const bids = useMemo(() => getBidHistoryStatus(nft?.id, nft?.auction?.bids), [nft?.id, nft?.auction?.bids]);
  const isAuction = useMemo(() => nft?.auctionStatus === AuctionStatus.ACTIVE, [nft?.auctionStatus]);
  const isHighestBid = useMemo(
    () => checkIsHighestBid(userWalletAddress, externalWallets, nft?.auction?.buyer),
    [userWalletAddress, externalWallets, nft?.auction?.buyer],
  );

  const renderSubTitle = useRenderSubTitle();

  if (!nft) {
    return null;
  }

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.imageWrapper}>
          <Box className={styles.imageBox}>
            <img src={nft.image} alt={nft.title} className={styles.image} />
          </Box>
        </Box>
        <Box className={styles.infoBox}>
          <Box className={styles.titleBox}>
            <Typography className={styles.title}>{nft.title}</Typography>
            {pagination}
          </Box>
          <Box className={styles.badgeBox}>
            <CardNftBadge />
          </Box>
          <Box className={styles.nftCount}>{renderSubTitle(nft.auctionStatus, nft.supply, nft.balance)}</Box>
          <Typography className={styles.text}>{nft.description}</Typography>
          <Box className={styles.bottomBox}>
            <Box>
              <PriceSubTitle isAuction={isAuction} bidsLength={nft?.auction?.bids?.length} />
              <Typography className={styles.price}>${nft.priceUsd?.toFixed(2)}</Typography>
            </Box>
            <Box className={styles.buttonBox}>
              <ActionButtonSecondary nft={nft} />
            </Box>
          </Box>
        </Box>
      </Box>
      {isAuction && (
        <NftDetailAuctionInfo
          isHighestBid={isHighestBid}
          bids={bids}
          userWalletAddress={userWalletAddress}
          externalWallets={externalWallets}
        />
      )}
    </Box>
  );
});
