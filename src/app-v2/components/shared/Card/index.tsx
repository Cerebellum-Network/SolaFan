import {CheckUserHasNftEnum} from '@cere/services-types';
import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';

import colors from '../../../../styles/colors';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {CardImage} from '../../primitives/CardImage';
import {Badge} from '../Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `${colors.snowWhite}`,
    display: 'grid',
    gridTemplateColumns: '100px auto',
    columnGap: '12px',
    padding: '12px',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    minWidth: '100px',
    boxShadow: '0px 4px 20px 0px #0000001F',
  },
  actionButtonsBox: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoBox: {
    flexGrow: 2,
    backgroundColor: colors.snowWhite,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: '20px',
  },
  bottomBox: {
    paddingTop: '4px',
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2px',
  },
  leftBottomInfo: {
    fontSize: '16px',
    lineHeight: '22px',
  },
  overflowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconButton: {
    width: '30px',
    height: '30px',
    minHeight: '30px',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  speedDialAction: {
    margin: '4px',
    '& .MuiSpeedDialAction-tooltipPlacementLeft': {
      display: 'none !important',
    },
  },
  speedDialIcon: {
    width: '27px',
    height: '27px',
  },
  moreButtonActions: {
    paddingTop: '36px !important',
  },
  hidden: {
    display: 'none !important',
  },
}));

const SMALL_CARD_WIDTH = 200;

export type CardProps = {
  nftId: string;
  title: string;
  ownedBalance: string | null;
  nftPurchaseStatus?: CheckUserHasNftEnum;
  subTitle?: NonNullable<ReactNode>;
  creatorImage?: string;
  creatorName?: string;
  creatorLink?: string;
  cardBadge?: NonNullable<ReactNode>;
  onShareClick?: () => void;
  onLikeClick?: () => void;
  bottomInfoDescription?: NonNullable<ReactNode>;
  bottomInfo?: NonNullable<ReactNode>;
  leftBottomInfo?: NonNullable<ReactNode>;
  rightBottomElement?: NonNullable<ReactNode>;
  imageBackdrop?: NonNullable<ReactNode>;
  classes?: Partial<Record<'bottomBox' | 'infoBox', string>>;
  cardLink?: string;
};

export const Card = memo(
  ({
    nftId,
    title,
    nftPurchaseStatus,
    subTitle,
    bottomInfoDescription,
    bottomInfo,
    leftBottomInfo,
    rightBottomElement,
    imageBackdrop,
    classes,
    cardLink,
    ownedBalance,
  }: CardProps) => {
    const {t} = useTranslation();
    const styles = useStyles();
    const ref = useRef<HTMLDivElement | null>(null);
    const {isMobile, isTablet, isDesktop} = useThemeBreakpoints();

    const smallCard = useMemo(
      () => {
        const width = ref.current?.getBoundingClientRect().width;
        return width ? width <= SMALL_CARD_WIDTH : false;
      },
      // we need to recalculate this value after breakpoints change
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isMobile, isTablet, isDesktop],
    );

    const collectedText = useMemo(
      () => (ownedBalance ? `${t('Collected')}: ${ownedBalance}` : t('Collected')),
      [ownedBalance, t],
    );

    return (
      <div className={styles.root} ref={ref}>
        <CardImage nftId={nftId} imageBackdrop={imageBackdrop} cardLink={cardLink} />

        <Box className={clsx(styles.infoBox, classes?.infoBox)}>
          <Typography variant="body2" className={clsx(styles.title)}>
            {title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {subTitle}
          </Typography>
          {nftPurchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT && <Badge text={collectedText} />}
          <Box className={clsx(styles.bottomBox, classes?.bottomBox)}>
            {bottomInfoDescription}
            {bottomInfo || (
              <Box className={styles.actionBox}>
                <Typography className={clsx(styles.leftBottomInfo, styles.overflowText)}>{leftBottomInfo}</Typography>
                {!smallCard && rightBottomElement}
              </Box>
            )}
          </Box>
        </Box>
      </div>
    );
  },
);

Card.displayName = 'Card';
