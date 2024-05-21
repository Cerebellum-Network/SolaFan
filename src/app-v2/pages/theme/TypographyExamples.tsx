import {Box, Typography} from '@material-ui/core';

export const TypographyExamples = () => {
  return (
    <Box>
      <Typography variant="h1">Typography</Typography>
      <Typography variant="h1" color="textPrimary">
        Typography
      </Typography>
      <Typography variant="h1" color="initial">
        Typography
      </Typography>
      <Box display="flex" flexDirection="column">
        <Typography variant="h1">Typography H1</Typography>
        <Typography variant="h2">Typography H2</Typography>
        <Typography variant="h3">Typography H3</Typography>
        {/*<Typography variant="h4">Typography H4</Typography>*/}
        {/*<Typography variant="h5">Typography H5</Typography>*/}
        <Typography variant="subtitle1">Typography subtitle1</Typography>
        <Typography variant="subtitle2">Typography subtitle2</Typography>
        <Typography variant="body1">Typography body1</Typography>
        <Typography variant="body2">Typography body2</Typography>
        <Typography variant="caption">Typography caption</Typography>
        <Typography variant="overline">Typography overline</Typography>
        <Typography variant="h6">Typography H6 (overline2)</Typography>
        <Typography variant="button">Typography button</Typography>
      </Box>
    </Box>
  );
};
