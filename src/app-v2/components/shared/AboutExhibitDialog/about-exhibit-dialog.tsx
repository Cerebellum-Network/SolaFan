import {NftCardInterface} from '@cere/services-types';
import {FullCreatorInterface} from '@cere/services-types';
import {Box, Dialog, makeStyles, Slide, Typography} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import clsx from 'clsx';
import {forwardRef, memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useStore} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {selectNftByCmsNftId} from '../../../redux/modules/nfts/selectors';
import {BuyFromMinterButton} from '../../connected/ActionButton/BuyFromMinterButton';
import {DisabledButton} from '../../connected/ActionButton/DisabledButton';
import {AvatarWithName} from '../../primitives/AvatarWithName/avatar-with-name';
import {ButtonPulsating} from '../../primitives/ButtonPulsating';
import {CloseButton} from '../../primitives/CloseButton';
import {useRenderSubTitle} from '../Card/useRenderCardElements';
import {CardHorizontal} from '../CardHorizontal';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[800],
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '65px',
      zIndex: 1000,
    },
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    marginBottom: '8px',
  },
  container: {
    [theme.breakpoints.down('md')]: {
      marginTop: '65px',
    },
    padding: '16px',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleBox: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '450px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'unset',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: '40px',
    color: theme.palette.primary.light,
  },
  avatarName: {
    color: theme.palette.primary.light,
  },
  hideForTablet: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  showOnlyForTablet: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  purchaseButtonBox: {
    width: 'fit-content',
    margin: '0 auto',
    padding: '16px',
  },
  description: {
    fontSize: '14px',
    color: theme.palette.primary.light,
    paddingTop: '16px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '16px',
    },
  },
  moreNftsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    padding: '16px 0',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '26px',
    },
  },
  moreNftsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
  },
  moreNftsItem: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '336px',
    },
  },
  nftItemRoot: {
    backgroundColor: theme.palette.grey[900],
    '& *': {
      color: theme.palette.primary.light,
    },
  },
}));

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'unset',
    backgroundColor: theme.palette.grey[800],
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: '12px',
    },
  },
  scrollPaper: {
    alignItems: 'center',
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  creator?: FullCreatorInterface;
  description?: string;
  exclusiveNfts: NftCardInterface[] | null;
  handleOpenPurchaseNFTs: (slug: string) => void;
  slug: string;
};

export const AboutExhibitDialog = memo(
  ({onClose, title, creator, description, exclusiveNfts, handleOpenPurchaseNFTs, slug}: Props) => {
    const location = useLocation();
    const dialogStyles = useDialogStyles();
    const styles = useStyles();
    const {t} = useTranslation();
    const renderSubTitle = useRenderSubTitle();
    const {getState} = useStore();

    const renderButton = useCallback(
      ({qty, nftId}) => {
        const nft = selectNftByCmsNftId(getState() as any, {cmsNftId: nftId});
        if (nft == null || nft.primaryOrder == null) {
          return <DisabledButton>{t('Coming soon')}</DisabledButton>;
        }
        return <BuyFromMinterButton qty={qty} nftId={nftId} order={nft.primaryOrder} returnTo={location.pathname} />;
      },
      [getState, location.pathname, t],
    );

    return (
      <Dialog open TransitionComponent={Transition} fullWidth onClose={onClose} classes={dialogStyles}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.headerTitle}>{t('About exhibit')}</Typography>
            <CloseButton onClick={onClose} />
          </Box>
          <Box className={styles.container}>
            <Box className={styles.titleContainer}>
              <Box className={styles.titleBox}>
                <Typography className={styles.title}>{title}</Typography>
                <AvatarWithName creator={creator} classes={{name: styles.avatarName}} />
              </Box>
              <Box className={styles.showOnlyForTablet}>
                <ButtonPulsating onClick={handleOpenPurchaseNFTs.bind(null, slug)}>
                  {t('Purchase exclusive NFTs')}
                </ButtonPulsating>
              </Box>
            </Box>
            <Typography className={styles.description}>{description}</Typography>
            <Box className={clsx(styles.purchaseButtonBox, styles.hideForTablet)}>
              <ButtonPulsating onClick={handleOpenPurchaseNFTs.bind(null, slug)}>
                {t('Purchase exclusive NFTs')}
              </ButtonPulsating>
            </Box>

            <Typography className={styles.moreNftsTitle}>{t('More NFTs')}</Typography>
            {exclusiveNfts && exclusiveNfts.length > 0 && (
              <Box className={styles.moreNftsBox}>
                {exclusiveNfts.map((nft) => (
                  <Box key={nft.id} className={styles.moreNftsItem}>
                    <CardHorizontal
                      nftId={nft.id}
                      subTitle={renderSubTitle(nft.auctionStatus, nft.supply, nft.balance)}
                      renderActionElement={renderButton.bind(null, {qty: 1, nftId: nft.id, orderId: nft.orderId})}
                      classes={{root: styles.nftItemRoot}}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    );
  },
);
