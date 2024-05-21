import {useCallback, useEffect, useRef} from 'react';

import {getPercentage} from '../../../utils/helpers/getPercentage';

export interface MediaPlayerProps {
  src: string;
  autoplay?: boolean;
  playTrigger?: boolean;
  pauseTrigger?: boolean;
  onPause?: () => void;
  onPlay?: () => void;
  onEnd?: () => void;
  onVolumeChange?: () => void;
  onFullscreenChange?: () => void;
  onPlayback?: (time: number) => void;
  className?: string | undefined;
  onPlayerTimeUpdate?: (time: number) => void;
}

export const MediaPlayer = ({
  src,
  autoplay = false,
  playTrigger = false,
  pauseTrigger = false,
  onPause,
  onPlay,
  onPlayback,
  className,
  onVolumeChange,
  onFullscreenChange,
  onPlayerTimeUpdate,
  onEnd,
}: MediaPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef?.current) {
      if (playTrigger && !pauseTrigger) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playTrigger, pauseTrigger, videoRef]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.addEventListener('fullscreenchange', () => onFullscreenChange?.());
    }
  }, [onFullscreenChange, videoRef]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef?.current) {
      onPlayback?.(getPercentage(videoRef.current.currentTime, videoRef.current.duration));
      onPlayerTimeUpdate?.(videoRef.current.currentTime);
    }
  }, [onPlayback, onPlayerTimeUpdate]);

  return (
    <div style={{position: 'relative', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#000'}}>
      <video
        ref={videoRef}
        key={src}
        onPlay={() => onPlay?.()}
        onPause={() => onPause?.()}
        onVolumeChange={() => onVolumeChange?.()}
        onEnded={() => onEnd?.()}
        onTimeUpdate={handleTimeUpdate}
        className={className}
        style={{position: 'absolute', inset: 0, width: '100%', maxHeight: '100%', objectFit: 'cover', margin: 'auto'}}
        autoPlay={autoplay}
        playsInline={autoplay}
        crossOrigin="anonymous"
        controls
      >
        <source src={src} />
      </video>
    </div>
  );
};
