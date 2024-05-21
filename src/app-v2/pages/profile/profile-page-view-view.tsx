import {Box, Card, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {selectUserEmail} from 'app-v2/redux/modules/auth/selectors';
import {FC, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {generatePath, useHistory} from 'react-router-dom';

import {cropHexAddress} from '../../../shared/lib/utils';
import {CollectorProfile} from '../../api/collector/types';
import {AppContainer} from '../../components/connected/AppContainer';
import {CreatorHeaderSkeleton} from '../../components/primitives/Skeleton/CreatorHeaderSkeleton';
import {PageContainer} from '../../components/shared/PageContainer';
import {AppMetaTags} from '../../components/shared/SeoHeaders/seo-headers.component';
import {WalletType} from '../../components/shared/Wallet/types';
import {ROUTES} from '../../constants/routes';
import {SupportedWalletType} from '../../models/wallet/types';
import {CmsExhibit} from '../../types/exhibit';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {CreatorCard} from './components/CreatorCard';
import {DiscoverNotice} from './components/DiscoverNotice';
import {WalletButton} from './components/WalletButton';
import {ReactComponent as ProfileIcon} from './profile.svg';

type Props = {
  walletPublicKey?: string;
  isUserAuthenticated: Boolean;
  selectedWalletType: SupportedWalletType;
  connectedWallets: WalletType[];
  nfts?: CollectorProfile['collectedNfts'];
  exhibitions?: CollectorProfile['collectedExhibitions'];
  creators?: CollectorProfile['collectedCreators'];
  loading: boolean;
  isLoadingExhibits: boolean;
  allEvents: CmsExhibit[];
  fetchProfile: () => void;
  loadExhibits: () => void;
};

export const ProfilePageView: FC<Props> = ({
  walletPublicKey,
  isUserAuthenticated,
  selectedWalletType,
  connectedWallets,
  fetchProfile,
  loading,
  creators,
  exhibitions,
  isLoadingExhibits,
  allEvents,
  nfts,
  loadExhibits,
}) => {
  useOnComponentRendered(fetchProfile);
  useOnComponentRendered(loadExhibits);

  useEffect(() => {
    const interval = setInterval(fetchProfile, 10 * 1000);
    const timeout = setTimeout(() => clearInterval(interval), 30 * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fetchProfile]);

  const history = useHistory();

  const {t, locale} = useLocalization();
  const userEmail = useSelector(selectUserEmail);
  const selectedWallet = connectedWallets.find((wallet) => wallet.type === selectedWalletType);

  if (!isUserAuthenticated && !isLoadingExhibits && allEvents.length) {
    const eventSlug = allEvents[0].slug;
    history.push(generatePath(ROUTES.EVENT, {locale, exhibitSlug: eventSlug}));
    // history.push(`/${locale}/home/exhibit/${eventSlug}`);
  }

  return (
    <AppContainer>
      <AppMetaTags title={t(`Collector's profile`)} description={t(`Collector's profile`)} localizations={[]} />

      <PageContainer>
        <Box py={{xs: 2, md: 5}} px={{xs: 2, md: 5, lg: 32}} display="flex" flexDirection="column" gridGap={12}>
          <Box display="flex" justifyContent="space-between" sx={{flexDirection: {xs: 'column', md: 'row'}}}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor: '#E0E0E7', borderRadius: '50%', width: '48px', height: '48px'}}
              >
                <ProfileIcon />
              </Box>
              <Box flex={1} display="flex" flexDirection="column" gridGap={4} px={1} py={{xs: 2, md: 0}}>
                <Typography variant="h2">{t(`Collector's profile`)}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {walletPublicKey == null ? userEmail : cropHexAddress(walletPublicKey, 10, 6)}
                </Typography>
              </Box>
            </Box>
            {walletPublicKey == null ? <WalletButton wallet={selectedWallet} /> : <></>}
          </Box>

          <Box pt={2}>
            <Typography variant="h2">{t(walletPublicKey ? 'Clubs' : 'My clubs')}</Typography>
          </Box>

          {loading || creators == null ? (
            <Card style={{borderRadius: 8, paddingBottom: 16}}>
              <CreatorHeaderSkeleton />
            </Card>
          ) : creators.length === 0 ? (
            <DiscoverNotice />
          ) : (
            <Box display="flex" flexDirection="column" style={{gap: 16}}>
              {creators.map((creator) => {
                const creatorNfts = nfts?.filter((nft) => nft.creatorId === creator.id);
                const creatorExhibitions = exhibitions?.filter((exhibition) =>
                  creatorNfts?.some((nft) => nft.exhibitionId === exhibition.id),
                );

                return (
                  <CreatorCard
                    walletPublicKey={selectedWallet?.publicKey}
                    key={creator.id}
                    creator={creator}
                    nfts={creatorNfts || []}
                    exhibitions={creatorExhibitions || []}
                    collectablesSectionsTitle={walletPublicKey ? t('Collectibles') : t('My collectibles')}
                    eventsSectionsTitle={walletPublicKey ? t('Events') : t('My events')}
                    userEmail={userEmail}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </PageContainer>
    </AppContainer>
  );
};
