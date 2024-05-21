import {Box, CircularProgress, Container, makeStyles, Theme} from '@material-ui/core';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useCallback, useEffect, useMemo} from 'react';
import {generatePath, useHistory} from 'react-router-dom';

import {ALL_WALLET, AllWallets, isAppWallet} from '../../../shared/types/supported-wallet';
import colors from '../../../styles/colors';
import {UserWalletNftResult} from '../../api/user-nfts-page/types';
import {Title} from '../../components/primitives/Title';
import {InfoCard} from '../../components/shared/InfoCard';
import {ROUTES} from '../../constants/routes';
import {NonCustodyWallets, SupportedWalletType} from '../../models/wallet/types';
import {WalletSelector} from './components/WalletSelector';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: '16px',
    paddingRight: '16px',

    [theme.breakpoints.up('md')]: {
      padding: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '70px',
      maxWidth: '832px',
      minWidth: '832px',
      padding: '0px',
    },
  },
  loaderPage: {
    backgroundColor: colors.light,
    color: colors.primaryDark,
    minHeight: '300px',
  },
  loader: {
    margin: 'auto',
  },
  list: {
    '--size': '164px',
    padding: '0.5rem 0 1rem',

    display: 'grid',
    gap: '12px 12px',
    justifyContent: 'flex-center',
    gridTemplateColumns: 'repeat(auto-fill, var(--size))',

    [theme.breakpoints.up('sm')]: {
      gap: '24px 32px',
      justifyContent: 'start',
      '--size': '208px',
    },
    [theme.breakpoints.up('lg')]: {
      '--size': '184px',
    },
  },
}));

type UserNFTsPageViewProps = {
  nfts: UserWalletNftResult[];
  loadNfts: (nftQueryParam: string[]) => void;
  loading: boolean;
  loadingNfts: boolean;
  walletsPublicKeys: string[];
  connectedWallets: SupportedWalletType[];
  walletPublicKey: string;
  appTitle: string;
  activeWallet: AllWallets;
  setActiveWallet: (activeWallet: AllWallets) => unknown;
  nonCustodyWallets: NonCustodyWallets[];
};

export const UserNFTsPageView = ({
  nfts,
  walletPublicKey,
  appTitle,
  loadNfts,
  activeWallet,
  setActiveWallet,
  loading,
  nonCustodyWallets,
}: UserNFTsPageViewProps) => {
  const styles = useStyles();
  const {locale, t} = useLocalization();
  const history = useHistory();

  const nftQueryParam = useMemo(() => {
    const davinciWallet = walletPublicKey || '';

    if (activeWallet === ALL_WALLET) {
      return [
        ...[davinciWallet].filter(Boolean),
        ...nonCustodyWallets?.map(({publicKey}) => publicKey.toLowerCase()).filter(Boolean),
      ];
    }
    if (isAppWallet(activeWallet)) {
      return [davinciWallet].filter(Boolean);
    }

    if (activeWallet === 'TORUS') {
      return [
        ...[davinciWallet].filter(Boolean),
        ...nonCustodyWallets
          .filter((wallet) => wallet.type === 'TORUS')
          .map(({publicKey}) => publicKey.toLowerCase())
          .filter(Boolean),
      ];
    }

    return [nonCustodyWallets.find(({type}) => type === activeWallet)?.publicKey.toLowerCase() ?? ''].filter(Boolean);
  }, [walletPublicKey, activeWallet, nonCustodyWallets]);

  useEffect(() => {
    loadNfts(nftQueryParam);
  }, [loadNfts, nftQueryParam]);

  const handleViewNft = useCallback(
    (id: UserWalletNftResult['id']) => history.push(generatePath(ROUTES.NFT_PAGE, {nftId: id, locale})),
    [history, locale],
  );

  if (!loading) {
    return (
      <Box className={styles.loaderPage} display="flex">
        <CircularProgress size={36} thickness={2} color="inherit" className={styles.loader} />
      </Box>
    );
  }

  return (
    <PageContainer>
      <Container className={styles.container}>
        <Title>{t('My collection')}</Title>
        <WalletSelector nonCustodyWallets={nonCustodyWallets} appTitle={appTitle} setActiveWallet={setActiveWallet} />
        <Box className={styles.list}>
          {nfts.map(({id, image, title}) => (
            <InfoCard key={id} {...{id, image, title}} onCardClick={handleViewNft} />
          ))}
        </Box>
      </Container>
    </PageContainer>
  );
};
