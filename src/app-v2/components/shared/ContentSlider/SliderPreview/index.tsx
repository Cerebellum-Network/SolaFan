import {Box, makeStyles, Theme} from '@material-ui/core';
import clsx from 'clsx';
import {useCallback} from 'react';

import {ReactComponent as LockIcon} from '../../../../assets/svg/lock.svg';
import {EventContentAsset, SliderContent} from '../../../../types/common';
import {isRecord} from '../../../../utils/types/is-record';
import {isString} from '../../../../utils/types/strings';

type SliderPreviewProps = {
  slides: (EventContentAsset | SliderContent)[];
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  nftPage: boolean;
};

const useStyles = makeStyles<Theme, {nftPage: boolean}>((theme) => ({
  previewRow: {
    position: 'absolute',
    bottom: '8px',
    left: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      position: 'relative',
      bottom: 0,
      marginTop: '8px',
    },
  },
  nftPreviewRow: {
    display: 'flex',
    width: 'fit-content',
    padding: '12px',
  },
  previewBlock: {
    position: 'relative',
    width: ({nftPage}) => (nftPage ? '48px' : '60px'),
    height: ({nftPage}) => (nftPage ? '48px' : '40px'),
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '4px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  active: {
    border: ({nftPage}) => (nftPage ? '1px solid rgba(250, 12, 88, 1)' : '1px solid #FFFFFF'),
  },
  noAccess: {
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
    background: '#000',
    opacity: 0.7,
    cursor: 'default',
    borderRadius: '4px',
  },
}));

const isNftAssetContent = (val: unknown): val is SliderContent => isRecord(val) && isString(val.collectionAddress);

export const SliderPreview = ({slides, currentSlide, setCurrentSlide, nftPage}: SliderPreviewProps) => {
  const styles = useStyles({nftPage});

  const renderPreview = useCallback(
    (asset: EventContentAsset | SliderContent) => {
      return (
        <img
          className={styles.image}
          src={isNftAssetContent(asset) ? asset?.asset.preview : asset.preview || asset.playerPreviewUrl || ''}
          alt=""
        />
      );
    },
    [styles.image],
  );

  return (
    <div className={nftPage ? styles.nftPreviewRow : styles.previewRow}>
      {slides?.map((slide, index) => {
        const hasAccess = slide.hasAccess;
        return (
          <div
            key={index}
            className={clsx(
              styles.previewBlock,
              index === currentSlide && styles.active,
              index !== slides.length - 1 ? 'mr-3' : '',
            )}
            onClick={() => {
              if (hasAccess) {
                setCurrentSlide(index);
              }
            }}
          >
            {!hasAccess && (
              <Box className={styles.noAccess}>
                <LockIcon />
              </Box>
            )}
            {renderPreview(slide)}
          </div>
        );
      })}
    </div>
  );
};
