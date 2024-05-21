import {FullCreatorInterface} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, Grid, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {memo, useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {AppContainer} from '../../components/connected/AppContainer';
import {Skeleton} from '../../components/primitives/Skeleton';
import {ConfirmModal} from '../../components/shared/ConfirmModal';
import {PageContainer} from '../../components/shared/PageContainer';
import {MyWalletSkeleton, UserNftsSkeleton} from '../../components/shared/Skeletons';
import {UserNftsList} from '../../components/shared/UserNftsList';
import {WalletType} from '../../components/shared/Wallet/types';
import {useThemeBreakpoints} from '../../hooks/useThemeBreakpoints';
import {SupportedWalletType} from '../../models/wallet/types';
import {UsersNftCardInterface} from '../../types/nft';
import {useOnComponentRendered} from '../../utils/hooks/use-on-component-rendered';
import {MyWallet} from './components/MyWallet';
import {WalletAddress} from './components/WalletAddress';
import {useStyles} from './styles';

type Props = {
  randomCreator: FullCreatorInterface;
  isCreatorsLoading: boolean;
  selectedWalletType: SupportedWalletType;
  connectedWallets: WalletType[];
  profileNfts: UsersNftCardInterface[] | undefined;
  fetchProfileNfts: () => void;
  disconnectWallet: (type: SupportedWalletType) => void;
  openWallet: (type: SupportedWalletType) => void;
  loadCreators: () => void;
};

export const WalletPageView = memo(
  ({
    selectedWalletType,
    connectedWallets,
    profileNfts,
    fetchProfileNfts,
    disconnectWallet,
    openWallet,
    isCreatorsLoading,
    randomCreator,
    loadCreators,
  }: Props) => {
    const {t, locale} = useLocalization();
    const styles = useStyles();
    const history = useHistory();
    const selectedWallet = connectedWallets.find((wallet) => wallet.type === selectedWalletType);
    const walletName = `${t('My')} ${selectedWallet?.title || t('wallet')}`;
    const [confirmDisconnectDialogOpen, setConfirmDisconnectDialogOpen] = useState(false);

    useOnComponentRendered(fetchProfileNfts);
    useOnComponentRendered(loadCreators);

    const handleManageWalletClick = useCallback(() => {
      if (selectedWalletType === SupportedWalletType.CEREWALLET) {
        openWallet(selectedWalletType);
      }
    }, [openWallet, selectedWalletType]);

    const handleRequestDisconnectWallet = useCallback(() => {
      setConfirmDisconnectDialogOpen(true);
    }, []);

    const handleDisconnectModalCancel = useCallback(() => {
      setConfirmDisconnectDialogOpen(false);
    }, []);

    const handleDisconnectWallet = useCallback(async () => {
      handleDisconnectModalCancel();

      disconnectWallet(selectedWalletType);
      history.replace(`/${locale}/home/user/profile`);
    }, [disconnectWallet, handleDisconnectModalCancel, history, locale, selectedWalletType]);

    const {isMobile} = useThemeBreakpoints();

    return (
      <>
        <AppContainer>
          <PageContainer className={styles.container}>
            <Box px={2}>
              <Box className={styles.walletTitleBox}>
                <Typography className={styles.title}>{walletName}</Typography>
              </Box>

              <Box className={styles.walletBox}>
                <Grid container spacing={1} direction={isMobile ? 'column' : 'column-reverse'}>
                  <Grid item xs={12}>
                    {selectedWallet == null ? (
                      <Box className={styles.walletElement}>
                        <MyWalletSkeleton />
                      </Box>
                    ) : (
                      <Box className={styles.walletElement}>
                        <MyWallet
                          walletBalance={Number(selectedWallet.walletBalance)}
                          walletName={walletName}
                          onManageWalletClick={
                            selectedWalletType === SupportedWalletType.CEREWALLET ? handleManageWalletClick : undefined
                          }
                          onDisconnectClick={
                            selectedWalletType === SupportedWalletType.METAMASK
                              ? handleRequestDisconnectWallet
                              : undefined
                          }
                        />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {selectedWallet?.publicKey == null ? (
                      <Box className={styles.walletElement}>
                        <Box pb={1}>
                          <Skeleton variant="text" height="30px" width="50%" />
                        </Box>
                        <Skeleton variant="text" height="24px" width="80%" />
                      </Box>
                    ) : (
                      <Box className={cx(styles.walletElement, styles.walletAddressElement)}>
                        <WalletAddress publicKey={selectedWallet.publicKey} afterCopyEvent={() => {}} />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>

              <Box className={styles.nftsTitleBox}>
                <Typography className={styles.title}>{t('My Collectibles')}</Typography>
              </Box>
              <Box className={styles.nftsBox}>
                {profileNfts == null || isCreatorsLoading ? (
                  <UserNftsSkeleton />
                ) : (
                  <UserNftsList nfts={profileNfts} randomCreator={randomCreator} />
                )}
              </Box>
            </Box>
          </PageContainer>
        </AppContainer>
        <ConfirmModal
          open={confirmDisconnectDialogOpen}
          title={t('Disconnect wallet')}
          text={t('Are you sure you want to disconnect this wallet? External wallet is required for payment')}
          confirmText={t('Disconnect')}
          onCancel={handleDisconnectModalCancel}
          onConfirm={handleDisconnectWallet}
        />
      </>
    );
  },
);
