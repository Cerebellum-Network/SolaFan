import {NftType} from '@cere/services-types';
import {Box, Button, Card, Chip, Typography, useTheme} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {FC, useMemo} from 'react';
import {Provider} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';

import {ReactComponent as VerifiedAuthorIcon} from '../../../../assets/icons/verifiedAuthor.svg';
import {isNftPending} from '../../../../shared/helpers/paymentStatus';
import {Creator, Exhibition, Nft} from '../../../api/collector/types';
import chestClosed from '../../../assets/svg/chest-closed.svg';
import openedChest from '../../../assets/svg/opened-chest.svg';
import {SubscribeButtons} from '../../../components/connected/SubscribeButtons/SubscribeButtons';
import {ResponsiveImage} from '../../../components/primitives/ResponsiveImage/responsive-image';
import {ROUTES} from '../../../constants/routes';
import {useThemeBreakpoints} from '../../../hooks/useThemeBreakpoints';
import {toolkitStore} from '../../../redux/toolkit/store';
import {SubscriptionTypeEnum} from '../../../types/subscription';
import {ExhibitionListAccordion} from './ExhibitionListAccordion';

type Props = {
  creator: Creator;
  nfts: Nft[];
  exhibitions: Exhibition[];
  collectablesSectionsTitle: string;
  eventsSectionsTitle: string;
  userEmail?: string;
  walletPublicKey?: string;
};

