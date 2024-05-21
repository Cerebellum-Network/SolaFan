import {useEffect, useState} from 'react';

import {EventContentAsset, SliderContent} from '../../../types/common';
import {SliderItem} from './SliderItem/slider-item';
import {SliderPreview} from './SliderPreview';
import {SliderPreviewExternal} from './SliderPreviewExternal';

type ContentSliderProps = {
  slides: (EventContentAsset | SliderContent)[];
  userWalletAddress?: string | null;
  nftPage?: boolean;
  className?: string;
  slidePreviewType?: 'external' | 'internal' | 'none'; // TODO remove this parameter after 2024-07-01, it's an temporary solution for migration to new version of slider
  onLoadImage?: () => void;
};

export const ContentSlider = ({
  slides,
  userWalletAddress,
  nftPage = false,
  className,
  slidePreviewType = 'internal',
  onLoadImage,
}: ContentSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentSlide > slides.length - 1) {
      setCurrentSlide(0);
    }
  }, [slides, currentSlide]);

  return (
    <div className="relative w-full">
      <SliderItem
        nftPage={nftPage}
        userWalletAddress={userWalletAddress}
        currentSlide={slides[currentSlide]}
        className={className}
        onLoadImage={onLoadImage}
      />
      {slides.length === 1 ? null : (
        <>
          {slidePreviewType === 'internal' && (
            <SliderPreview
              nftPage={nftPage}
              slides={slides}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          )}
          {slidePreviewType === 'external' && (
            <SliderPreviewExternal
              nftPage={nftPage}
              slides={slides}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          )}
        </>
      )}
    </div>
  );
};
