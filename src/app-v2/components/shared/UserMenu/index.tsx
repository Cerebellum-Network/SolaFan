import {Avatar, Box, Button, Menu, Theme, useMediaQuery} from '@material-ui/core';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletType} from '../Wallet/types';
import {ReactComponent as AvatarIcon} from './assets/avatar.svg';
import {ReactComponent as MenuIcon} from './assets/menu.svg';
import {ReactComponent as MenuArrow} from './assets/menuArrow.svg';
import {useMenuStyles} from './styles';
import {UserMenuList} from './UserMenuList';

export type UserMenuProps = {
  isUserAuthenticated: boolean;
  userEmail: string;
  faqUrl: string;
  totalNftsCount: number;
  hasNewNotifications: boolean;
  connectedWallets: WalletType[];
  selectedWallet: SupportedWalletType;
  onSignOut: () => void;
  onConnectWallet: () => void;
  onSelectWallet: (type: SupportedWalletType) => void;
  onSignIn: () => void;
};

export const UserMenu = ({
  isUserAuthenticated,
  userEmail,
  faqUrl,
  totalNftsCount,
  connectedWallets,
  selectedWallet,
  hasNewNotifications,
  onConnectWallet,
  onSelectWallet,
  onSignOut,
  onSignIn,
}: UserMenuProps) => {
  const width = window.screen.width;
  const height = window.screen.height;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const profileMenuRef = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (height < 430 && height < width) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [width, height]);
  const styles = useMenuStyles();
  const isDesktop = useMediaQuery<Theme>((theme) => `${theme.breakpoints.up('lg')}`);

  const handleClick = () => {
    setIsProfileMenuOpen(true);
  };

  const handleClose = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    if (profileMenuRef.current && isProfileMenuOpen) {
      (profileMenuRef.current as any).scrollIntoView({behavior: 'auto', block: 'nearest'});
    }
  }, [isProfileMenuOpen]);

  const signInClick = () => {
    setIsProfileMenuOpen(false);
    onSignIn();
  };

  if (!isUserAuthenticated && isDesktop) {
    return (
      <>
        <Button className={styles.button} variant="text" color="secondary" onClick={onSignIn}>
          {t('Sign in')}
        </Button>
      </>
    );
  }

  return (
    <>
      {/*@ts-ignore*/}
      <Box ref={profileMenuRef as any} className={styles.avatarIcon} onClick={handleClick} aria-label="toggle-menu">
        <Avatar className={styles.avatar} sizes={'medium'}>
          <AvatarIcon />
        </Avatar>
        <MenuArrow />
      </Box>
      <MenuIcon aria-label="toggle menu" className={styles.menuIcon} onClick={handleClick} />

      <Menu
        id="simple-menu"
        anchorEl={profileMenuRef.current}
        keepMounted
        open={Boolean(profileMenuRef) && isProfileMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 0,
          horizontal: isDesktop ? -280 : 0,
        }}
        getContentAnchorEl={null}
        classes={{
          paper: !isLandscape ? (!isDesktop ? styles.paper : styles.paperDesktop) : styles.landscapePaper,
        }}
        disableScrollLock={true}
      >
        <UserMenuList
          userEmail={userEmail}
          faqUrl={faqUrl}
          totalNftsCount={totalNftsCount}
          selectedWallet={selectedWallet}
          connectedWallets={connectedWallets}
          onConnectWallet={onConnectWallet}
          onSelectWallet={onSelectWallet}
          hasNewNotifications={hasNewNotifications}
          onSignIn={signInClick}
          onSignOut={onSignOut}
          handleClose={handleClose}
        />
      </Menu>
    </>
  );
};
