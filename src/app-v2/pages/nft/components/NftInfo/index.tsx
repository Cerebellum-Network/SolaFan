import {CheckUserHasNftEnum, FullCreatorInterface} from '@cere/services-types';
import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

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
import {SliderContent} from '../../../../types/common';
import {CmsExhibit} from '../../../../types/exhibit';
import {UsersNftCardInterface} from '../../../../types/nft';
import {Order} from '../../../../types/order';
import {BuyFromWidget} from '../BuyFromWidget/buy-from-widget';
import {SellOrders} from '../SellOrders';

const useStyles = makeStyles((theme) => ({
  rootInfo: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
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
      padding: '32px 32px 0 32px',
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
  },
  bigCreatorAvatar: {
    width: '33px',
    height: '33px',
  },
  bigCreatorName: {
    fontSize: '16px',
    fontWeight: 700,
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
    const {t, i18n} = useTranslation();
    const styles = useStyles();
    const {hasAccess, isChecking} = useHasAccess({
      collectionAddress: nft.collectionAddress!,
      nftId: Number(nft.address),
      nftPurchaseStatus: nft.purchaseStatus,
      userWalletAddress,
    });

    const creatorLink = generatePath(ROUTES.CREATOR, {locale: i18n.language, artistId: creator.id});

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
      return nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT;
    }, [nft.purchaseStatus]);

    return (
      <Box>
        <Box className={styles.rootInfo}>
          <Box className={styles.imageBox}>
            <ConditionsList>
              <Condition condition={!hasAccess || isChecking}>
                <ImageSquare isLoading={isChecking} image={nft.image} title={nft.title} borderRadius="12px 0 0 0" />
              </Condition>
              <Condition condition={hasAccess}>
                <ContentSlider
                  userWalletAddress={userWalletAddress}
                  nftPage
                  slides={slides}
                  className={styles.player}
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
          </Box>
          <Box className={styles.infoContainer}>
            <Box className={styles.infoBox}>
              {isProcessing && nft.purchaseStatus !== CheckUserHasNftEnum.USER_HAS_NFT && (
                <Typography className={styles.isProcessing}>
                  <ProcessingIcon width="12px" /> <span>{t('Transaction processing')}</span>
                </Typography>
              )}
              <Typography className={styles.title}>{nft.title}</Typography>
              {nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT && (
                <Box className="flex justify-between py-4">
                  <Box>
                    <Badge
                      classes={{badgeText: '!text-sm !font-normal', badgeBox: 'align-center'}}
                      text={`${t('Collected')}: 1`} // TODO count should be dynamically extracted from BFF, see details here https://www.notion.so/cere/feeeee1f56b244acaed0a6d07af66815?v=e19545af560540789643713724417886&p=c7e12f18d35f4aecab295c77f0b26939&pm=s and here https://www.notion.so/cere/Davinci-revamped-v1-1-ETA-breakdown-eb532d65f4124593b26ebbf15b6b593e?pvs=4#b82450df7bb44e3d901411432a285616
                    />
                  </Box>
                  {isSellButtonVisible && (
                    <Box>
                      <Button variant="outlined" size="small" disabled={nft.balance !== 0} onClick={showSellNftModal}>
                        List for Sale
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
              <BuyFromWidget nft={nft} creator={creator} userWalletAddress={userWalletAddress} />
              {(nft.secondaryOrders || []).length > 0 && (
                <BuyFromWidget nft={nft} userWalletAddress={userWalletAddress} />
              )}
              {isLoadingNftsListing ? (
                <AccordionSkeleton />
              ) : (
                <SellOrders sellOrders={nftsListing} showCancelOrderModal={showCancelOrderModal} />
              )}
            </Box>
          </Box>
        </Box>
        <Box className={styles.additionalInfoBox}>
          {relatedEvents.length > 0 && (
            <Box>
              <Typography className={styles.subTitle}>{t('RelatedEvents')}</Typography>
              <Box className={styles.relatedEvents}>
                {!relatedEvents ? (
                  <ExhibitsRowSkeleton />
                ) : (
                  <div className="flex gap-x-4 overflow-auto no-scrollbar">
                    {relatedEvents.map((exhibit) => (
                      <Box key={exhibit.id} className="w-[271px] lg:w-[385px] lg:h-[400px]">
                        <ConnectedEventCard slug={exhibit.slug} />
                      </Box>
                    ))}
                  </div>
                )}
              </Box>
            </Box>
          )}
          <Typography className={clsx(styles.subTitle, styles.descriptionBlock)}>{t('Description')}</Typography>
          <TextWithShowMore classes={{root: styles.additionalInfoTextBox, text: styles.additionalInfoText}}>
            {nft.description}
          </TextWithShowMore>
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
