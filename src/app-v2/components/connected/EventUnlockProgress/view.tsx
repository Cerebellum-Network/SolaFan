import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import chestClosed from '../../../assets/svg/chest-closed.svg';
import openedChest from '../../../assets/svg/opened-chest.svg';
import {UploadedImageFormat} from '../../../types/uploaded-image-format';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';

const useStyles = makeStyles<
  Theme,
  {
    smallEventCard: boolean;
    collectedCount: number;
    nftBlockWidth: number;
  }
>((theme) => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: ({smallEventCard}) => (smallEventCard ? '1fr' : 'auto 60px'),
    gap: '16px',
    [theme.breakpoints.down('md')]: {
      border: ({smallEventCard}) => (smallEventCard ? 'none' : '1px solid rgba(224, 224, 231, 1)'),
      borderRadius: '4px',
      background: 'rgba(255, 255, 255, 1)',
      padding: '8px',
    },
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginTop: ({smallEventCard}) => (smallEventCard ? '4px' : '8px'),
  },
  nft: {
    position: 'relative',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '0 auto',
    zIndex: 1,
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      width: '40px',
      height: '40px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      width: '40px',
      height: '40px',
    },
  },
  progressDivider: {
    zIndex: 1,
    width: '1px',
    height: '16px',
    backgroundColor: '#E2E2E2',
    position: 'absolute',
    top: '12px',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  lockedNft: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
    opacity: 0.4,
    cursor: 'default',
    borderRadius: '4px',
  },
  nftImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  progressLine: {
    height: '8px',
    backgroundColor: '#F0F0F0',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '4px',
    [theme.breakpoints.up('md')]: {
      height: '16px',
    },
  },
  unlockedProgress: {
    '&::before': {
      content: "''",
      height: '100%',
      width: ({collectedCount, nftBlockWidth}) => `${nftBlockWidth * collectedCount}px`,
      backgroundColor: '#B0F41F',
      position: 'absolute',
      top: '0',
      left: '0',
      borderRadius: '4px',
    },
  },
  progressText: {
    fontSize: ({smallEventCard}) => (smallEventCard ? '12px' : '10px'),
    lineHeight: '14px',
    color: ({smallEventCard}) => (smallEventCard ? '#8C8C94' : '#000000'),
    [theme.breakpoints.up('md')]: {
      fontSize: '14px!important',
      lineHeight: '17px',
    },
  },
  chestBlock: {
    width: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    backgroundColor: '#FCD996B2',
    borderRadius: '4px',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px solid rgba(255, 252, 168, 0.5)',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    '& > p': {
      fontSize: '8px',
      fontWeight: 700,
      lineHeight: '10px',
      letterSpacing: '2%',
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: '8px',
      background: `linear-gradient(90deg, #AAA87D -0.05%, #B57B0E 31.2%, #A08042 75.92%, #BCAC66 100.02%),
                   linear-gradient(0deg, #FFFFFF, #FFFFFF)`,
      color: 'transparent',
      backgroundClip: 'text',
    },
  },
  redText: {
    color: 'rgba(255, 66, 100, 1)',
  },
  greenText: {
    color: 'rgba(83, 185, 106, 1)',
  },
  blackText: {
    color: '#000000',
  },
  hideOnMobile: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  showOnMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));

