import {FullCreatorInterface, NftType} from '@cere/services-types';
import {Box} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {noop} from 'lodash';
import {useCallback, useEffect} from 'react';
import {Provider} from 'react-redux';
import {Link} from 'react-router-dom';

import {ReactComponent as VerifiedAuthorIcon} from '../../../assets/icons/verifiedAuthor.svg';
import {useOtpVerification} from '../../../shared/hooks/use-otp-verification.hook';
import {AppContainer} from '../../components/connected/AppContainer';
import {SubscribeButtons} from '../../components/connected/SubscribeButtons/SubscribeButtons';
import {ResponsiveImage} from '../../components/primitives/ResponsiveImage/responsive-image';
import {Skeleton} from '../../components/primitives/Skeleton';
import {CreatorHeaderSkeleton} from '../../components/primitives/Skeleton/CreatorHeaderSkeleton';
import {SubTitle, Title} from '../../components/primitives/Title';
import {AutoExpandedBlock} from '../../components/shared/AutoExpandedBlock/auto-expanded-block';
import {Condition, ConditionsList} from '../../components/shared/Conditions';
import {EventCardsList} from '../../components/shared/EventCard/event-cards-list';
import {Markdown} from '../../components/shared/Markdown';
import {NftCard} from '../../components/shared/NftCard/nft-card';
import {NFTGrid} from '../../components/shared/NftGrid';
import {PageContainerV2} from '../../components/shared/PageContainerV2/PageContainerV2';
import {AppMetaTags} from '../../components/shared/SeoHeaders/seo-headers.component';
import {CreatorsRowSkeleton, ExhibitsRowSkeleton, NftsListSkeleton} from '../../components/shared/Skeletons';
import {toolkitStore} from '../../redux/toolkit/store';
import {CmsExhibit} from '../../types/exhibit';
import {UsersNftCardInterface} from '../../types/nft';
import {SubscriptionTypeEnum} from '../../types/subscription';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {Header} from './header';

type Props = {
  isLoadingCreator: boolean;
  isLoadingExhibits: boolean;
  isLoadingNfts: boolean;
  isLoadingCreators: boolean;
  creator?: FullCreatorInterface;
  creators: FullCreatorInterface[] | null;
  loadData: () => void;
  loadCreators: () => void;
  loadNfts: (nftIds: string[]) => unknown;
  exhibitsSlugs: string[];
  exhibits: CmsExhibit[];
  eventsNftIds: string[];
  nfts: UsersNftCardInterface[];
  onShareClick: (exhibitId: string) => void;
  loadEvents: (slugs: string[]) => void;
  userEmail?: string;
  userWalletAddress: string | null;
};

