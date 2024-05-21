import {Container, Grid, makeStyles} from '@material-ui/core';
import {FC} from 'react';

const useStyles = makeStyles(() => ({
  containerFluid: {
    width: '100%',
    margin: '0 auto',
  },
  item: {
    padding: '0 !important',
  },
}));

const ContainerFluid: FC = ({children}) => {
  const classes = useStyles();

  return (
    <Container className={classes.containerFluid}>
      <Grid container spacing={2}>
        <Grid className={classes.item} item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContainerFluid;