export const CreatorCard: FC<Props> = ({
  creator,
  nfts,
  exhibitions,
  collectablesSectionsTitle,
  eventsSectionsTitle,
  userEmail,
  walletPublicKey,
}) => {
  const {t, locale} = useLocalization();

  const nftTypeToLabel = (nftType: NftType) => {
    switch (nftType) {
      case NftType.AUCTIONED:
        return t('1 Auctioned Original');
      case NftType.ACCESS:
        return t('Ticket');
      default:
        return t('Limited collection');
    }
  };

  const collectorsScore = nfts.length + 5 * exhibitions.length;

  const {isMobile, isTablet, isDesktop} = useThemeBreakpoints();
  const theme = useTheme();

  const bgImageSize = useMemo((): number => {
    if (isMobile) {
      return theme.breakpoints.values.sm;
    }
    if (isTablet) {
      return theme.breakpoints.values.md;
    }
    return 800;
  }, [isMobile, isTablet, theme.breakpoints.values.md, theme.breakpoints.values.sm]);

  const unlockedExhibitions = exhibitions.filter((exhibition) => {
    const exhibitionAccessNfts = exhibition.nfts.filter((nft) => nft.relType === NftType.ACCESS);
    const exhibitionNfts = nfts.filter((nft) => nft.exhibitionId === exhibition.id);
    return exhibitionAccessNfts.length === exhibitionNfts.length;
  });

  const lockedExhibitions = exhibitions.filter((exhibition) => !unlockedExhibitions.includes(exhibition));

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Card elevation={2} className="!rounded-[12px] pb-[8px]">
      <div className="bg-cover bg-center relative w-full xs:h-[120px] md:h-[280px]">
        <div className="absolute w-full h-full top-0 left-0">
          <ResponsiveImage
            className="w-full h-full object-cover"
            alt=""
            formats={creator.desktopBackgroundImage.formats}
            size={bgImageSize}
            fallbackUrl={creator.desktopBackgroundImage.url}
          />
        </div>
        <Box
          position="absolute"
          margin="auto"
          left={0}
          right={0}
          bottom={0}
          borderRadius="50%"
          overflow="hidden"
          boxSizing="border-box"
          style={{transform: 'translateY(50%)'}}
          sx={{
            width: {xs: 58, md: 178},
            height: {xs: 58, md: 178},
            border: {
              xs: '2px solid white',
              md: '10px solid white',
            },
          }}
        >
          <ResponsiveImage
            className="w-full h-full object-cover"
            alt={`${creator.name} avatar`}
            formats={creator.avatar.formats}
            size={200}
            fallbackUrl={creator.avatar.url}
          />
        </Box>
      </div>

      <Box pt={{xs: 5, md: 12}} display="flex" alignItems="center" gridGap={4} justifyContent="center">
        <Typography variant={isTablet || isDesktop ? 'h2' : 'subtitle2'}>{creator.name}</Typography>
        <VerifiedAuthorIcon />
      </Box>

      <Box pt={0.5} pb={{xs: 1, md: 3}} display="flex" alignItems="center" gridGap={2} justifyContent="center">
        <Link style={{textTransform: 'capitalize'}} to={`/${locale}/home/creator/${creator.id}`}>
          <Link
            component={Button}
            //@ts-expect-error
            variant={'outlined'}
            size="small"
            to={generatePath(ROUTES.CREATOR, {locale, artistId: creator.id})}
          >
            {t('View profile')}
          </Link>
        </Link>
        {creator?.name && creator.id && (
          <Provider store={toolkitStore}>
            <SubscribeButtons
              userEmail={userEmail}
              type={SubscriptionTypeEnum.ARTIST}
              entityId={creator.id}
              provideEmailMessage={t(
                `Provide your email to get the latest news, future drops and updates from {{artist}}`,
                {artist: creator.name},
              )}
              provideEmailAgreementMessage={t(
                'I agree to receive important announcements, feature updates and offers from the {{artis}}',
                {artist: creator.name},
              )}
              confirmSubscriptionMessage={t('You have subscribed for the latest updates from the {{artist}}', {
                artist: creator.name,
              })}
              confirmUnsubscriptionMessage={t('You have unsubscribed for the latest updates from {{artist}}', {
                artist: creator.name,
              })}
            />
          </Provider>
        )}
      </Box>

      <Box display="flex" m={1} borderRadius={8} textAlign="center" style={{backgroundColor: '#fbfbfb'}}>
        <Box flex={1} p={1.5} display="flex" flexDirection="column" gridGap={8} alignItems="center">
          <Typography variant="caption" color="textSecondary" style={{lineHeight: 1.2, maxWidth: 95}}>
            {t('Collectibles Owned')}
          </Typography>
          <Box display="flex" flexDirection="row" gridGap={2}>
            <Typography variant="subtitle2" color="textSecondary">
              {nfts.length}
            </Typography>
            <Typography variant="subtitle2">/</Typography>
            <Typography variant="subtitle2">{creator.nfts.length}</Typography>
          </Box>
        </Box>
        <Box
          flex={1}
          p={1.5}
          border="1px solid #f0f0f0"
          borderBottom="2px solid #f0f0f0"
          borderTop="0px solid"
          display="flex"
          flexDirection="column"
          gridGap={8}
          alignItems="center"
        >
          <Typography variant="caption" color="textSecondary" style={{lineHeight: 1.2, maxWidth: 95}}>
            {t('Events Unlocked')}
          </Typography>
          <Box display="flex" flexDirection="row" gridGap={2}>
            <Typography variant="subtitle2" color="textSecondary">
              {exhibitions.length}
            </Typography>
            <Typography variant="subtitle2">/</Typography>
            <Typography variant="subtitle2">{creator.exhibitions?.length || exhibitions.length}</Typography>
          </Box>
        </Box>
        <Box flex={1} p={1.5} display="flex" flexDirection="column" alignItems="center" gridGap={8}>
          <Typography variant="caption" color="textSecondary" style={{lineHeight: 1.2, maxWidth: 95}}>
            {t(`Collector's score`)}
          </Typography>
          <Typography variant="subtitle2">{collectorsScore}</Typography>
        </Box>
      </Box>

      <Box mt={3} display="flex" flexDirection="column" gridGap={8}>
        <Box px={2.5} py={0.5}>
          <Typography variant="subtitle2" color="textSecondary">
            {collectablesSectionsTitle}
          </Typography>
        </Box>
        <Box mx={1} borderRadius={8} border="1px solid #f1f1f1">
          {nfts.map((nft, index) => (
            <Link to={generatePath(ROUTES.NFT_PAGE, {nftId: nft.id, locale})}>
              <Box
                display="flex"
                style={{gap: 12}}
                px={2.5}
                py={1.5}
                borderBottom={index === nfts.length - 1 ? undefined : '1px solid #f1f1f1'}
              >
                <Box borderRadius={8} overflow="hidden" bgcolor="#f1f1f1">
                  <ResponsiveImage
                    className="w-[48px] h-[50px] object-cover object-center"
                    alt={nft.title}
                    formats={nft.formats}
                    size={50}
                    fallbackUrl={nft.image}
                  />
                </Box>
                <Box pt={0.5} flex={1} display="flex" flexDirection="column" gridGap={4}>
                  <Typography variant="subtitle2">{nft.title}</Typography>
                  <Box display="flex" alignItems="center" gridGap={3}>
                    <Typography variant="caption" color="textSecondary">
                      {nftTypeToLabel(nft.nftType)} •
                    </Typography>
                    {nft.priceUsd && <Typography variant="subtitle2">${nft.priceUsd}</Typography>}
                  </Box>
                </Box>
                {isNftPending(nft) && <Chip color="secondary" size="small" label="Pending" />}
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowForward style={{opacity: 0.9, fontSize: 16}} />
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      <Box mt={3} display="flex" flexDirection="column" gridGap={8}>
        <Box px={2.5} py={0.5}>
          <Typography variant="subtitle2" color="textSecondary">
            {eventsSectionsTitle}
          </Typography>
        </Box>
        <Box mx={1} borderRadius={8} border="1px solid #f1f1f1">
          {lockedExhibitions.length > 0 && (
            <ExhibitionListAccordion
              summaryIcon={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={48}
                  height={48}
                  borderRadius={8}
                  style={{border: '1px solid #FCD996'}}
                >
                  <img src={chestClosed} alt="closed" />
                </Box>
              }
              summaryText={t('Partially unlocked')}
              exhibitions={lockedExhibitions}
              purchasedNfts={nfts}
              walletPublicKey={walletPublicKey}
              totalExhibitions={exhibitions.length}
            />
          )}
          {unlockedExhibitions.length > 0 && (
            <ExhibitionListAccordion
              summaryIcon={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={48}
                  height={48}
                  borderRadius={8}
                  style={{border: '1px solid #FCD996', backgroundColor: '#FCD996'}}
                >
                  <img src={openedChest} alt="open" />
                </Box>
              }
              summaryText={t('Unlocked')}
              exhibitions={unlockedExhibitions}
              purchasedNfts={nfts}
              totalExhibitions={exhibitions.length}
              walletPublicKey={walletPublicKey}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};
