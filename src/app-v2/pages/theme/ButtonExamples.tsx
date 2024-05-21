import {Box, Button, Typography} from '@material-ui/core';

export const ButtonExamples = () => {
  return (
    <Box>
      <Typography variant="h1">Buttons</Typography>
      <Box>
        <Typography variant="h2">Primary</Typography>
        <Box>
          <Typography variant="h3">Contained</Typography>
          <Box>
            <Button variant="contained" color="primary" size="large">
              Button Large
            </Button>
            <Button variant="contained" color="primary" size="medium">
              Button Medium
            </Button>
            <Button variant="contained" color="primary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="contained" color="primary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="contained" color="primary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="contained" color="primary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Outlined</Typography>
          <Box>
            <Button variant="outlined" color="primary" size="large">
              Button Large
            </Button>
            <Button variant="outlined" color="primary" size="medium">
              Button Medium
            </Button>
            <Button variant="outlined" color="primary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="outlined" color="primary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="outlined" color="primary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="outlined" color="primary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Text</Typography>
          <Box>
            <Button variant="text" color="primary" size="large">
              Button Large
            </Button>
            <Button variant="text" color="primary" size="medium">
              Button Medium
            </Button>
            <Button variant="text" color="primary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="text" color="primary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="text" color="primary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="text" color="primary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h2">Secondary</Typography>
        <Box>
          <Typography variant="h3">Contained</Typography>
          <Box>
            <Button variant="contained" color="secondary" size="large">
              Button Large
            </Button>
            <Button variant="contained" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="contained" color="secondary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="contained" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="contained" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Outlined</Typography>
          <Box>
            <Button variant="outlined" color="secondary" size="large">
              Button Large
            </Button>
            <Button variant="outlined" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button variant="outlined" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="outlined" color="secondary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="outlined" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="outlined" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Text</Typography>
          <Box>
            <Button variant="text" color="secondary" size="large">
              Button Large
            </Button>
            <Button variant="text" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button variant="text" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="text" color="secondary" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="text" color="secondary" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="text" color="secondary" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h2">Default</Typography>
        <Box>
          <Typography variant="h3">Contained</Typography>
          <Box>
            <Button variant="contained" size="large">
              Button Large
            </Button>
            <Button variant="contained" size="medium">
              Button Medium
            </Button>
            <Button variant="contained" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="contained" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="contained" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="contained" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Outlined</Typography>
          <Box>
            <Button variant="outlined" size="large">
              Button Large
            </Button>
            <Button variant="outlined" size="medium">
              Button Medium
            </Button>
            <Button variant="outlined" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="outlined" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="outlined" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="outlined" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Text</Typography>
          <Box>
            <Button variant="text" size="large">
              Button Large
            </Button>
            <Button variant="text" size="medium">
              Button Medium
            </Button>
            <Button variant="text" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="text" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="text" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="text" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h2">Warning</Typography>
        <Box>
          <Typography variant="h3">Contained</Typography>
          <Box>
            <Button variant="contained" color="inherit" size="large">
              Button Large
            </Button>
            <Button variant="contained" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button variant="contained" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="contained" color="inherit" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="contained" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="contained" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Outlined</Typography>
          <Box>
            <Button variant="outlined" color="inherit" size="large">
              Button Large
            </Button>
            <Button variant="outlined" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button variant="outlined" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="outlined" color="inherit" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="outlined" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="outlined" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Text</Typography>
          <Box>
            <Button variant="text" color="inherit" size="large">
              Button Large
            </Button>
            <Button variant="text" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button variant="text" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
          <Box>
            <Button disabled={true} variant="text" color="inherit" size="large">
              Button Large
            </Button>
            <Button disabled={true} variant="text" color="inherit" size="medium">
              Button Medium
            </Button>
            <Button disabled={true} variant="text" color="inherit" size="small">
              Button Small
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
