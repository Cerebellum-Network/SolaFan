import {Typography} from '@cere/rxb-template-ui-kit';
import {Avatar, Box, Button, Collapse, Divider, ListItemSecondaryAction, MenuItem} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';
import {useEffect, useMemo, useRef, useState} from 'react';
import {generatePath, useHistory} from 'react-router-dom';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {
  HIDE_CREATORS_PAGE,
  HIDE_EVENTS_PAGE,
  HIDE_HOME_PAGE,
  HIDE_MARKETPLACE_PAGE,
  REACT_APP_HIDE_MY_COLLECTION_PAGE,
} from '../../../../config/common';
import {ROUTES} from '../../../constants/routes';
import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletType} from '../Wallet/types';
import {ReactComponent as AvatarIcon} from './assets/avatar.svg';
import {ReactComponent as Arrow, ReactComponent as BackIcon} from './assets/back-arrow.svg';
import {ReactComponent as ShoppingCartIcon} from './assets/cartIcon.svg';
import {ReactComponent as CloseIcon} from './assets/close.svg';
import {ReactComponent as PicturesIcon} from './assets/collectionIcon.svg';
import {ReactComponent as CreatorsIcon} from './assets/creatorsIcon.svg';
import {ReactComponent as ExhibitsIcon} from './assets/exhibitsIcon.svg';
import {ReactComponent as HelpIcon} from './assets/faqIcon.svg';
import {ReactComponent as HomeIcon} from './assets/homeIcon.svg';
import {ReactComponent as UserAccountIcon} from './assets/profileIcon.svg';
import {ReactComponent as SellNFTsIcon} from './assets/sellNftsLabel.svg';
import {ReactComponent as SignOutIcon} from './assets/signOutIcon.svg';
import {arrowStyle, useMenuListStyles} from './styles';
import {UserAccount} from './UserAccount';
import {UserWallets} from './UserWallets';

export type UserMenuListProps = {
  userEmail: string;
  faqUrl: string;
  totalNftsCount: number;
  hasNewNotifications: boolean;
  connectedWallets: WalletType[];
  selectedWallet: SupportedWalletType;
  onSignOut: () => void;
  onConnectWallet: () => void;
  onSelectWallet: (type: SupportedWalletType) => void;
  handleClose: () => void;
  onSignIn: () => void;
};

