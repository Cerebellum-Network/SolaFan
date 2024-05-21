import {cx} from '@linaria/core';
import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {memo, ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useHistory} from 'react-router-dom';

import {
  enableVideoHome,
  HIDE_CREATORS_PAGE,
  HIDE_EVENTS_PAGE,
  HIDE_HOME_PAGE,
  HIDE_MARKETPLACE_PAGE,
} from '../../../../config/common';
import {ROUTES} from '../../../constants/routes';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {NavLink} from '../../primitives/NavLink';
// import {Skeleton} from '../../primitives/Skeleton';
import type {HeaderNavLinkType} from '../HeaderControl/types';
import {PageContainer} from '../PageContainer';
import {ReactComponent as Creators} from './assets/creators.svg';
import {ReactComponent as Events} from './assets/exhibits.svg';
import {ReactComponent as Home} from './assets/home.svg';
import {ReactComponent as Marketplace} from './assets/marketplace.svg';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
  },
  rootFixed: {
    position: 'fixed',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
  },
  rootBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  rootSize: {
    padding: 0,
    height: '54px',
    [theme.breakpoints.up('lg')]: {
      height: '76px',
    },
  },
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    columnGap: '16px',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  logo: {
    [theme.breakpoints.down('lg')]: {
      width: '115px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '154px',
    },
    [theme.breakpoints.down('md')]: {
      width: '57.5px',
    },
  },

  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'absolute',
    right: '20px',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      right: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      position: 'static',
      flexGrow: 2,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  leftHeaderControls: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  rightHeaderControls: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  backButtonBox: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  desctopNav: {
    display: 'flex',
    height: '100%',
  },
}));

type Props = {
  logoUrl?: string;
  creatorName?: string;
  hideBackButton?: boolean;
  renderHeaderSearch?: () => ReactElement;
  renderHeaderNotifications?: () => ReactElement | null;
  renderHeaderUserControl?: (navLinks: HeaderNavLinkType[]) => ReactElement;
};

export const PageHeader = memo(
  ({
    // logoUrl,
    creatorName,
    hideBackButton,
    renderHeaderSearch,
    renderHeaderNotifications,
    renderHeaderUserControl,
  }: Props) => {
    const {
      t,
      i18n: {language},
    } = useTranslation();
    const styles = useStyles();
    const history = useHistory();
    const {isDesktop} = useThemeBreakpoints();

    const NAV_LINKS = useMemo(() => {
      const links = [
        ...(!HIDE_HOME_PAGE
          ? [{title: t('Home'), link: generatePath(ROUTES.HOME, {locale: language}), icon: <Home />}]
          : []),
        ...(!HIDE_MARKETPLACE_PAGE
          ? [
              {
                title: t('Marketplace'),
                link: generatePath(ROUTES.MARKETPLACE, {locale: language}),
                icon: <Marketplace />,
              },
            ]
          : []),
        ...(!HIDE_EVENTS_PAGE
          ? [{title: t('Events'), link: generatePath(ROUTES.EVENTS, {locale: language}), icon: <Events />}]
          : []),
        ...(!HIDE_CREATORS_PAGE
          ? [{title: t('Creators'), link: generatePath(ROUTES.CREATORS, {locale: language}), icon: <Creators />}]
          : []),
      ];

      if (enableVideoHome()) {
        links.splice(1, 0, {
          title: t('Videos'),
          link: generatePath(ROUTES.VIDEOS, {locale: language}),
          icon: <Home />,
        });
      }

      return links;
    }, [language, t]);

    return (
      <Box className={styles.rootSize}>
        <Box className={cx(styles.rootFixed, styles.rootSize, styles.rootBackground)} />

        <Box className={cx(styles.rootFixed, styles.rootSize, styles.rootBox)}>
          <PageContainer className={styles.container}>
            <>
              {!hideBackButton && (
                <Box className={styles.backButtonBox}>
                  <IconButton size="small" color="primary" onClick={history.goBack}>
                    <ArrowBack />
                  </IconButton>
                </Box>
              )}
              <Box className={styles.logoRow}>
                {/*{logoUrl ? (*/}
                {/*  <img src={logoUrl} alt="logo" className={styles.logo} />*/}
                {/*) : (*/}
                {/*  <Skeleton variant="rect" className={styles.logo} />*/}
                {/*)}*/}
                <Typography variant="subtitle1">{creatorName}</Typography>
              </Box>
              <Box className={styles.headerControls}>
                <Box className={styles.leftHeaderControls}>{renderHeaderSearch?.()}</Box>

                <Box className={styles.rightHeaderControls}>
                  {isDesktop && (
                    <Box className={cx(styles.desctopNav, 'mr-4')}>
                      {NAV_LINKS.map(({title, link}) => (
                        <NavLink key={title} to={link}>
                          {title}
                        </NavLink>
                      ))}
                    </Box>
                  )}
                  {renderHeaderNotifications?.()}
                  {renderHeaderUserControl?.(NAV_LINKS)}
                </Box>
              </Box>
            </>
          </PageContainer>
        </Box>
      </Box>
    );
  },
);
