import {CheckUserHasNftEnum, FullCreatorInterface} from '@cere/services-types';
import {NftCardInterface} from '@cere/services-types/dist/types';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';
import {AppContainer} from 'app-v2/components/connected/AppContainer';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {FC} from 'react';
import {connect} from 'react-redux';
import {generatePath, Link, useParams} from 'react-router-dom';
import {Dispatch} from 'redux';

import {useHasAccess} from '../../../shared/hooks/use-has-access';
import {bigNumberishToString} from '../../../shared/lib/big-number-utils';
import {cropHexAddress} from '../../../shared/lib/utils';
import {ReactComponent as ShareIcon} from '../../assets/svg/share.svg';
import {AvatarWithName} from '../../components/primitives/AvatarWithName/avatar-with-name';
import {IconButton} from '../../components/primitives/IconButton';
import {ImageSquare} from '../../components/primitives/ImageSquare';
import {StyledLink} from '../../components/primitives/StyledLink';
import {TextWithShowMore} from '../../components/primitives/TextWithShowMore';
import {Condition, ConditionsList} from '../../components/shared/Conditions';
import {ContentSlider} from '../../components/shared/ContentSlider/content-slider';
import {ROUTES} from '../../constants/routes';
import {selectCreatorById} from '../../redux/modules/creators/selectors';
import {ShowShareNftModalCommand} from '../../redux/modules/exhbit-page';
import {selectExhibitsBySlugs} from '../../redux/modules/exhibits/selectors';
import {LoadNftPageDataCommand} from '../../redux/modules/nft-page/actions';
import {selectNftDetailsPageLoadingState} from '../../redux/modules/nft-page/selectors';
import {selectNftById} from '../../redux/modules/nfts/selectors';
import {StartSecondaryNFTPurchaseCommand} from '../../redux/modules/purchase/actions';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {useThemeBreakpoints} from '../../styles/useThemeBreakpoints';
import {CmsExhibit} from '../../types/exhibit';
import {UsersNftCardInterface} from '../../types/nft';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {CardSkeleton} from './components/card-skeleton';
import {ConnectedEventNfts} from './components/event-nfts';

type Props = {
  nftId: string;
  nft?: UsersNftCardInterface;
  loadNft: () => void;
  userWalletAddress: string | null;
  creator?: FullCreatorInterface;
  unlockingEvents: CmsExhibit[];
  share?: (nftId: string) => void;
  buy: (nftId: string, orderId: string, sellerWalletAddress: string, priceUsd: number, qty: number) => void;
};

type Order = NftCardInterface['primaryOrder'];

