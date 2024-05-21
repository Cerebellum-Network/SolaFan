import {AvailabilityStatus, CheckUserHasNftEnum, FullCreatorInterface, NftSellingType} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, Divider, Typography} from '@material-ui/core';
import {StyledLink} from 'app-v2/components/primitives/StyledLink';
import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {formatPriceUsd} from '../../../../../shared/lib/formatNumber';
import {NftCardCompositeButton} from '../../../../components/connected/ActionButton/NftCardCompositeButton';
import {AvatarWithName} from '../../../../components/primitives/AvatarWithName/avatar-with-name';
import {ROUTES} from '../../../../constants/routes';
import {UsersNftCardInterface} from '../../../../types/nft';

interface Props {
  className?: string;
  nft: UsersNftCardInterface;
  creator: FullCreatorInterface;
  userWalletAddress: string | null;
}

export const BuyFromArtistWidget = memo(({nft, creator, className, userWalletAddress}: Props) => {
  const {t, i18n} = useTranslation();
  const creatorLink = generatePath(ROUTES.CREATOR, {locale: i18n.language, artistId: creator.id});

  const hidePrice = useMemo(() => {
    return nft?.availability === AvailabilityStatus.COMING_SOON;
  }, [nft?.availability]);

  if (!nft) return <></>;

  return (
    <Box className={cx('rounded-lg w-full border-gray-200 border', className)}>
      <Box className="flex flex-row gap-2 py-2 px-4">
        <Typography variant="body1">{t('Buy from')}</Typography>
        <StyledLink to={creatorLink}>
          <AvatarWithName creator={creator} isVerified />
        </StyledLink>
      </Box>
      <Divider />
      {nft.balance === 0 ? (
        <Box className="flex py-4 px-4">
          <Typography variant="h3" className="uppercase">
            {t('Sold out')}
          </Typography>
        </Box>
      ) : (
        <Box className="flex justify-between py-2 px-4">
          <Box className="flex flex-col">
            <Typography variant="h3">{hidePrice ? '\u00A0' : `$${nft.priceUsd}`} </Typography>
            <Box className="flex flex-row">
              <Typography className="font-bold" variant="body1" color={nft.balance === 0 ? 'secondary' : 'inherit'}>
                {nft.balance}
              </Typography>
              <Typography variant="body1">/{nft.supply} left</Typography>
            </Box>
          </Box>
          <Box className="self-center">
            <NftCardCompositeButton
              nftId={nft.id}
              nftOrderId={nft.orderId!}
              nftType={nft.nftType}
              nftQuantity={1}
              sellerWalletAddress={nft.minter}
              nftSellingType={NftSellingType.IS_PRIMARY}
              excludeSellButton={true}
              buttonSize="small"
              buttonText={`Buy Now For $${formatPriceUsd(nft.priceUsd)}`}
              nftPurchaseStatus={CheckUserHasNftEnum.USER_DOES_NOT_HAVE_NFT}
              userWalletAddress={userWalletAddress}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
});