export const UserMenuList = ({
  onSignOut,
  onConnectWallet,
  selectedWallet,
  userEmail,
  faqUrl,
  totalNftsCount,
  hasNewNotifications,
  connectedWallets,
  onSelectWallet,
  onSignIn,
  handleClose,
}: UserMenuListProps) => {
  const {t, locale} = useLocalization();
  const refElement = useRef<HTMLDivElement>();
  const [height, setHeight] = useState<number>(0);
  const history = useHistory();
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const styles = useMenuListStyles({height});
  const isHelpBlockDisabled = true;

  useEffect(() => {
    if (!!refElement.current) {
      setHeight(refElement?.current.scrollHeight);
    }
  }, [refElement?.current?.scrollHeight]);

  const navigate = (path: string) => {
    history.push(path, {pathname: window.location.pathname});
  };

  const {pathname} = useMemo(() => new URL(window.location.href), []);

  return (
    <Box {...{ref: refElement}} className={styles.menu}>
      <Box className={clsx(styles.mobileHeader, styles.menuItemRoot)}>
        <Box onClick={handleClose} display="flex" alignItems="center">
          <BackIcon />
          <span className={styles.backArrow}>{t('Back')}</span>
        </Box>
        <Box onClick={handleClose} className={styles.mobileClose}>
          <CloseIcon className={styles.closeIcon} />
        </Box>
      </Box>

      <MenuItem
        // ref={forwardedRef}
        classes={{root: styles.menuItemRoot}}
        className={userEmail && styles.userInfoBlock}
      >
        {userEmail ? (
          <Avatar className={styles.avatar}>
            <AvatarIcon />
          </Avatar>
        ) : (
          <>
            <Typography className={styles.defaultMenu}>{t('Menu')}</Typography>
            <Box onClick={handleClose} className={clsx(styles.close, styles.menuMobile)} aria-label="close menu">
              <CloseIcon className={styles.closeIcon} />
            </Box>
          </>
        )}

        {userEmail && (
          <div>
            <Typography className={styles.userName}>{userEmail || t('Empty email')}</Typography>
            <Box
              onClick={handleClose}
              className={clsx(styles.close, styles.closeIconContainer, styles.menuMobile)}
              aria-label="close menu"
            >
              <CloseIcon className={styles.closeIcon} />
            </Box>
          </div>
        )}
      </MenuItem>

      <Divider variant="middle" component="li" className={!userEmail ? styles.guest : styles.divider} />

      {userEmail && (
        <>
          <MenuItem
            classes={{root: styles.menuItemRoot}}
            className={styles.menuItem}
            onClick={() => setIsAccountOpen(!isAccountOpen)}
          >
            <Box py="6px">
              <Typography
                variant="h5"
                className={clsx(styles.menuItemText, styles.inActiveItem, styles.collapsibleHeader)}
              >
                <UserAccountIcon />
                {t('My account')}
              </Typography>
              <ListItemSecondaryAction>
                <Arrow className={clsx(styles.arrow, isAccountOpen && styles.arrowOpen)} style={arrowStyle} />
              </ListItemSecondaryAction>
            </Box>
          </MenuItem>
          <Collapse in={isAccountOpen}>
            <UserAccount hasNewNotifications={hasNewNotifications} />
          </Collapse>

          {!REACT_APP_HIDE_MY_COLLECTION_PAGE && (
            <MenuItem
              classes={{root: styles.menuItemRoot}}
              className={clsx(
                styles.menuItem,
                pathname === `/${locale}/home/user/nfts` ? styles.activeItem : styles.inActiveItem,
              )}
              onClick={navigate.bind(null, `/${locale}/home/user/nfts`)}
            >
              <PicturesIcon />
              {t('My collection')}
              <Box className={styles.comingSoonLabel}>{totalNftsCount}</Box>
              {!HIDE_MARKETPLACE_PAGE && <SellNFTsIcon className={styles.sellNftsLabel} />}
            </MenuItem>
          )}

          <MenuItem
            classes={{root: styles.menuItemRoot}}
            className={clsx(
              styles.menuItem,
              pathname === generatePath(ROUTES.MY_PROFILE, {locale}) ? styles.activeItem : styles.inActiveItem,
            )}
            onClick={navigate.bind(null, generatePath(ROUTES.MY_PROFILE, {locale}))}
          >
            <PicturesIcon />
            {t('Your Collector Profile')}
          </MenuItem>

          <Divider variant="middle" component="li" className={styles.divider} />
        </>
      )}

      <Box className={styles.menuDesktop}>
        {!HIDE_HOME_PAGE && (
          <MenuItem
            className={clsx(styles.menuItem, pathname === `/${locale}/home` ? styles.activeItem : styles.inActiveItem)}
            onClick={navigate.bind(null, `/${locale}/home`)}
          >
            <HomeIcon />
            {t('Home')}
          </MenuItem>
        )}
        {!HIDE_MARKETPLACE_PAGE && (
          <MenuItem
            className={clsx(
              styles.menuItem,
              pathname === `/${locale}/marketplace` ? styles.activeItem : styles.inActiveItem,
            )}
            onClick={navigate.bind(null, `/${locale}/marketplace`)}
          >
            <ShoppingCartIcon />
            {t('Marketplace')}
          </MenuItem>
        )}
        {!HIDE_EVENTS_PAGE && (
          <MenuItem
            className={clsx(
              styles.menuItem,
              pathname === `/${locale}/events` ? styles.activeItem : styles.inActiveItem,
            )}
            onClick={navigate.bind(null, `/${locale}/events`)}
          >
            <ExhibitsIcon />
            {t('Events')}
          </MenuItem>
        )}
        {!HIDE_CREATORS_PAGE && (
          <MenuItem
            className={clsx(
              styles.menuItem,
              pathname === `/${locale}/creators` ? styles.activeItem : styles.inActiveItem,
            )}
            onClick={navigate.bind(null, `/${locale}/creators`)}
          >
            <CreatorsIcon />
            {t('Creators')}
          </MenuItem>
        )}
        <Divider variant="middle" component="li" className={!userEmail ? styles.guest : styles.divider} />
      </Box>
      {userEmail && (
        <>
          <Box className={styles.walletsBlock}>
            <Typography variant="h4">{t('Wallets')}</Typography>
            <Box className={clsx(styles.text, GoogleAnalyticsId.ConnectWalletBtn)} onClick={onConnectWallet}>
              {t('Add wallet')}
            </Box>
          </Box>
          <Box className={styles.userWalletsBlock}>
            <UserWallets
              userWallets={connectedWallets}
              onWalletSelect={onSelectWallet}
              selectedWallet={selectedWallet}
            />
          </Box>
        </>
      )}
      <Divider variant="middle" component="li" className={!userEmail ? styles.guestDivider : styles.userDivider} />
      {!userEmail && (
        <>
          <MenuItem className={styles.menuItem}>
            <Button variant="outlined" color="secondary" className={styles.defaultSignInButton} onClick={onSignIn}>
              <Typography className={styles.signInText}>{t('Sign in')}</Typography>
            </Button>
          </MenuItem>
          <Divider variant="middle" component="li" className={styles.guestDivider} />
        </>
      )}

      {!isHelpBlockDisabled && (
        <>
          <a className={styles.link} href={faqUrl}>
            <MenuItem classes={{root: styles.menuItemRoot}} className={styles.menuItem}>
              <HelpIcon />
              {t('Help & Feedback')}
            </MenuItem>
          </a>
          <Divider variant="middle" component="li" className={styles.guestDivider} />
        </>
      )}

      {userEmail && (
        <MenuItem
          classes={{root: styles.menuItemRoot}}
          className={clsx(styles.menuItem, styles.signIcon)}
          onClick={onSignOut}
        >
          <SignOutIcon />
          {t('Sign out')}
        </MenuItem>
      )}
    </Box>
  );
};
