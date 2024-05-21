import {Box, makeStyles} from '@material-ui/core';
import {memo, ReactElement} from 'react';

import type {HeaderNavLinkType} from '../HeaderControl/types';
import {PageFooter} from '../PageFooter';
import {PageHeader} from '../PageHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  pageInner: {
    flexGrow: 2,
  },
  searchInputBox: {
    position: 'relative',
    width: 'fit-content',
  },
  searchInputBoxHidden: {
    opacity: 0,
  },
}));

type Props = {
  children: ReactElement | ReactElement[];
  logoUrl: string;
  creatorName?: string;
  hideBackButton?: boolean;
  renderHeaderSearch?: () => ReactElement;
  renderHeaderNotifications?: () => ReactElement | null;
  renderHeaderUserControl?: (navLinks: HeaderNavLinkType[]) => ReactElement;
};

export const PageLayout = memo(
  ({
    children,
    logoUrl,
    creatorName,
    hideBackButton,
    renderHeaderSearch,
    renderHeaderNotifications,
    renderHeaderUserControl,
  }: Props) => {
    const styles = useStyles();

    return (
      <>
        <Box className={styles.root}>
          <PageHeader
            logoUrl={logoUrl}
            creatorName={creatorName}
            hideBackButton={hideBackButton}
            renderHeaderSearch={renderHeaderSearch}
            renderHeaderNotifications={renderHeaderNotifications}
            renderHeaderUserControl={renderHeaderUserControl}
          />

          <Box className={styles.pageInner}>{children}</Box>

          <PageFooter />
        </Box>
      </>
    );
  },
);