const NftMarketplacePageView: FC<Props> = ({loadNft, nft, userWalletAddress, creator, share, buy}: Props) => {
  const {t, locale} = useLocalization();
  const {isMobile} = useThemeBreakpoints();

  useOnComponentRendered(loadNft);

  const {hasAccess, isChecking} = useHasAccess({
    collectionAddress: nft?.collectionAddress!,
    nftId: Number(nft?.address),
    nftPurchaseStatus: nft?.purchaseStatus,
    userWalletAddress,
  });

  const comparedToInitialDrop = (order: Order) => {
    const primaryOrderPriceUsd = nft?.primaryOrder?.priceUsd;
    const orderPrice = order?.priceUsd;
    if (primaryOrderPriceUsd == null || orderPrice == null) {
      return '';
    }

    if (orderPrice > primaryOrderPriceUsd) {
      const percent = ((orderPrice / primaryOrderPriceUsd - 1) * 100).toFixed(2);
      return t(`${percent}% more expensive`, {percent: percent});
    } else if (orderPrice < primaryOrderPriceUsd) {
      const percent = ((1 - orderPrice / primaryOrderPriceUsd) * 100).toFixed(2);
      return t(`${percent}% cheaper`, {percent: percent});
    } else {
      return t('Same price as initial drop');
    }
  };

  const secondaryOrders = nft?.secondaryOrders?.filter((order) => !order.processed) || [];

  const secondaryOrdersAmount = secondaryOrders?.reduce((acc, order) => acc + Number(order.amount), 0);

  return (
    <AppContainer>
      <PageContainer>
        <Box maxWidth="1000px" width="100%" margin="0 auto" px={2}>
          <Box py={4} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h1">{t('Marketplace')}</Typography>
            <Link
              color="textSecondary"
              to={generatePath(ROUTES.MARKETPLACE, {locale})}
              style={{display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 500}}
            >
              {t('Browse all')} <ArrowForward style={{height: '16px'}} />
            </Link>
          </Box>

          {nft == null ? (
            <CardSkeleton />
          ) : (
            <>
              <Paper elevation={0} className="overflow-hidden" style={{borderRadius: '12px'}}>
                <Grid container>
                  <Grid item xs={12} md={6} style={{position: 'relative'}}>
                    {share && (
                      <IconButton
                        onClick={() => share(nft.id)}
                        style={{position: 'absolute', top: '12px', right: '12px', zIndex: 1, color: 'white'}}
                      >
                        <ShareIcon />
                      </IconButton>
                    )}
                    <ConditionsList>
                      <Condition condition={!hasAccess || isChecking}>
                        <ImageSquare
                          isLoading={isChecking}
                          image={nft.image}
                          title={nft.title}
                          borderRadius="12px 0 0 0"
                        />
                      </Condition>
                      <Condition condition={hasAccess}>
                        <ContentSlider
                          userWalletAddress={userWalletAddress}
                          nftPage
                          slides={nft.assets.map((asset, index) => ({
                            asset,
                            hasAccess: nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT,
                            nftId: nft.address,
                            collectionAddress: nft.collectionAddress,
                            currentIndex: index,
                            name: asset.name,
                          }))}
                        />
                      </Condition>
                    </ConditionsList>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box px={2} pt={3} pb={1}>
                      <Typography variant="h3">{nft.title}</Typography>
                      {creator && (
                        <Box mt={2} mb={1} display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2">{t('Artist')}</Typography>
                          <StyledLink to={generatePath(ROUTES.CREATOR, {locale, artistId: creator.id})}>
                            <AvatarWithName creator={creator} isVerified />
                          </StyledLink>
                        </Box>
                      )}
                      <Box my={1} display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2">{t('Available on marketplace')}</Typography>
                        <Box display="flex" alignItems="center" gridGap={1}>
                          <Typography color="textSecondary">{secondaryOrdersAmount}</Typography>&nbsp;/&nbsp;
                          <Typography style={{fontWeight: 500}}>{nft.supply}</Typography>
                        </Box>
                      </Box>
                      <TextWithShowMore rowsCount={3}>{nft.description}</TextWithShowMore>

                      <Box py={1} my={1} style={{borderTop: '1px solid #f0f0f0'}}>
                        <Box mb={1}>
                          <Typography variant="body2">Collect to unlock</Typography>
                        </Box>
                        {nft.unlockingEventsSlugs.map((eventSlug) => (
                          <ConnectedEventNfts eventSlug={eventSlug} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              <Box my={2}>
                <ConditionsList>
                  <Condition condition={secondaryOrders && secondaryOrders.length > 0}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography variant="caption" color="textSecondary">
                                {t('Owner')}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="caption" color="textSecondary">
                                {t('Price')}
                              </Typography>
                            </TableCell>
                            {!isMobile && (
                              <TableCell hidden={isMobile}>
                                <Typography variant="caption" color="textSecondary">
                                  {t('Qty')}
                                </Typography>
                              </TableCell>
                            )}
                            {!isMobile && (
                              <TableCell hidden={isMobile}>
                                <Typography variant="caption" color="textSecondary">
                                  {t('Compared to initial drop')}
                                </Typography>
                              </TableCell>
                            )}
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {secondaryOrders?.map((order) => (
                            <TableRow>
                              <TableCell>
                                <Box display="flex" gridGap={8} alignItems="center">
                                  <img
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                    alt="avatar"
                                    style={{width: 24, height: 24, borderRadius: '50%', backgroundColor: '#ccc'}}
                                  />
                                  <Typography variant="body2" style={{textDecoration: 'underline'}}>
                                    <Link
                                      to={generatePath(ROUTES.COLLECTOR_PROFILE, {
                                        locale,
                                        walletPublicKey: order.creator,
                                      })}
                                    >
                                      {cropHexAddress(order.creator, 4, 4)}
                                    </Link>
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">${order.priceUsd}</Typography>
                              </TableCell>
                              {!isMobile && (
                                <TableCell hidden={isMobile}>
                                  <Typography variant="body2">{order.amount}</Typography>
                                </TableCell>
                              )}
                              {!isMobile && (
                                <TableCell hidden={isMobile}>
                                  <Typography variant="body2">{comparedToInitialDrop(order)}</Typography>
                                </TableCell>
                              )}
                              <TableCell align="right">
                                <Button
                                  onClick={() =>
                                    buy(nft.id, order.orderId, order.creator, order.priceUsd, Number(order.amount))
                                  }
                                  variant="contained"
                                  color="default"
                                  size="small"
                                  style={{minWidth: !isMobile ? 120 : undefined}}
                                >
                                  {t('Buy')}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Condition>
                </ConditionsList>
              </Box>
            </>
          )}
        </Box>
      </PageContainer>
    </AppContainer>
  );
};

const mapStateToProps = (state: any, {nftId}: {nftId: string}) => {
  const nft = selectNftById(state, nftId);
  const loadingState = selectNftDetailsPageLoadingState(state);
  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
  const creator = nft == null ? undefined : selectCreatorById(state, nft.creatorId);
  const unlockingEvents = selectExhibitsBySlugs(state, nft?.unlockingEventsSlugs || []);

  return {
    nft,
    creator,
    isNftLoading: loadingState.isNftLoading,
    userWalletAddress: walletPublicKey || null,
    unlockingEvents,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: {nftId: string}) => {
  return {
    loadNft: () => dispatch(LoadNftPageDataCommand.create(nftId)),
    share: (nftId: string) => dispatch(ShowShareNftModalCommand.create(nftId)),
    buy: (nftId: string, orderId: string, sellerWalletAddress: string, priceUsd: number, qty: number) =>
      dispatch(
        StartSecondaryNFTPurchaseCommand.create(
          nftId,
          bigNumberishToString(orderId),
          sellerWalletAddress,
          priceUsd,
          qty,
        ),
      ),
  };
};

const ConnectedNftMarketplacePage = connect(mapStateToProps, mapDispatchToProps)(NftMarketplacePageView);

export const NftMarketplacePage = () => {
  const {nftId} = useParams<{nftId: string}>();
  return <ConnectedNftMarketplacePage nftId={nftId} />;
};