export const CreatorPageView = ({
  isLoadingCreator,
  isLoadingCreators,
  creator,
  loadData,
  loadNfts,
  exhibitsSlugs,
  exhibits,
  eventsNftIds,
  nfts,
  loadCreators,
  creators,
  loadEvents,
  userWalletAddress,
  userEmail,
}: Props) => {
  useOtpVerification();
  const {t, locale} = useLocalization();

  useOnComponentRendered(loadData);

  useEffect(() => {
    if (creator?.id) {
      loadEvents(exhibitsSlugs);
      loadNfts(eventsNftIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator?.id, exhibitsSlugs.length]);

  useEffect(() => {
    loadCreators();
  }, [loadCreators]);

  const ticketsAndFreeNfts = nfts?.filter((nft) => nft.nftType === NftType.ACCESS || nft.isExhibitionAllowFreeAccess);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localizations = !creator
    ? []
    : [
        {
          locale: creator.locale,
          link: `/${creator.locale}/home/creator/${creator.id}`,
        },
        ...(creator.localizations ?? []).map((localizedArtist) => ({
          locale: creator.locale,
          link: `/${localizedArtist.locale}/home/creator/${localizedArtist.id}`,
        })),
      ];

  const otherCreators = creators?.filter((creatorItem) => creatorItem.id !== creator?.id);

  const renderMetaTags = useCallback(() => {
    if (!isLoadingCreator && creator != null) {
      return (
        <AppMetaTags
          title={creator.name}
          description={creator.about}
          image={creator.avatar?.url}
          localizations={localizations}
        />
      );
    }
    return <></>;
  }, [creator, isLoadingCreator, localizations]);

  return (
    <AppContainer>
      {renderMetaTags()}

      <PageContainerV2>
        {isLoadingCreator ? <CreatorHeaderSkeleton /> : <Header creator={creator} />}
        {creator?.name && creator.id && (
          <Box className="flex items-center justify-center p-2">
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
          </Box>
        )}
        <div>
          {isLoadingCreator && (
            <div className="w-full flex flex-col items-center text-2xl leading-4 md:text-4xl">
              <Skeleton className="rounded-md w-3/4" variant="text" />
              <Skeleton className="rounded-md w-3/5" variant="text" />
            </div>
          )}
          {!isLoadingCreator && (
            <div className="font-normal md:border-b-[1px] md:border-gray-300 md:pb-6 mx-4 text-[14px] mt-2">
              <AutoExpandedBlock lines={4} className="lg:w-[700px] lg:mx-auto">
                <Markdown>{creator?.about.slice(0, -1) || ''}</Markdown>
              </AutoExpandedBlock>
            </div>
          )}
        </div>

        <div className="mt-6 mx-4 mb-[28px]">
          <div className="pb-6">
            <Title>{t('Events')}</Title>
            <div className="mt-2">
              <SubTitle>
                {t(
                  'Indulge in hand-curated and exclusive artist events. Explore, participate, and bid on unforgettable experiences in DaVinci.',
                )}
              </SubTitle>
            </div>
          </div>
          {!exhibits?.length && <ExhibitsRowSkeleton />}
          {!!exhibits?.length && <EventCardsList events={exhibits ?? []} />}

          {!ticketsAndFreeNfts?.length && (
            <Box pt={4}>
              <NftsListSkeleton />
            </Box>
          )}
          {!!ticketsAndFreeNfts?.length && (
            <div className="w-fit flex">
              <NFTGrid
                title={t('Collectibles')}
                subTitle={t('Exclusive and verified digital collectibles which unlock unseen experiences of creators')}
                onLoadMore={noop}
              >
                <Box className="flex w-full">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {(ticketsAndFreeNfts || [])?.map((nft) => {
                      return (
                        <NftCard key={nft.id} nft={nft} buttonSize="medium" userWalletAddress={userWalletAddress} />
                      );
                    })}
                  </div>
                </Box>
              </NFTGrid>
            </div>
          )}
        </div>
        <div className="mt-16 mx-4 pb-4 mb-[32px]">
          {otherCreators == null ||
            (otherCreators.length > 0 && (
              <div className="pb-6">
                <Title>{t('Explore other creators')}</Title>
                <SubTitle>
                  {t(
                    'Verified creators bringing transforming their best work in unique collectible experiences which are exclusively sold on DaVinci.',
                  )}
                </SubTitle>
              </div>
            ))}
          <ConditionsList>
            <Condition condition={isLoadingCreators}>
              <CreatorsRowSkeleton />
            </Condition>
            <Condition condition={!isLoadingCreators && otherCreators != null && otherCreators.length > 0}>
              <div className="flex flex-col gap-y-6 md:grid md:gap-4 lg:gap-8 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
                {otherCreators?.map((artist) => (
                  <Link to={`/${locale}/home/creator/${artist.id}`} key={artist.id}>
                    <div
                      className="lg:min-h-[285px] relative shadow-md overflow-hidden rounded-lg lg:rounded-2xl"
                      key={artist.id}
                    >
                      <ResponsiveImage
                        alt=""
                        size={450}
                        formats={artist.desktopBackgroundImage.formats}
                        className="w-full h-[140px] object-cover object-center"
                        fallbackUrl={artist.desktopBackgroundImage.url}
                      />
                      <div className="absolute overflow-hidden rounded-full mx-auto left-0 right-0 top-[112px] md:top-[108px] w-[64px] h-[64px] border-[4px] border-white">
                        <ResponsiveImage
                          alt={artist.name}
                          size={64}
                          formats={artist.avatar.formats}
                          className="w-[64px] h-[64px] object-cover object-center"
                          fallbackUrl={artist.avatar.url}
                        />
                      </div>
                      <div className="mt-[36px] font-bold text-[16px] gap-x-2 flex items-center justify-center">
                        <h3>{artist.name}</h3>
                        <VerifiedAuthorIcon />
                      </div>
                      <div className="text-center text-sm w-4/5 mx-auto pb-8 text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">
                        {artist.about}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Condition>
          </ConditionsList>
        </div>
      </PageContainerV2>
    </AppContainer>
  );
};
