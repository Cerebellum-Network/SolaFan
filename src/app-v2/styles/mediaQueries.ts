import {Theme} from '@material-ui/core/styles/createTheme';

export const mobileLandscapeMediaQuery = (theme: Theme) =>
  `${theme.breakpoints.up('md')} and (max-width: 916px) and (orientation: landscape) and (pointer:coarse)`;
