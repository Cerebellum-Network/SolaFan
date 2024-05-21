import {CircularProgress, Grid, Paper} from '@material-ui/core';
import {Condition, ConditionsList} from 'app-v2/components/shared/Conditions';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useHistory} from 'react-router-dom';
import {useExternalAuthCallback} from 'shared/hooks/use-external-auth-callback';

import {useStyles} from '../../../styles/shared-styles';

export const ExternalAuthCallback = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const classes = useStyles();

  const {error, isLoading} = useExternalAuthCallback(query.get('code') || '');

  return (
    <PageContainer>
      <Grid item xs={12} className={classes.loaderWrapper}>
        <ConditionsList>
          <Condition condition={!!error}>
            <Paper className={classes.errorMessage} elevation={0}>
              {error}
            </Paper>
          </Condition>
          <Condition condition={isLoading}>
            <CircularProgress size={36} thickness={2} color="inherit" />
          </Condition>
        </ConditionsList>
      </Grid>
    </PageContainer>
  );
};
