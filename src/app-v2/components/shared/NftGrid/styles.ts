import {makeStyles} from '@material-ui/core';

import colors from '../../../../styles/colors';

export const useGridStyles = makeStyles((theme) => ({
  rootVars: {
    '--padding': '0 1rem',
    '--filters-width': '100%',

    [theme.breakpoints.up('md')]: {
      '--padding': 0,
      '--filters-width': '349px',
    },

    [theme.breakpoints.up('lg')]: {
      '--padding': '0 88px',
      '--filters-width': '397px',
    },
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0',
  },
  section: {
    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      maxWidth: '688px',
    },
    [theme.breakpoints.up('lg')]: {
      margin: 'auto',
      maxWidth: '1440px',
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  headerContentWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 'var(--padding)',
    marginBottom: '24px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'end',
      padding: 'var(--padding)',
    },
    [theme.breakpoints.up('lg')]: {
      padding: 'var(--padding)',
      marginBottom: '28px',
    },
  },
  textContent: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - var(--filters-width))',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - var(--filters-width))',
    },
  },

  contentGrid: {
    width: '100%',
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(343px, 1fr))',
    justifyItems: 'center',
    padding: 'var(--padding)',
    [theme.breakpoints.up('md')]: {
      gap: '32px',
      padding: 'var(--padding)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(328px, 2fr))',
    },
    [theme.breakpoints.up('lg')]: {
      padding: 'var(--padding)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 3fr))',
    },
  },
  controlsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 0 0 0',
  },
  loadMoreButton: {
    width: '184px',
    height: '36px',
    borderRadius: '100px',
    padding: '8px 16px',
    backgroundColor: colors.lighter,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  },
  placeholder: {
    width: '100%',
    padding: 'var(--padding)',
  },
}));
