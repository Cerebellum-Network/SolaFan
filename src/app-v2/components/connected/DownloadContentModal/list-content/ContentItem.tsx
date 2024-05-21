import {NFT} from '@cere/media-sdk-client';
import {EncryptedVideoPlayer, useDownloadContent} from '@cere/media-sdk-react';
import {Button, CircularProgress, TableCell, TableRow} from '@material-ui/core';
import {Signer} from 'ethers';
import {NftAsset} from 'shared/types/metadata';

import {ContentPreview} from './ContentPreview';

export interface ContentItemProps {
  collectionAddress: string;
  nftId: number;
  asset: NftAsset;
  signer?: () => Signer;
  index?: number;
}

export const ContentItem = ({
  asset: {name, description, preview, asset, contentType},
  collectionAddress,
  nftId,
  index,
}: ContentItemProps) => {
  const {download: onDownloadAsset, isLoading: isLoadingDownloadAsset} = useDownloadContent(
    {nftId: Number(nftId), collection: {address: collectionAddress}} as NFT,
    `asset-${index}`,
  );
  const {download: onDownloadPreview, isLoading: isLoadingDownloadPreview} = useDownloadContent(
    {nftId: Number(nftId), collection: {address: collectionAddress}} as NFT,
    `asset-${index}`,
  );

  const isStreamableVideo = !!contentType && contentType.includes('video');
  const isLoading = isLoadingDownloadAsset || isLoadingDownloadPreview;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <ContentPreview src={preview} />
      </TableCell>
      <TableCell>
        <Button onClick={() => onDownloadPreview()}>
          {isLoading ? <CircularProgress size="1rem" /> : 'Download Preview'}
        </Button>
      </TableCell>
      <TableCell>
        {isStreamableVideo ? (
          <>
            <EncryptedVideoPlayer
              src={asset}
              collectionAddress={collectionAddress}
              nftId={nftId}
              assetIndex={index ?? 0}
              serverSide
              loadingComponent={<CircularProgress style={{margin: 'auto'}} />}
            />
          </>
        ) : (
          <Button onClick={() => onDownloadAsset()}>
            {isLoading ? <CircularProgress size="1rem" /> : 'Download Asset'}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
