import {CircularProgress, Grid, Paper} from '@material-ui/core';
import {Condition, ConditionsList} from 'app-v2/components/shared/Conditions';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {Redirect, useHistory} from 'react-router-dom';

import {HIDE_MARKETPLACE_PAGE} from '../../../config/common';
import {useTrusted3rdPartyAuth} from '../../../shared/hooks/trusted-3rd-party-auth.hook';
import {useStyles} from '../../../styles/shared-styles';

export const ExternalAuthPage = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const classes = useStyles();

  const {success, error, isLoading} = useTrusted3rdPartyAuth(
    query.get('userToken') || '',
    query.get('userEmail') || '',
  );

  return (
    <PageContainer>
      <Grid item xs={12} className={classes.loaderWrapper}>
        <ConditionsList>
          <Condition condition={!!error}>
            <Paper className={classes.errorMessage} elevation={0}>
              {error}
            </Paper>
          </Condition>
          <Condition condition={!HIDE_MARKETPLACE_PAGE && success}>
            <Redirect to="/marketplace" />
          </Condition>
          <Condition condition={isLoading}>
            <CircularProgress size={36} thickness={2} color="inherit" />
          </Condition>
        </ConditionsList>
      </Grid>
    </PageContainer>
  );
};
