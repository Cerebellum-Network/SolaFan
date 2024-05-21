import {FC} from 'react';

import {EventContentAsset, SliderContent} from '../../../../types/common';
import {isRecord} from '../../../../utils/types/is-record';
import {isString} from '../../../../utils/types/strings';
import {EventAsset} from './event-asset';
import {NftAsset} from './nft-asset';

const isNftAssetContent = (val: unknown): val is SliderContent => isRecord(val) && isString(val.collectionAddress);

type SliderItemProps = {
  currentSlide: EventContentAsset | SliderContent;
  nftPage: boolean;
  userWalletAddress?: string | null;
  className?: string;
  onLoadImage?: () => void;
};

export const SliderItem: FC<SliderItemProps> = ({currentSlide, nftPage, userWalletAddress, className, onLoadImage}) => {
  return isNftAssetContent(currentSlide) ? (
    <NftAsset
      content={currentSlide}
      nftPage={nftPage}
      className={className}
      userWalletAddress={userWalletAddress}
      onLoadImage={onLoadImage}
    />
  ) : (
    <EventAsset content={currentSlide} onLoadImage={onLoadImage} />
  );
};
