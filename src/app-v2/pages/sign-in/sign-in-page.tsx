import {Box, Button, Card, Typography} from '@material-ui/core';
import {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {AppContainer} from '../../components/connected/AppContainer';
import {PageContainer} from '../../components/shared/PageContainer';
import {AppMetaTags} from '../../components/shared/SeoHeaders/seo-headers.component';
import {useLocalization} from '../../hooks/use-locale.hook';
import {SupportedWalletType} from '../../models/wallet/types';
import {selectUserEmail} from '../../redux/modules/auth/selectors';
import {RedirectCommand} from '../../redux/modules/navigation/actions';
import {ConnectCereWallet} from '../../redux/modules/wallets';

type Props = {
  userEmail: string;
  connectWallet: () => void;
  redirect: (path: string) => void;
  redirectPath?: string;
};

const SignInPageView: FC<Props> = ({userEmail, connectWallet, redirect, redirectPath}) => {
  const {t} = useLocalization();

  useEffect(() => {
    if (userEmail == null) {
      window.location.reload();
      setTimeout(() => {
        connectWallet();
      }, 2000);
    } else {
      redirect(redirectPath || '/');
    }
  }, [userEmail, connectWallet, redirect, redirectPath]);

  return (
    <AppContainer>
      <AppMetaTags title={t(`Collector's profile`)} description={t(`Collector's profile`)} localizations={[]} />

      <PageContainer>
        <Box px={1} py={3} display="flex" justifyContent="center" alignItems="center">
          <Card>
            <Box
              p={2}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              gridGap="8px"
              maxWidth="340px"
            >
              <Typography variant="body2">{t('Please wait while we connect to your wallet...')}</Typography>
              <Button variant="contained" size="small" onClick={() => connectWallet()}>
                {t('Retry')}
              </Button>
            </Box>
          </Card>
        </Box>
      </PageContainer>
    </AppContainer>
  );
};

const mapStateToProps = (state: any) => {
  const userEmail = selectUserEmail(state);
  const redirectPath = new URLSearchParams(window.location.search).get('redirectUrl') || undefined;
  return {
    userEmail,
    redirectPath,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectWallet: () => dispatch(ConnectCereWallet.create(SupportedWalletType.CEREWALLET)),
  redirect: (path: string) => dispatch(RedirectCommand.create(path)),
});

export const SignInPage = connect(mapStateToProps, mapDispatchToProps)(SignInPageView);
