import {Typography} from '@cere/rxb-template-ui-kit';
import {Box, Button, makeStyles, Radio} from '@material-ui/core';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom';

import colors from '../../../../styles/colors';
import {SupportedWalletType} from '../../../models/wallet/types';
import {WalletType} from '../Wallet/types';
import {UserWalletsItemBalance} from './UserWalletsItemBalance';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    marginBottom: '10px',
    border: `1px solid ${colors.lighter}`,
    borderRadius: '12px',
  },
  connectButton: {
    width: '100%',
  },
  walletItem: {
    height: '100%',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    marginRight: '12px',

    '& svg': {
      height: '20px',
      width: '20px',
      margin: '6px 14px 6px 2px',
    },

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  walletTitle: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  },
  selectedWalletItem: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    position: 'relative',
    '--radius': '10px',
    '--stroke': '2px',
    border: 'unset',

    '@supports not (-webkit-mask-composite: xor)': {
      border: 'var(--stroke) solid rgba(243, 102, 130, 0.8)',
    },

    '@supports (-webkit-mask-composite: xor)': {
      '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 'var(--stroke)',
        borderRadius: 'var(--radius)',
        background:
          'linear-gradient(226.34deg, rgba(244, 104, 129, 0.8) 15.52%, rgba(243, 102, 130, 0.8) 16.27%, rgba(231, 69, 150, 0.8) 29.76%, rgba(224, 49, 162, 0.8) 41.02%, rgba(221, 42, 166, 0.8) 48.62%, rgba(82, 16, 226, 0.8) 77.78%)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '-webkit-mask-composite': 'xor',
      },
    },
  },
  label: {
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '14px',
    letterSpacing: '0.3px',
    color: '#1ACC97',
    margin: '16px 3px 0 0',
  },
  activeLabel: {
    color: colors.green,
  },
  inactiveLabel: {
    color: colors.primaryDark,
  },
  inactiveTitle: {
    color: colors.disable,
  },
  root: {
    padding: '13px 10px 0 0',
    display: 'block',
    backgroundColor: `${colors.snowWhite} !important`,

    '&:focus': {
      backgroundColor: colors.snowWhite,
    },

    '&:hover': {
      backgroundColor: colors.snowWhite,
    },

    '& .MuiSvgIcon-root': {
      fontSize: 13,
    },
  },
  nftsLength: {
    padding: '2px 12px',
    height: '24px',
    background: 'rgba(224, 224, 231, 0.3)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '20px',
    color: ' #8C8C94',
  },
  nftsLengthActive: {
    color: colors.lightGrey,
  },
  radioContainer: {
    maxWidth: '16px',
    maxHeight: '16px',
    margin: '3px 3px 0 3px',
  },
}));

type WalletItemProps = {
  wallet: WalletType;
  onSelect: (type: SupportedWalletType) => void;
  selectedWallet: SupportedWalletType;
  disabled?: boolean;
};

export const UserWalletsItem = ({wallet, selectedWallet, onSelect, disabled = false}: WalletItemProps) => {
  const history = useHistory();
  const classes = useStyles();

  const isSelected = wallet.type === selectedWallet;

  const handleWalletSelection = () => onSelect(wallet.type);

  const navigateToWalletPage = () => {
    history.push(`/en/home/user/wallet?type=${wallet.type}`);
  };

  return (
    <Box className={clsx(classes.container, {[classes.selectedWalletItem]: isSelected})}>
      <Button fullWidth onClick={navigateToWalletPage} className={clsx(classes.walletItem)} disableRipple>
        <Box>
          <Box display="flex" alignItems="center" ml={isSelected ? '2px' : 0}>
            {wallet.icon}
            <Typography className={clsx(classes.walletTitle, isSelected && classes.inactiveTitle)}>
              {wallet.title}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="center" mb="8px">
            {Number(wallet.walletBalance) > 0 && (
              <UserWalletsItemBalance balance={wallet.walletBalance} isActive={isSelected} />
            )}
            {wallet.nftsCount > 0 && (
              <Typography className={clsx(classes.nftsLength, {[classes.nftsLengthActive]: isSelected})}>
                {wallet.nftsCount} {wallet.nftsCount > 1 ? 'NFTs' : 'NFT'}
              </Typography>
            )}
          </Box>
        </Box>
      </Button>

      {isSelected ? (
        <Typography className={clsx(classes.activeLabel, classes.label)}>Active</Typography>
      ) : (
        <Typography className={clsx(classes.inactiveLabel, classes.label)}>Inactive</Typography>
      )}

      <Box className={classes.radioContainer}>
        <Radio
          checked={isSelected}
          onChange={handleWalletSelection}
          value="a"
          name="radio-buttons"
          inputProps={{'aria-label': 'A'}}
          disabled={disabled}
          color="primary"
          classes={{root: classes.root}}
          disableRipple
        />
      </Box>
    </Box>
  );
};
