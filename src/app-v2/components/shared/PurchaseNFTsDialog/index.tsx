import {AuctionStatus, NftCardInterface, WalletInterface} from '@cere/services-types';
import {Box, Dialog, Slide, Typography} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import {KeyboardArrowDown as ArrowDownIcon} from '@material-ui/icons';
import clsx from 'clsx';
import {forwardRef, memo, MouseEvent, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {ActionButtonSecondary} from '../../connected/ActionButtonSecondary';
import {PaginationSimple} from '../../primitives/PaginationSimple';
import {useRenderSubTitle} from '../Card/useRenderCardElements';
import {ExclusiveCard} from './ExclusiveCard';
import {NftDetail} from './NftDetail';
import {useDialogStyles, useStyles} from './styles';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  onClose: () => void;
  exclusiveNfts: NftCardInterface[] | null;
  userWalletAddress: string;
  externalWallets: WalletInterface[];
};

export const PurchaseNFTsDialog = memo(({open, onClose, exclusiveNfts, userWalletAddress, externalWallets}: Props) => {
  const {t} = useTranslation();

  const [isOpenNftDetail, setIsOpenNftDetail] = useState(false);
  const [nftDetailIndex, setNftDetailIndex] = useState(0);

  const handleOpenNftDetail = useCallback((index: number) => {
    setNftDetailIndex(index);
    setIsOpenNftDetail(true);
  }, []);
  const togleShowButton = useCallback(() => setIsOpenNftDetail((prev) => !prev), []);

  const onRootClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      setIsOpenNftDetail(false);
      setNftDetailIndex(0);
      onClose();
    },
    [onClose],
  );

  const renderSubTitle = useRenderSubTitle();
  const renderButton = useCallback((nft: NftCardInterface) => <ActionButtonSecondary nft={nft} />, []);

  const onLeftMove = useCallback(() => setNftDetailIndex((prev) => prev - 1), []);
  const onRightMove = useCallback(() => setNftDetailIndex((prev) => prev + 1), []);

  const {isMobile} = useThemeBreakpoints();
  const styles = useStyles({isOpenNftDetail});
  const dialogStyles = useDialogStyles({isOpenNftDetail});

  if (!exclusiveNfts) {
    return null;
  }

  return (
    <Dialog open={open} TransitionComponent={Transition} fullWidth onClose={onRootClick} classes={dialogStyles}>
      <Box className={styles.root} onClick={onRootClick}>
        <Box className={styles.nftDetail}>
          {isOpenNftDetail && (
            <NftDetail
              nft={exclusiveNfts[nftDetailIndex]}
              userWalletAddress={userWalletAddress}
              externalWallets={externalWallets}
              pagination={
                exclusiveNfts.length > 1 && (
                  <PaginationSimple
                    value={nftDetailIndex + 1}
                    total={exclusiveNfts.length}
                    onLeftMove={onLeftMove}
                    onRightMove={onRightMove}
                  />
                )
              }
            />
          )}
        </Box>

        <Box className={styles.nftsList} onClick={onRootClick}>
          {exclusiveNfts.map((nft, index) => (
            <ExclusiveCard
              key={nft.id}
              title={nft.title}
              image={nft.image}
              renderSubTitle={renderSubTitle.bind(null, nft.auctionStatus, nft.supply, nft.balance)}
              isAuction={nft.auctionStatus === AuctionStatus.ACTIVE}
              bidsLength={nft?.auction?.bids?.length}
              priceUSD={nft.priceUsd}
              renderActionElement={renderButton.bind(null, nft)}
              isSmall={isOpenNftDetail}
              isSelected={index === nftDetailIndex}
              onClick={handleOpenNftDetail.bind(null, index)}
            />
          ))}
        </Box>

        {!(isMobile && isOpenNftDetail) && (
          <Box className={styles.showToggleButton} onClick={togleShowButton}>
            <Typography className={styles.showToggleButtonText}>
              {isOpenNftDetail ? t('Show less info') : t('Show more info')}
            </Typography>
            <ArrowDownIcon className={clsx(styles.showToggleButtonIcon, isOpenNftDetail && styles.rotateIcon)} />
          </Box>
        )}
      </Box>
    </Dialog>
  );
});
