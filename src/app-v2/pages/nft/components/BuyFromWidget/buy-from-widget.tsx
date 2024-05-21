import {CheckUserHasNftEnum, FullCreatorInterface, NftSellingType} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, Button, Divider, Typography} from '@material-ui/core';
import {memo, useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';

import {formatPriceUsd} from '../../../../../shared/lib/formatNumber';
import {NftCardCompositeButton} from '../../../../components/connected/ActionButton/NftCardCompositeButton';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {UsersNftCardInterface} from '../../../../types/nft';
import {isRecord} from '../../../../utils/types/is-record';
import {CreatorLink} from './creator-link';
import {StartingFromPrice} from './starting-from-price';

interface Props {
  className?: string;
  nft: UsersNftCardInterface;
  creator?: FullCreatorInterface;
  userWalletAddress: string | null;
}

export const BuyFromWidget = memo(({nft, creator, className, userWalletAddress}: Props) => {
  const history = useHistory();
  const {t, locale} = useLocalization();

  const fromMarketplace: boolean = useMemo(() => !isRecord(creator), [creator]);

  const renderBuyFrom = useCallback(() => {
    const content = !fromMarketplace ? (
      <>
        <Typography variant="body1">{t('Buy from')}</Typography>
        <CreatorLink creator={creator!} />
      </>
    ) : (
      <Typography variant="body1">{t('Buy from other fans on Marketplace')}</Typography>
    );
    return <Box className="flex flex-row gap-2 py-2 px-4">{content}</Box>;
  }, [creator, fromMarketplace, t]);

  const handleOnMarketplaceBuyClick = useCallback(() => {
    history.push(`/${locale}/home/collectible/${nft.id}/marketplace`);
  }, [history, locale, nft.id]);

  if (!nft) return <></>;

  return (
    <Box className={cx('rounded-lg w-full border-gray-200 border mb-4', className)}>
      {renderBuyFrom()}
      <Divider />
      {!fromMarketplace && nft.balance === 0 ? (
        <Box className="flex py-4 px-4">
          <Typography variant="h3" className="uppercase">
            {t('Sold out')}
          </Typography>
        </Box>
      ) : (
        <Box className="flex justify-between py-2 px-4">
          <Box className="flex flex-col">
            {!fromMarketplace ? (
              <>
                <Typography variant="h3">${nft.priceUsd}</Typography>
                <Box className="flex flex-row">
                  <Typography className="font-bold" variant="body1" color={nft.balance === 0 ? 'secondary' : 'inherit'}>
                    {nft.balance}
                  </Typography>
                  <Typography variant="body1">/{nft.supply} left</Typography>
                </Box>
              </>
            ) : (
              <StartingFromPrice orders={nft.secondaryOrders} />
            )}
          </Box>
          <Box className="self-center">
            {fromMarketplace ? (
              <Button size="small" variant="contained" onClick={handleOnMarketplaceBuyClick}>
                {t('Buy From Marketplace')}
              </Button>
            ) : (
              <NftCardCompositeButton
                nftId={nft.id}
                nftOrderId={nft.orderId!}
                nftType={nft.nftType}
                nftQuantity={1}
                sellerWalletAddress={nft.minter}
                nftSellingType={NftSellingType.IS_PRIMARY}
                excludeSellButton={!fromMarketplace}
                buttonText={`Buy Now For $${formatPriceUsd(nft.priceUsd)}`}
                nftPurchaseStatus={CheckUserHasNftEnum.USER_DOES_NOT_HAVE_NFT}
                userWalletAddress={userWalletAddress}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
});