type Props = {
  nfts: {
    nftPreviewUrl: string | null;
    unlocked: boolean;
    title?: string;
    balance?: number;
    supply?: number;
    formats?: Record<string, UploadedImageFormat>;
  }[];
  isEventLocked: boolean;
  smallEventCard?: boolean;
};
export const EventUnlockProgressView = ({nfts, isEventLocked, smallEventCard = false}: Props) => {
  const collectedCount = useMemo(() => nfts.filter((s) => s.unlocked).length, [nfts]);
  const nftRef = useRef<HTMLDivElement>(null);
  const [nftBlockWidth, setNftBlockWidth] = useState<number>(0);

  const updateNftBlockWidth = useCallback(() => {
    if (nftRef?.current) {
      const computedStyle = window.getComputedStyle(nftRef.current);
      const marginLeft = parseFloat(computedStyle.marginLeft);
      const marginRight = parseFloat(computedStyle.marginRight);

      const value = nftRef.current.offsetWidth + marginLeft + marginRight;
      setNftBlockWidth(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftRef]);

  useEffect(() => {
    updateNftBlockWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateNftBlockWidth);
    return () => {
      window.removeEventListener('resize', updateNftBlockWidth);
    };
  }, [updateNftBlockWidth]);

  const classes = useStyles({smallEventCard, collectedCount, nftBlockWidth});

  let collectedCountColorClass;
  if (collectedCount === 0) {
    collectedCountColorClass = classes.redText;
  } else if (collectedCount === nfts.length) {
    collectedCountColorClass = classes.greenText;
  } else {
    collectedCountColorClass = classes.blackText;
  }

  return (
    <Box className={`${classes.grid} w-full`}>
      <Box className={`${classes.column} w-full`}>
        {nfts.length === 1 &&
          nfts.map((nft, index) => (
            <Box className="flex bg-gray-50 rounded-lg gap-1 px-2 py-1" key={`${nft.title}_${index}`}>
              {nft.nftPreviewUrl && (
                <ResponsiveImage
                  size={40}
                  formats={nft.formats}
                  alt={`NFT ${index + 1}`}
                  className={classes.nftImage}
                  fallbackUrl={nft.nftPreviewUrl}
                />
              )}
              <Box className="flex flex-col">
                <Typography variant="subtitle1" className="truncate">
                  {nft?.title}
                </Typography>
                <Typography variant="subtitle2">
                  {nft?.balance}/{nft?.supply} left
                </Typography>
              </Box>
            </Box>
          ))}
        {nfts.length > 1 && (
          <>
            <Box className={`${classes.row} ${classes.showOnMobile}`}>
              <Typography className={classes.progressText}>
                {isEventLocked
                  ? `Collect ${nfts.length === 1 ? 'this' : `all ${nfts.length}`} to unlock`
                  : 'The event is unlocked'}
              </Typography>
            </Box>

            <Box className={classes.progressBar}>
              {nfts.map((nft, index) => (
                <Fragment key={index}>
                  {index > 0 && <Box className={classes.progressDivider} />}
                  <div ref={nftRef} className={`${classes.nft}`}>
                    {nft.nftPreviewUrl && (
                      <ResponsiveImage
                        size={40}
                        formats={nft.formats}
                        alt={`NFT ${index + 1}`}
                        className={classes.nftImage}
                        fallbackUrl={nft.nftPreviewUrl}
                      />
                    )}
                    {!nft.unlocked && <Box className={classes.lockedNft} />}
                  </div>
                </Fragment>
              ))}
              <Box
                className={`${classes.progressLine} ${
                  nfts.some((nft) => nft.unlocked) ? classes.unlockedProgress : ''
                }`}
              ></Box>
            </Box>
          </>
        )}

        <Box className={classes.row}>
          <Typography className={`${classes.progressText} ${classes.hideOnMobile}`}>
            {isEventLocked
              ? nfts.length > 1
                ? `Collect all ${nfts.length} to unlock`
                : 'Own this collectible to unlock'
              : 'The event is unlocked'}
          </Typography>
          {nfts.length > 1 && (
            <Typography className={classes.progressText}>
              Collected:{' '}
              <b>
                <span className={collectedCountColorClass}>{collectedCount}</span>
                <span className={classes.blackText}>/{nfts.length}</span>
              </b>
            </Typography>
          )}
        </Box>
      </Box>
      {!smallEventCard && (
        <Box className={classes.chestBlock}>
          <Typography>{isEventLocked ? 'Unlock Event' : 'UnLocked'}</Typography>
          <img src={isEventLocked ? chestClosed : openedChest} alt="chest" />
        </Box>
      )}
    </Box>
  );
};
