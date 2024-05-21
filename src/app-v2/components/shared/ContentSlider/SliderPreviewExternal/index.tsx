import {cx} from '@linaria/core';
import {Box} from '@material-ui/core';

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

const isNftAssetContent = (val: unknown): val is SliderContent => isRecord(val) && isString(val.collectionAddress);

export const SliderPreviewExternal = ({slides, currentSlide, setCurrentSlide}: SliderPreviewProps) => {
  return (
    <Box className="p-3 whitespace-nowrap overflow-x-scroll no-scrollbar w-full">
      <Box className="flex flex-row gap-2.5 w-fit">
        {slides?.map((slide, index) => {
          const hasAccess = slide.hasAccess;
          return (
            <Box
              key={`side-previev-image-item-${index}`}
              className={cx(
                `min-w-[48px] min-h-[48px] w-[48px] h-[48px] flex rounded bg-cover bg-center`,
                index === currentSlide && 'border-red-600 border-1',
                index !== slides.length - 1 ? 'mr-3' : '',
              )}
              style={{
                backgroundImage: `${!hasAccess ? 'linear-gradient(#00000099 50%, #00000099 50%), ' : ''}url(${
                  isNftAssetContent(slide) ? slide?.asset.preview : slide.preview || slide.playerPreviewUrl || ''
                })`,
              }}
              onClick={() => {
                if (hasAccess) {
                  setCurrentSlide(index);
                }
              }}
            >
              {!hasAccess && <LockIcon className="w-[24px] h-[24px] m-auto" />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
