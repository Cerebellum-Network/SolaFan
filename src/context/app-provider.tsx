import {css} from '@linaria/core';
import {CircularProgress, CssBaseline, Grid, MuiThemeProvider, Paper, Slide, useMediaQuery} from '@material-ui/core';
import {Condition} from 'app-v2/components/shared/Conditions';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useAppConfig} from 'app-v2/hooks/use-app-config.hook';
import {walletConnectionService} from 'app-v2/models/wallet';
import {SupportedWalletType} from 'app-v2/models/wallet/types';
import {setCereWalletReadiness} from 'app-v2/redux/modules/wallets';
import {SnackbarProvider} from 'notistack';
import {ReactElement, ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useCustomTheme} from 'shared/hooks/custom-theme.hook';
import {useStyles} from 'styles/shared-styles';

const globals = css`
  :global() {
    body > iframe[style*='fixed'] {
      display: none;
    }
  }
`;

export type AppProviderType = {
  children: ReactNode;
};

export function AppProvider({children}: AppProviderType): ReactElement {
  const {appConfig, isLoading, loaded, error} = useAppConfig();
  const {theme} = useCustomTheme(appConfig);
  const dispatch = useDispatch();
  const isTabletOrAbove = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  useEffect(() => {
    if (loaded) {
      walletConnectionService.preloadWalletByType(SupportedWalletType.CEREWALLET).then(() => {
        dispatch(setCereWalletReadiness(true));
        console.log(`${SupportedWalletType.CEREWALLET} wallet has been init`);
      });
    }
  }, [appConfig, loaded, dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <SnackbarProvider
          maxSnack={isTabletOrAbove ? 3 : 2}
          autoHideDuration={5000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          classes={{containerRoot: classes.snackBar}}
          TransitionComponent={Slide as any}
        >
          <Loader isLoading={isLoading} error={error as string} />
          <Condition condition={process.env.NODE_ENV === 'development'}>
            <div className={globals} />
          </Condition>
          <Condition condition={!isLoading && !error}>{children}</Condition>
        </SnackbarProvider>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

const Loader = ({isLoading, error}: {isLoading: boolean; error?: string}) => {
  const classes = useStyles();

  return (
    <>
      <Condition condition={isLoading}>
        <PageContainer>
          <Grid item xs={12} className={classes.loaderWrapper}>
            <CircularProgress size={36} thickness={2} color="inherit" />
          </Grid>
        </PageContainer>
      </Condition>
      <Condition condition={!!error}>
        <PageContainer>
          <Grid item xs={12} className={classes.loaderWrapper}>
            <Paper className={classes.errorMessage} elevation={0}>
              {error}
            </Paper>
          </Grid>
        </PageContainer>
      </Condition>
    </>
  );
};
