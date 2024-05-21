import {CheckUserHasNftEnum, FullCreatorInterface} from '@cere/services-types';
import {Box, Button, Divider, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {HIDE_MARKETPLACE_PAGE} from '../../../../../config/common';
import {useHasAccess} from '../../../../../shared/hooks/use-has-access';
import {ReactComponent as ShareIcon} from '../../../../assets/svg/share.svg';
import {ConnectedEventCard} from '../../../../components/connected/ConnectedEventCard';
import {AvatarWithName} from '../../../../components/primitives/AvatarWithName/avatar-with-name';
import {ReactComponent as ProcessingIcon} from '../../../../components/primitives/Badge/accets/transactionProcessing.icon.svg';
import {IconButton} from '../../../../components/primitives/IconButton';
import {ImageSquare} from '../../../../components/primitives/ImageSquare';
import {StyledLink} from '../../../../components/primitives/StyledLink';
import {TextWithShowMore} from '../../../../components/primitives/TextWithShowMore';
import {Badge} from '../../../../components/shared/Badge';
import {Condition, ConditionsList} from '../../../../components/shared/Conditions';
import {ContentSlider} from '../../../../components/shared/ContentSlider/content-slider';
import {AccordionSkeleton, ExhibitsRowSkeleton} from '../../../../components/shared/Skeletons';
import {SocialNetworksInfo} from '../../../../components/shared/SocialNetworksInfo';
import {ROUTES} from '../../../../constants/routes';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import {SliderContent} from '../../../../types/common';
import {CmsExhibit} from '../../../../types/exhibit';
import {UsersNftCardInterface} from '../../../../types/nft';
import {Order} from '../../../../types/order';
import {BuyFromWidget} from '../../../nft/components/BuyFromWidget/buy-from-widget';
import {SellOrders} from '../../../nft/components/SellOrders';
import {NftTeaser} from './nft-teaser';

const useStyles = makeStyles((theme) => ({
  imageBox: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      minWidth: '328px',
      maxWidth: '328px',
      '& > .plyr__video-wrapper': {
        maxHeight: '328px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '508px',
      maxWidth: '508px',
      '& > .plyr__video-wrapper': {
        maxHeight: '508px',
      },
    },
  },
  image: {
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'space-between',
    },
  },
  infoBox: {
    width: '100%',
    padding: '12px',
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 2,
      padding: '24px 24px 0 24px',
    },
  },
  isProcessing: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.warning.light,
    paddingBottom: '8px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    marginBottom: '12px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: '40px',
    },
  },
  badgeBox: {
    marginBottom: '12px',
  },
  actionButtonsBox: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  avatarBox: {
    paddingBottom: '12px',
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '24px',
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: '24px',
    },
  },
  relatedExhibit: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 0',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    [theme.breakpoints.up('lg')]: {
      padding: '18px 0',
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  relatedExhibitLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  relatedExhibitIcon: {
    height: '16px',
  },
  relatedEventsBox: {
    padding: '0 12px',
    [theme.breakpoints.up('md')]: {
      padding: '0 16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 24px',
    },
  },
  relatedEventsTitle: {
    marginBottom: '10px',
  },
  additionalInfoBox: {
    padding: '24px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '24px 16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '24px',
    },
  },
  relatedEvents: {
    [theme.breakpoints.up('md')]: {
      marginBottom: '26px',
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '11px',
    },
  },
  subTitle: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    marginBottom: '18px',
  },
  additionalInfoTextBox: {
    marginBottom: '24px',
  },
  additionalInfoText: {
    fontSize: '16px',
    lineHeight: '24px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
    },
  },
  bigCreatorAvatar: {
    width: '33px',
    height: '33px',
  },
  bigCreatorName: {
    fontSize: '16px',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  socialNetworksInfo: {
    paddingTop: '14px',
    [theme.breakpoints.up('md')]: {
      width: '250px',
    },
  },
  descriptionBlock: {
    [theme.breakpoints.down('md')]: {
      marginTop: '29px',
    },
  },
  creatorBlock: {
    [theme.breakpoints.down('md')]: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  viewContent: {
    position: 'absolute',
    top: 301,
    right: 12,
    zIndex: 5,

    [theme.breakpoints.up('md')]: {
      top: 260,
      right: 'unset',
      bottom: 'unset',
      left: 260,
    },
    [theme.breakpoints.up('lg')]: {
      top: 'unset',
      right: 'unset',
      bottom: 12,
    },
  },
  player: {
    '& > div > .plyr__video-wrapper': {
      maxHeight: '343px',
    },
    [theme.breakpoints.up('md')]: {
      '& > div > .plyr__video-wrapper': {
        maxHeight: '328px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      '& > div > .plyr__video-wrapper': {
        maxHeight: '508px',
      },
    },
  },
}));

