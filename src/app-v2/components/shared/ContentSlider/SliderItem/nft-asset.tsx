import {NFT} from '@cere/media-sdk-client';
import {EncryptedAudioPlayer, EncryptedVideoPlayer, useDownloadContent} from '@cere/media-sdk-react';
import {cx} from '@linaria/core';
import {CircularProgress} from '@material-ui/core';
import clsx from 'clsx';
import React, {useCallback, useMemo, useState} from 'react';

import {ReactComponent as DownloadIcon} from '../../../../assets/svg/download.svg';
import {useNotifications} from '../../../../hooks/use-notifications';
import {FreeportNftAsset, SliderContent} from '../../../../types/common';
import {IconButton} from '../../../primitives/IconButton';
import {Loader} from './loader';
import {useStyles} from './styles';

type NftAssetProps = {
  content: SliderContent;
  nftPage: boolean;
  className?: string;
  onLoadImage?: () => void;
  userWalletAddress?: string | null;
};

const useCustomDownloadContent = ({
  asset,
  collectionAddress,
  nftId,
}: {
  asset: FreeportNftAsset;
  nftId: number;
  collectionAddress: string;
}) => {
  const {download} = useDownloadContent(
    {nftId: Number(nftId), collection: {address: collectionAddress}} as NFT,
    `asset-${asset.asset.split('/').pop()}`,
  );

  return {download};
};

export const NftAsset: React.FC<NftAssetProps> = ({content, nftPage, className, onLoadImage}) => {
  const {asset, collectionAddress, nftId} = content;
  const {error} = useNotifications();
  const [isLoadingAsset, setLoadingAsset] = useState(false);
  const {download} = useCustomDownloadContent({nftId: Number(nftId), collectionAddress: collectionAddress!, asset});
  const contentType = asset.contentType;
  const isStreamableVideo = !!contentType && contentType.includes('video');
  const isStreamableAudio = !!contentType && contentType.includes('audio');

  const styles = useStyles({eventBackgroundUrl: asset.preview});

  const handleImageLoad = useCallback(() => {
    if (onLoadImage) {
      onLoadImage();
    }
  }, [onLoadImage]);

  const renderContent = useMemo(() => {
    if (!isStreamableVideo && !isStreamableAudio) {
      return (
        <div className={`${styles.imageBlock} m-auto`}>
          {!asset ? (
            <CircularProgress size="30px" />
          ) : (
            <img src={asset.preview} alt="Exhibit" className={styles.image} onLoad={handleImageLoad} />
          )}
        </div>
      );
    }

    if (isStreamableAudio) {
      return (
        <EncryptedAudioPlayer
          className={clsx(className, styles.videoContainer)}
          collectionAddress={collectionAddress!}
          nftId={Number(nftId)}
          assetIndex={0}
          loadingComponent={<Loader />}
        />
      );
    }

    return (
      <EncryptedVideoPlayer
        className={clsx(className, styles.videoContainer)}
        serverSide
        src={asset.asset}
        collectionAddress={collectionAddress!}
        nftId={Number(nftId)}
        assetIndex={0}
        loadingComponent={<Loader />}
      />
    );
  }, [
    isStreamableVideo,
    isStreamableAudio,
    className,
    styles.videoContainer,
    styles.imageBlock,
    styles.image,
    asset,
    collectionAddress,
    nftId,
    handleImageLoad,
  ]);

  const handleOnDownload = useCallback(async () => {
    setLoadingAsset(true);
    try {
      await download();
      setLoadingAsset(false);
    } catch (e) {
      error('An error occurred while loading an asset. Try again later');
      setLoadingAsset(false);
    }
  }, [download, error]);

  return (
    <div className="flex self-stretch">
      {<div className={cx('w-full', styles.content)}>{renderContent}</div>}
      {nftPage && (
        <IconButton className={styles.downloadContent} onClick={handleOnDownload} disabled={isLoadingAsset}>
          {isLoadingAsset ? <CircularProgress size="20px" /> : <DownloadIcon />}
        </IconButton>
      )}
    </div>
  );
};
