import {VideoPlayer} from '@cere/media-sdk-react';
import {cx} from '@linaria/core';
import {FC, useMemo} from 'react';

import {EventContentAsset} from '../../../../types/common';
import {SliderTypeEnum} from '../../../../types/exhibit';
import {ResponsiveImage} from '../../../primitives/ResponsiveImage/responsive-image';
import {Condition, ConditionsList, Defaults} from '../../Conditions';
import {Loader} from './loader';
import {useStyles} from './styles';

type EventAssetProps = {
  content: EventContentAsset;
  onLoadImage?: () => void;
};

export const EventAsset: FC<EventAssetProps> = ({content, onLoadImage}) => {
  const {preview, background, playerAsset, contentType, playerPreviewUrl, previewFormats} = content || {};
  const styles = useStyles({eventBackgroundUrl: background ?? ''});

  const renderContent = useMemo(() => {
    if (contentType === SliderTypeEnum.IMAGE) {
      return (
        <ConditionsList>
          <Condition condition={background != null}>
            <div className={cx(styles.backgroundImage, 'aspect-square')}>
              {preview && (
                <ResponsiveImage
                  formats={previewFormats}
                  fallbackUrl={preview}
                  alt="Exhibit"
                  className={cx(styles.image, 'aspect-square')}
                  onLoadImage={onLoadImage}
                />
              )}
            </div>
          </Condition>
          <Defaults>
            <ResponsiveImage
              formats={previewFormats}
              fallbackUrl={preview}
              alt="Exhibit"
              className={cx(styles.image, 'aspect-square')}
              onLoadImage={onLoadImage}
            />
          </Defaults>
        </ConditionsList>
      );
    }
    return (
      <VideoPlayer
        className={styles.videoContainer}
        src={playerAsset || ''}
        hlsEnabled={false}
        loadingComponent={<Loader />}
        videoOverrides={{poster: playerPreviewUrl ?? undefined}}
      />
    );
  }, [
    background,
    contentType,
    onLoadImage,
    playerAsset,
    playerPreviewUrl,
    preview,
    previewFormats,
    styles.backgroundImage,
    styles.image,
    styles.videoContainer,
  ]);

  return <div className={styles.imageBlock}>{renderContent}</div>;
};