type Props = {
  nft: UsersNftCardInterface;
  creator: FullCreatorInterface;
  actionElements: NonNullable<ReactNode>;
  relatedEvents: CmsExhibit[];
  nftsListing: Order[];
  showSellNftModal: () => void;
  isLoadingNftsListing: boolean;
  isProcessing?: boolean;
  onShareClick?: (nftId: string) => void;
  onDownloadClick?: (nftId: string) => void;
  userWalletAddress: string | null;
  showCancelOrderModal: (qty: number, orderId: string) => void;
};

export const NftInfo = memo(
  ({
    nft,
    creator,
    relatedEvents,
    nftsListing,
    isProcessing,
    isLoadingNftsListing,
    showSellNftModal,
    onShareClick,
    userWalletAddress,
    showCancelOrderModal,
  }: Props) => {
    const rightColumnRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const widgetRef = useRef<HTMLDivElement | null>(null);
    const topSectionRef = useRef<HTMLDivElement | null>(null);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const [widgetHeight, setWidgetHeight] = useState<number>(0);
    const [rightColumnPaddingHeight, setRightColumnPuddingHeight] = useState<number>(0);
    const [topSectionHeight, setTopSectionHeight] = useState<number>(0);
    const {t, i18n} = useTranslation();
    const styles = useStyles();
    const {hasAccess, isChecking} = useHasAccess({
      collectionAddress: nft.collectionAddress!,
      nftId: Number(nft.address),
      nftPurchaseStatus: nft.purchaseStatus,
      userWalletAddress,
    });
    const {isMobile} = useThemeBreakpoints();

    const creatorLink = generatePath(ROUTES.CREATOR, {locale: i18n.language, artistId: creator.id});

    const getHeight = (
      element: HTMLElement,
      setHeight: React.Dispatch<React.SetStateAction<number>>,
      withMargins = false,
    ) => {
      const {height} = element.getBoundingClientRect();
      if (withMargins) {
        const computedStyle = window.getComputedStyle(element);
        const marginTop = parseFloat(computedStyle.marginTop || '0');
        const marginBottom = parseFloat(computedStyle.marginBottom || '0');
        const totalHeight = height + marginTop + marginBottom;
        setHeight(totalHeight);
      } else {
        setHeight(height);
      }
    };

    const recalculateHeights = useCallback(() => {
      if (imageRef.current) {
        const image = imageRef.current.querySelector('img');

        if (image) {
          getHeight(image, setImageHeight);
        }
      }
      if (widgetRef.current) {
        getHeight(widgetRef.current, setWidgetHeight, true);
      }
      if (rightColumnRef.current) {
        const computedStyle = window.getComputedStyle(rightColumnRef.current);
        const paddingTop = parseFloat(computedStyle.paddingTop || '0');
        const paddingBottom = parseFloat(computedStyle.paddingBottom || '0');
        setRightColumnPuddingHeight(paddingTop + paddingBottom);
      }
      if (topSectionRef.current) {
        getHeight(topSectionRef.current, setTopSectionHeight, true);
      }
    }, [imageRef, widgetRef, rightColumnRef]);

    useEffect(() => {
      const handleResize = () => {
        recalculateHeights();
      };
      window.addEventListener('resize', handleResize);
      recalculateHeights();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [recalculateHeights]);

    const handleLoadImage = () => {
      recalculateHeights();
    };

    const slides: SliderContent[] = useMemo(() => {
      return nft.assets.reduce(
        (prev, next, currentIndex) => [
          ...prev,
          {
            asset: next,
            hasAccess: nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT || false,
            nftId: nft.address,
            collectionAddress: nft.collectionAddress,
            currentIndex,
            name: next.name,
          },
        ],
        [] as SliderContent[],
      );
    }, [nft]);

    const isSellButtonVisible = useMemo(() => {
      const hasOrder = nftsListing.find(
        (order) => order.creator.toLowerCase() === userWalletAddress?.toLowerCase() && !order.cancelled,
      );
      return !HIDE_MARKETPLACE_PAGE && nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT && !hasOrder;
    }, [nft.purchaseStatus, nftsListing, userWalletAddress]);

    const collectedText = useMemo(
      () => (nft.ownedBalance ? `${t('Collected')}: ${nft.ownedBalance}` : t('Collected')),
      [nft.ownedBalance, t],
    );

    return (
      <Box>
        <Box className="flex flex-col md:flex-row">
          <div className={styles.imageBox} ref={imageRef}>
            <ConditionsList>
              <Condition condition={!hasAccess || isChecking}>
                <ImageSquare
                  isLoading={isChecking}
                  image={nft.image}
                  title={nft.title}
                  borderRadius="12px 0 0 0"
                  onLoadImage={handleLoadImage}
                />
              </Condition>
              <Condition condition={hasAccess}>
                <ContentSlider
                  userWalletAddress={userWalletAddress}
                  nftPage
                  slides={slides}
                  className={styles.player}
                  onLoadImage={handleLoadImage}
                />
              </Condition>
            </ConditionsList>
            <Box className={styles.actionButtonsBox}>
              {onShareClick && (
                <IconButton onClick={() => onShareClick(nft.id)}>
                  <ShareIcon />
                </IconButton>
              )}
            </Box>
          </div>
          <Box className={styles.infoContainer}>
            <div className={styles.infoBox} ref={rightColumnRef}>
              {isProcessing && nft.purchaseStatus !== CheckUserHasNftEnum.USER_HAS_NFT && (
                <Typography className={styles.isProcessing}>
                  <ProcessingIcon width="12px" /> <span>{t('Transaction processing')}</span>
                </Typography>
              )}
              {nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT && (
                <div className="flex justify-between pb-4" ref={topSectionRef}>
                  <Box>
                    <Badge
                      classes={{badgeText: '!text-sm !font-normal', badgeBox: 'align-center'}}
                      text={collectedText}
                    />
                  </Box>
                  {isSellButtonVisible && (
                    <Box>
                      <Button variant="outlined" size="small" disabled={nft.balance !== 0} onClick={showSellNftModal}>
                        List for Sale
                      </Button>
                    </Box>
                  )}
                </div>
              )}
              <TextWithShowMore
                classes={{root: styles.additionalInfoTextBox, text: styles.additionalInfoText}}
                maxHeight={imageHeight - topSectionHeight - widgetHeight - rightColumnPaddingHeight}
              >
                {nft.description}
              </TextWithShowMore>
              <div ref={widgetRef}>
                <BuyFromWidget nft={nft} creator={creator} userWalletAddress={userWalletAddress} />
                {(nft.secondaryOrders || []).length > 0 && (
                  <BuyFromWidget nft={nft} userWalletAddress={userWalletAddress} />
                )}
              </div>
              <ConditionsList>
                <Condition condition={hasAccess && isLoadingNftsListing}>
                  <AccordionSkeleton />
                </Condition>
                <Condition condition={!isChecking && !isLoadingNftsListing}>
                  <SellOrders sellOrders={nftsListing} showCancelOrderModal={showCancelOrderModal} />
                </Condition>
              </ConditionsList>
            </div>
          </Box>
        </Box>
        <NftTeaser className="mt-2 md:mt-8 mb-4 md:mb-12 mx-2 md:mx-8" nft={nft} onShareClick={onShareClick} />
        {relatedEvents.length > 0 && (
          <>
            <Box mt={isMobile ? 2 : 4} className={styles.relatedEventsBox}>
              <Typography variant="h3" className={styles.relatedEventsTitle}>
                {t('Own to attend this event below')}
              </Typography>
              <Box className={styles.relatedEvents}>
                {!relatedEvents ? (
                  <ExhibitsRowSkeleton />
                ) : (
                  <div className="flex flex-col gap-y-4">
                    {relatedEvents.map((exhibit) => (
                      <Box key={exhibit.id} className="flex sm:flex-row flex-col gap-4">
                        <ConnectedEventCard className="w-full h-[414px]" slug={exhibit.slug} />
                        <Typography variant="body1" color="textSecondary">
                          {exhibit.description}
                        </Typography>
                      </Box>
                    ))}
                  </div>
                )}
              </Box>
            </Box>
            {!isMobile && <Divider />}
          </>
        )}
        <Box className={styles.additionalInfoBox}>
          <Typography className={clsx(styles.subTitle, styles.creatorBlock)}>{t('Creator')}</Typography>
          <TextWithShowMore classes={{root: styles.additionalInfoTextBox, text: styles.additionalInfoText}}>
            {creator.about}
          </TextWithShowMore>
          <StyledLink to={creatorLink}>
            <AvatarWithName
              creator={creator}
              isVerified
              classes={{avatar: styles.bigCreatorAvatar, name: styles.bigCreatorName}}
            />
          </StyledLink>
          <Box className={styles.socialNetworksInfo}>
            <SocialNetworksInfo user={creator} />
          </Box>
        </Box>
      </Box>
    );
  },
);

NftInfo.displayName = 'NftInfo';
